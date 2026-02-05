import { useNavigate } from "react-router-dom";
import CharacterCreationNav from "../../components/CharacterCreation/CharacterCreationNav/CharacterCreationNav";
import "./CharacterCreationPage.css";
import { useEffect, useState } from "react";
import { createNewDocument } from "../../utilities/requestHandlers";
import { useAuthContext } from "../../context/AuthContext/AuthContext";
import type { characterResData } from "../../types";

export default function CharacterCreationPage() {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    profileImage: "",
    name: "",
    age: 0,
    biography: "",
    likes: [],
    dislikes: [],
  });
  const [formData, setFormData] = useState<Object>({}); //Nothing in the data by default

  //Input Changes, Updates the form data to send in the PUT request
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    /*Update Data: Likes && Dislikes (Arrays from textArea) */
    if (
      event.currentTarget.id === "likes" ||
      event.currentTarget.id === "dislikes"
    ) {
      const array = value.split(",");
      setValues((prevData) => ({
        ...prevData,
        [name]: array,
      }));
      return setFormData((prevData) => ({
        //return to ensure no double update.
        ...prevData,
        [name]: array,
      }));
    }
    //When handling all other fields, set as the direct value given. (For Display)
    setValues((prevData) => ({
      ...prevData,
      [name]: [value],
    }));
    //When handling all other fields, set as the direct value given. (For Storing in Database)
    setFormData((prevData) => ({
      ...prevData, //Get current data
      [name]: value, //Make updates or add into the object a new property to sent
    }));
  };

  //Submit Data to Database on Enter
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (//required values are filled out
      values.biography !== "" &&
      values.name !== "" &&
      values.profileImage !== ""
    ) {
      //Submit The formData and cache the response
      const data: [characterResData] = await createNewDocument("characters", "", formData, token); //send post request
      navigate(`/characters/${data[0].characters._id}`)
    }
  };

  useEffect(() => {
    //no token? No access. 404 Page Redirect
    if (!token || token === "") {
      navigate("*");
    }
  }, [token]);

  return (
    <div
      id="profile-page-container"
      className="row row-cols row-cols-lg-2 mt-lg-5"
    >
      <CharacterCreationNav />
      <main
        id="character-creation-page"
        className="col-md d-flex flex-column align-items-center justify-content-start"
      >
        <form onSubmit={handleSubmit} noValidate>
          <div id="profile-Image-container">
            <label htmlFor="profileImage">
              <img
                id="profileImage-preview"
                src={
                  values.profileImage !== ""
                    ? values.profileImage
                    : "https://cdn.pixabay.com/photo/2022/10/19/01/02/woman-7531315_1280.png"
                }
                alt="Character profile image. Default image is of a cartoon tanned woman with white hair and a green shirt."
              />
              Profile Image
            </label>
            <br />
            <input
              name="profileImage"
              onChange={handleChange}
              id="profileImage"
              type="text"
              placeholder="What do they look like? Provide a URL!"
            />
          </div>
          <div id="name-container">
            <label htmlFor="name">Name</label>
            <br />
            <input
              name="name"
              onChange={handleChange}
              id="name"
              type="text"
              placeholder="What's your character's name?"
            />
          </div>
          <div id="age-container">
            <label htmlFor="age">Age</label>
            <br />
            <input
              name="age"
              onChange={handleChange}
              id="age"
              type="number"
              placeholder="What age is your character?"
            />
          </div>
          <div id="biography-container">
            <label htmlFor="biography">Biography</label>
            <br />
            <textarea
              onChange={handleChange}
              placeholder="Describe your character! 3 Characters minimum, 300 maximum"
              minLength={3}
              maxLength={300}
              name="biography"
              id="biography"
            />
          </div>
          <div id="Likes-container">
            <label htmlFor="likes">Likes</label>
            <br />
            <textarea
              onChange={handleChange}
              placeholder="Add likes (optional). Make sure to separate by commas ( , )!"
              minLength={3}
              maxLength={300}
              name="likes"
              id="likes"
            />
          </div>
          <div id="dislikes-container">
            <label htmlFor="dislikes">Dislikes</label>
            <br />
            <textarea
              onChange={handleChange}
              placeholder="Add dislikes (optional). Make sure to separate by commas ( , )!"
              minLength={3}
              maxLength={300}
              name="dislikes"
              id="dislikes"
            />
          </div>
          <div id="form-submit-button-containiner">
            <button type="submit" className="confirm">
              Create
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
