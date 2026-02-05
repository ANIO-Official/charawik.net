import { useNavigate } from "react-router-dom";
import "./CharacterCreationNav.css";
import { useAuthContext } from "../../../context/AuthContext/AuthContext";

export default function CharacterCreationNav() {
  const navigate = useNavigate();
  const { username } = useAuthContext();

  return (
    <header className="d-flex flex-row justify-content-start col-md">
      <nav
        id="creation-nav"
        className="bg-white d-flex flex-column align-items-start justify-content-start pb-2 p-lg-5 "
      >
        <button
          className="warning"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
        <h2 className="mt-1 mt-lg-3">@{username}</h2>
        <h2 className="mt-1 mt-lg-3"><i>Currently creating a new character.</i></h2>
        <div id="requirements" className="d-flex flex-row flex-lg-column mt-1 mt-lg-3">
          <h2 className="directions">
            Required <br />
            - Profile Image
            <br />
            - Name <br />
            - Biography <br />
          </h2>
          <br />
          <h2 className="ms-2 directions">
            Optional <br />
            - Age <br />
            - Likes <br />
            - Dislikes
          </h2>
        </div>
      </nav>
    </header>
  );
}
