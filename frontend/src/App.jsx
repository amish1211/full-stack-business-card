import Card from "./components/Card";
import CardForm from "./components/CardForm/CardForm";
import CardGrid from "./components/CardGrid";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "./contexts/userContext";
import "./App.css";
import Button from "./components/Buttons/Button";


function App() {
  const [cards, setCards] = useState([]);
  const { username, password } = useContext(UserContext);
  

  useEffect(function () {
    
    axios
      .get("http://localhost:3000/api/v1/cards", {
        headers: {
          username,
          password,
        },
      })
      .then((res) => {
       
        setCards(res.data.cards.cards);
      });
  }, []);

  async function deleteAllCards() {
    await axios.delete("http://localhost:3000/api/v1/cards", {
      headers: {
        username,
        password,
      },
    });

    setCards([]);
  }

  return (
    <div className="container">
      <CardForm setCards={setCards} />
      <Button customClassNames={["danger"]} onClick={deleteAllCards}>Delete All</Button>
      <CardGrid>
        {cards.map((card) => (
          <Card setCards={setCards} key={card._id} cardData={card} />
        ))}
      </CardGrid>
    </div>
  );
}

export default App;
