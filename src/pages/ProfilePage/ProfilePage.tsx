import { useParams } from "react-router-dom"
import "./ProfilePage.css"
import ProfileNav from "../../components/Profile/ProfileNav/ProfileNav"

export default function ProfilePage(){
    const params = useParams()

    return(
        <div id="profile-page-container" className="row">
            <ProfileNav/>
            <main id="profile-page" className="col-md">

            </main>
        </div>
    )
}