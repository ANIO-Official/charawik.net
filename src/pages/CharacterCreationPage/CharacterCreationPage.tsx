import { useNavigate } from "react-router-dom";
import CharacterCreationNav from "../../components/CharacterCreation/CharacterCreationNav/CharacterCreationNav";
import "./CharacterCreationPage.css";
import { useEffect } from "react";

export default function CharacterCreationPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    //no token? No access. 404 Page Redirect
    if (!token || token === "") {
      navigate("*");
    }
  }, [token]);

  return (
    <div id="profile-page-container" className="row row-cols row-cols-lg-2 mt-lg-5">
      <CharacterCreationNav />
      Body
    </div>
  );
}
