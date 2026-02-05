import { useNavigate } from "react-router-dom";
import "./CharacterCreationNav.css";

export default function CharacterCreationNav() {
  const navigate = useNavigate()

  return (
    <header className="d-flex flex-row justify-content-start col-md">
      <nav
        id="creation-nav"
        className="bg-white d-flex flex-column align-items-center justify-content-between p-5 "
      >
        <button className="warning" onClick={() => {navigate(-1)}}>Cancel</button>

      </nav>
    </header>
  );
}
