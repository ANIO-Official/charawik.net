import { useNavigate, useParams } from "react-router-dom";
import "./CharacterPage.css";
import CharacterNav from "../../components/Character/CharacterNav/CharacterNav";
import useFetch from "../../custom-hooks/useFetch";
import { useAuthContext } from "../../context/AuthContext/AuthContext";
import DeletionModal from "../../components/Character/DeletionModal/DeletionModal";
import { useEffect, useState } from "react";
import { editExisitingDocument } from "../../utilities/requestHandlers";

export default function CharacterPage() {
  const params = useParams();
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [hidden, setIsHidden] = useState(true);
  const [editing, setEditing] = useState({
    editname: false,
    editage: false,
    editbio: false,
    editlikes: false,
    editdislikes: false,
  });
  const [values, setValues] = useState({
    name: "",
    age: 0,
    biography: "",
    likes: [],
    dislikes: [],
  });

  const characterFetch = useFetch(
    `${import.meta.env.VITE_API_URL}/api/characters/${params.characterId}?token=${token}`,
  );

  const [formData, setFormData] = useState<Object>({}); //Nothing in the data by default

  //Change to EditMode
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;
    setEditing((prevData) => ({ ...prevData, [id]: true })); //Turn on editing
  };

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
      console.log(array);
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
  const handleSubmit = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter") {
      //Submit on press of enter
      editExisitingDocument(
        "characters",
        params.characterId ?? "",
        formData,
        token,
      );
      const id = event.currentTarget.id;
      setEditing((prevData) => ({
        ...prevData,
        [`edit${id}`]: false,
      }));
      console.log("Submitted update!");
    }
  };

  useEffect(() => {
    //When all data has returned from the fetch, set it as the new default values.
    if (
      !characterFetch.loading &&
      !characterFetch.error &&
      Object.keys(characterFetch.data[0]).length > 0
    ) {
      const { name, age, biography, likes, dislikes } =
        characterFetch.data[0].characters;
      setValues((prevData) => ({
        ...prevData,
        name: name,
        age: age,
        biography: biography,
        likes: likes,
        dislikes: dislikes,
      }));
    }
  }, [characterFetch.data]);

  return (
    <>
      <DeletionModal
        hidden={hidden}
        setHidden={setIsHidden}
        documentType="character"
        id={params.characterId ?? ""}
      />
      {
        <div id="character-page-container" className="row mt-5">
          <CharacterNav />
          <main
            id="character-page"
            className="col-md d-flex flex-column align-items-center justify-content-between"
          >
            <div
              id="character-details-container"
              className="d-flex flex-column align-items-center justify-content-start"
            >
              <div className=" button-container d-flex flex-row justify-content-between">
                <div style={{ maxHeight: "fit-content" }}>
                  <button
                    className="warning"
                    onClick={() => setIsHidden(false)}
                  >
                    Delete
                  </button>
                </div>

                <h2 id="character-subname">
                  {Object.keys(characterFetch.data[0]).length > 0 &&
                    characterFetch.data[0].characters.name}
                </h2>
              </div>
              {characterFetch.loading ? (
                <p>Loading Character Data...</p> //Loading Data
              ) : characterFetch.error ? (
                <p>Error Loading Character Data!</p> //Error Obtaining Data
              ) : (
                Object.keys(characterFetch.data[0]).length > 0 && ( //When data exist, display it
                  <div id="character-details">
                    <h2 className="character-details-title">
                      Bio
                      <button
                        onClick={handleClick}
                        id="editbio"
                        className="edit-button"
                      >
                        Edit
                      </button>
                    </h2>
                    {
                      editing.editbio ? (
                        <textarea
                          placeholder="Update Biography. 3 Characters minimum, 300 maximum"
                          minLength={3}
                          maxLength={300}
                          name="biography"
                          id="bio"
                          className="edit-character-input"
                          onChange={handleChange} /* Editing Biography */
                          onKeyUp={handleSubmit} /* Submit Form Data */
                          value={values.biography}
                        />
                      ) : (
                        <p>{values.biography}</p>
                      ) /*Biography */
                    }
                    <div id="like-dislikes-container" className="row row-cols-lg-2">
                      <div id="likes-container">
                        <h2 className="character-details-title">
                          Likes
                          <button
                            onClick={handleClick}
                            id="editlikes"
                            className="edit-button"
                          >
                            Edit
                          </button>
                        </h2>
                        {editing.editlikes ? (
                          <textarea
                            placeholder="Separate each like with a comma (,)."
                            name="likes"
                            id="likes"
                            className="edit-character-input"
                            onChange={handleChange} /* Editing Biography */
                            onKeyUp={handleSubmit} /* Submit Form Data */
                            value={values.likes}
                          />
                        ) : (
                          <ul>
                            {values.likes.length === 0 ? ( //Character has no likes
                              <p>
                                <i>No Likes Yet! ヾ(•ω•`)o</i>
                              </p>
                            ) : (
                              //Character has likes
                              values.likes.map(
                                (item: string, index: number) => (
                                  <li
                                    key={`${item}${index}${characterFetch.data[0].characters._id}`}
                                  >
                                    {item}
                                  </li>
                                ),
                              )
                            )}
                          </ul>
                        )}
                      </div>
                      <div id="dislikes-container">
                        <h2 className="character-details-title">
                          Dislikes
                          <button
                            onClick={handleClick}
                            id="editdislikes"
                            className="edit-button"
                          >
                            Edit
                          </button>
                        </h2>
                        {editing.editdislikes ? (
                          <textarea
                            placeholder="Separate each like with a comma (,)."
                            name="dislikes"
                            id="dislikes"
                            className="edit-character-input"
                            onChange={handleChange} /* Editing Biography */
                            onKeyUp={handleSubmit} /* Submit Form Data */
                            value={values.dislikes}
                          />
                        ) : (
                          <ul>
                            {values.dislikes.length === 0 ? ( //Character has no dislikes
                              <p>
                                <i>No Disikes Yet! (╬▔皿▔)╯</i>
                              </p>
                            ) : (
                              //Character has dislikes
                              values.dislikes.map(
                                (item: string, index: number) => (
                                  <li
                                    key={`${item}${index}${characterFetch.data[0].characters._id}`}
                                  >
                                    {item}
                                  </li>
                                ),
                              )
                            )}
                          </ul>
                        )}
                        
                      </div>
                    </div>
                    <div className="button-container d-flex flex-row justify-content-between">
                      <h2 className="character-details-title">Activity</h2>
                      <button
                        disabled={!hidden}
                        onClick={() => navigate("/characters/create")}
                        id="create-activity-button"
                      >
                        New Post +
                      </button>
                    </div>
                    <div>Activity previews go here</div>
                  </div>
                )
              )}
            </div>
          </main>
        </div>
      }
    </>
  );
}
