import { useNavigate } from "react-router-dom";
import type { DeletionModalProps } from "../../../types";
import { deleteExisitingDocument } from "../../../utilities/requestHandlers";
import "./Deletion Modal.css";
import { useAuthContext } from "../../../context/AuthContext/AuthContext";
export default function DeletionModal({
  hidden,
  setHidden,
  documentType,
  id,
}: DeletionModalProps) {
  const { token, username } = useAuthContext();
  const navigate = useNavigate();

  const handleDeletion = () => {
    deleteExisitingDocument("characters", id, token);
    navigate(`/${username}`);
  };

  return (
    !hidden && (
      <div className="modal-container d-flex flex-column align-items-center justify-content-center">
        <div className="deletion-modal">
          <p>Are you sure you want to delete this {documentType}?</p>
          <div className="d-flex flex-row">
            <button onClick={handleDeletion} className="warning">
              Yes
            </button>
            <button onClick={() => setHidden(true)} className="confirm">
              No
            </button>
          </div>
        </div>
      </div>
    )
  );
}
