import { useAuthContext } from "../../../context/AuthContext/AuthContext";
import type { ActivityModalProps } from "../../../types";
import "./ActivityModal.css";
import { createNewDocument } from "../../../utilities/requestHandlers";
import { useState } from "react";

export default function ActivityModal({
  hidden,
  setHidden,
  id,
}: ActivityModalProps) {
  const { token } = useAuthContext();
  const [values, setValues] = useState<Object>({});

  //Update the Value of the fields
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Create new Activity via Post Request
  const handlePost = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    createNewDocument("activities", id, values, token);
    setHidden(true)
  };

  return (
    !hidden && (
      <div className="modal-container d-flex flex-column align-items-center justify-content-center">
        <div id="activity-modal">
          <h3 className="inactive">
            <i>Creating new Activity Post</i>
          </h3>
          <br />
          <form onSubmit={handlePost} className="d-flex flex-column">
            <input
            onChange={handleChange}
              id="activity-title"
              name="title"
              aria-label="activity title"
              placeholder="Example: Jamie's Worst Day"
            />
            <textarea
            onChange={handleChange}
              id="activity-content"
              name="content"
              aria-label="activity content"
              placeholder="Tripped loudly in the library and scared a cat with his fart."
            ></textarea>
            <button type="button" onClick={() => setHidden(true)} className="warning">
              Cancel
            </button>
            <button type="submit" className="confirm">Post</button>
          </form>
        </div>
      </div>
    )
  );
}
