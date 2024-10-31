import { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import Button from "./Buttons/Button";
import ButtonGroup from "./Buttons/ButtonGroup";
import "./card.css";
import UserContext from "../contexts/userContext";

function Card({ cardData, setCards }) {
  const { username, password } = useContext(UserContext);
  const { _id, name, description, mediaHandles, interests } = cardData;
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description);
  const [editInterests, setEditInterests] = useState(interests);
  const cardRef = useRef(null);
  // ************************//
  // Solution 1
  // ************************//
  const latestEditName = useRef(editName);
  const latestEditDescription = useRef(editDescription);
  const latestEditInterests = useRef(editInterests);
  useEffect(() => {
    latestEditName.current = editName;
    latestEditDescription.current = editDescription;
    latestEditInterests.current = editInterests;
  }, [editName, editDescription, editInterests]);

  async function deleteCard(cardId) {
    await axios.delete(`http://localhost:3000/api/v1/cards/${cardId}`, {
      headers: {
        username,
        password,
      },
    });

    setCards((prevCards) => {
      return prevCards.filter((card) => card._id !== cardId);
    });
  }

  async function updateCard() {
    try {
      // console.log("editName before db update", editName);


      // ************************//
      // Uncomment for Solution 1 using useRefs
      // ************************//
      // await axios.put(

      //   `http://localhost:3000/api/v1/cards/${_id}`,
      //   {
      //     name: latestEditName.current,
      //     description: latestEditDescription.current,
      //     interests: latestEditInterests.current,
      //   },
      //   {
      //     headers: {
      //       username,
      //       password,
      //     },
      //   }
      // );


      // await axios.put(
      //   `http://localhost:3000/api/v1/cards/${_id}`,
      //   {
      //     name: editName,
      //     description: editDescription,
      //     interests: editInterests,
      //   },
      //   {
      //     headers: {
      //       username,
      //       password,
      //     },
      //   });

      setCards((prevCards) =>
        prevCards.map((card) =>
          card._id === _id
            ? { ...card, name: editName, description: editDescription, interests: editInterests }
            : card
        )
      );
    } catch (error) {
      console.error("Failed to update card:", error);
    }
  }

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setIsEditing(false);
      // To be kept here for solution 1
      // updateCard();




    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      // Uncomment for solution 2
      // updateCard();

    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  return (
    <div className="card" ref={cardRef}>
      <ButtonGroup>
        <Button customClassNames={["delete-card-button", "danger"]} onClick={() => deleteCard(_id)}>
          Delete Card
        </Button>
        <Button customClassNames={["edit-card-button"]} onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      </ButtonGroup>
      {isEditing ? (
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          autoFocus
        />
      ) : (
        <h2>{editName}</h2>
      )}
      {isEditing ? (
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
      ) : (
        <p className="description">{editDescription}</p>
      )}
      <div className="interests">
        <h3>Interests</h3>
        {isEditing ? (
          <ul>
            {editInterests.map((interest, idx) => (
              <li key={idx}>
                <input
                  type="text"
                  value={interest}
                  onChange={(e) => {
                    const newInterests = [...editInterests];
                    newInterests[idx] = e.target.value;
                    setEditInterests(newInterests);
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {editInterests.map((interest, idx) => (
              <li key={idx}>{interest}</li>
            ))}
          </ul>
        )}
      </div>
      <ButtonGroup>
        {Object.keys(mediaHandles).map((mediaHandle) => (
          <Button key={mediaHandle}>
            <a href={mediaHandles[mediaHandle]}>{mediaHandle}</a>
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default Card;