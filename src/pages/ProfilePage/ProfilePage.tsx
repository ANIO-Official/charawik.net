import { useNavigate, useParams } from "react-router-dom"
import "./ProfilePage.css"
import ProfileNav from "../../components/Profile/ProfileNav/ProfileNav"
import { useEffect } from "react"
import CharacterList from "../../components/Profile/CharacterList/CharacterList"

export default function ProfilePage() {
    const params = useParams()
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        if (!token || token === "") {
            navigate("*")
        }
    }, [token])

    return (
        <>
            {
                <div id="profile-page-container" className="row mt-5">
                    <ProfileNav />
                    <main id="profile-page" className="col-md d-flex flex-column align-items-center justify-content-between">
                        <CharacterList/>
                    </main>
                </div>

            }
        </>
    )
}