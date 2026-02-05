import { useNavigate, useParams } from "react-router-dom";
import CharacterNav from "../../components/Character/CharacterNav/CharacterNav";
import useFetch from "../../custom-hooks/useFetch";
import { useAuthContext } from "../../context/AuthContext/AuthContext";
import "./ActivityPage.css";
import { useEffect, useState } from "react";
import DeletionModal from "../../components/Character/DeletionModal/DeletionModal";
import { editExisitingDocument } from "../../utilities/requestHandlers";

export default function ActivityPage() {
  const params = useParams();
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const [deletionModalHidden, setDeletionModalHidden] = useState<boolean>(true);
  const [editing, setEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({title:"", content: ""})

  const activityFetch = useFetch(
    `${import.meta.env.VITE_API_URL}/api/characters/${params.characterId}/activities/${params.activityId}?token=${token}`,
  );
  
  const toggleEditing = (event: React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault()
    setEditing(!editing)
    setFormData( {title: activityFetch.data[0].activity.title, content:activityFetch.data[0].activity.content })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const { name, value } = event.target
    setFormData((prevData) => ({
        ...prevData,
        [name]: value
    }))
  }

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    editExisitingDocument( //Make PUT request to edit data
        "activities",
        params.activityId || "",
        formData,
        token
    )
    setEditing(false) //set editing to false
  }

  //set fetched data as default form data
  useEffect(()=>{
    if(!activityFetch.loading &&
        !activityFetch.error &&
        Object.keys(activityFetch.data[0]).length > 0
    ){
        setFormData(activityFetch.data[0].activity)
    }

  }, [activityFetch.data])

  return activityFetch.loading ? (
    <p>Loading Activity</p>
  ) : activityFetch.error ? (
    navigate("*") //Send ot 404 page when error
  ) : (
    Object.keys(activityFetch.data[0]).length > 0 && (
      <div
        id="activity-page-container"
        className="d-flex flex-column flex-lg-row mt-lg-5"
      >
        <DeletionModal
          hidden={deletionModalHidden}
          setHidden={setDeletionModalHidden}
          documentType="activity"
          id={params.activityId || ""}
        />
        <CharacterNav />
        <main
          id="activity-page"
          className="col-md d-flex flex-column align-items-center justify-content-between"
        >
          <div
            id="activity-container"
            className="d-flex flex-column align-items-center justify-content-between"
          >
            {editing ? (
              <form id="activity-editior" onSubmit={handleSubmit}>
                <input
                name="title"
                onChange={handleChange}
                 className="pb-3 pb-lg-5"
                 value={formData.title}
                 />
                <textarea
                name="content"
                onChange={handleChange}
                >{formData.content}</textarea>
                <button className="confirm">Submit Changes</button>
              </form>
            ) : (
              <div id="activity">
                <h1 className="pb-3 pb-lg-5">
                  {formData.title}
                </h1>
                <p>{formData.content}</p>
              </div>
            )}
            <div id="activity-option-container">
              <button onClick={() => navigate(-1)} className="basic">
                Back
              </button>
              <button onClick={toggleEditing} className="confirm">Edit</button>
              <button
                onClick={() => setDeletionModalHidden(false)}
                className="warning"
              >
                Delete
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  );
}
