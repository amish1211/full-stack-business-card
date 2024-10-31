import { useContext, useState } from "react";
import axios from "axios";
import "./cardForm.css";
import Button from "../Buttons/Button";
import useFormInput from "../../hooks/CardForm/useForminput";
import useDynamicFields from "../../hooks/CardForm/useDynamicFields";
import UserContext from "../../contexts/userContext"

function CardForm({setCards}) {
  const name = useFormInput('');
  const description = useFormInput('');
  const { fields: mediaHandles, handleFieldChange: handleMediaHandlesChange, addField: addMediaHandleField, setFields: setMediaHandles } = useDynamicFields([{ handleName: '', handleUrl: '' }]);
  const { fields: interests, handleFieldChange: handleInterestsChange, addField: addInterestField, setFields: setInterests } = useDynamicFields([{ "value": '' }]);
  const [error, setError] = useState('');
  const { username, password } = useContext(UserContext);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mediaHandlesObject = mediaHandles.reduce((acc, handle) => {
      if (handle.handleName && handle.handleUrl) {
        acc[handle.handleName] = handle.handleUrl;
      }
      return acc;
    }, {});

    const interestsList = interests.map((interest) => interest.value);

    try {
      await axios.post(
        'http://localhost:3000/api/v1/cards',
        {
          name: name.value,
          description: description.value,
          mediaHandles: mediaHandlesObject,
          interests:interestsList,
        },
        {
          headers: {
            username,
            password,
          },
        }
      );

      name.setValue('');
      description.setValue('');
      setMediaHandles([{ handleName: '', handleUrl: '' }]);
      setInterests([{ "value": '' }]);
      setError('');
      setCards((prevCards) => {
        return [...prevCards, { name: name.value, description: description.value, mediaHandles: mediaHandlesObject, interests: interestsList }];
      });
    } catch (err) {
      setError('Failed to create card. Please check your inputs.');
    }
  };

  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name.value} onChange={name.onChange} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description.value} onChange={description.onChange} required />
      </div>
      <div>
        <label>Media Handles:</label>
        <div className="media-handle-wrapper">
          {mediaHandles.map((handle, index) => (
            <div className="media-handle" key={index}>
              <input
                type="text"
                placeholder="Handle Name"
                value={handle.handleName}
                onChange={(e) =>
                  handleMediaHandlesChange(index, 'handleName', e.target.value)
                }
                required
              />
              <input
                type="url"
                placeholder="Handle URL"
                value={handle.handleUrl}
                onChange={(e) =>
                  handleMediaHandlesChange(index, 'handleUrl', e.target.value)
                }
                required
              />
            </div>
          ))}
          <Button type="button" onClick={() => addMediaHandleField({ handleName: '', handleUrl: '' })}>
            Add Media Handle
          </Button>
        </div>
      </div>
      <div className="interests">
        <label>Interests:</label>
        <div className="interests-body">
          {interests.map((interest, index) => (
            <input
              key={index}
              type="text"
              value={interest.value}
              onChange={(e) => handleInterestsChange(index, 'value', e.target.value)}
              required
            />
          ))}
          <Button type="button" onClick={() => addInterestField({ "value": "" })}>
            Add
          </Button>
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button type="submit">Create Card</Button>
    </form>
  );
}

export default CardForm;
