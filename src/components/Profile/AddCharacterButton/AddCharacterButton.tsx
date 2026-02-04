import { useNavigate } from "react-router-dom";
import "./AddCharacterButton.css";

export default function AddCharacterButton() {
  const navigate = useNavigate()
  return (
    <button
    onClick={() => navigate("/characters/create")}
    className="add-character-button ">
      +
    </button>
  );
}
