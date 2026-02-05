import { useNavigate } from "react-router-dom";
import ProfileNav from "../../components/Profile/ProfileNav/ProfileNav";
import { useEffect } from "react";
import CharacterList from "../../components/Profile/CharacterList/CharacterList";

export default function ProfilePage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {//No token? No access | 404 Page Redirect
    if (!token || token === "") {
      navigate("*");
    }
  }, [token]);

  return (
    <>
      <div id="profile-page-container" className="d-flex flex-column flex-lg-row mt-lg-5">
        <ProfileNav />
        <main
          id="profile-page"
          className="col-md d-flex flex-column align-items-center justify-content-between"
        >
          <CharacterList />
        </main>
      </div>
    </>
  );
}
