import { useNavigate } from "react-router-dom"
import './NotFoundPage.css'
import { useAuthContext } from "../../context/AuthContext/AuthContext"

export default function NotFoundPage(){
    const navigate = useNavigate()
    const { token, username } = useAuthContext()

    const handleRedirect = (event: React.MouseEvent<HTMLButtonElement>)=>{
       (!token || !token && username) && navigate('/') //No token, go to landing
       token && username && navigate(`/${username}`) // Token and username, go to user Profile
    }

    return(
        <main id="notfound-error-page" className="d-flex flex-column align-items-center">
            <p id="notfound-error-title">404 Not Found</p>
            <h2 id="notfound-error-subtitle">Page Not Found</h2>
            <p id="notfound-error-subtext" className="py-5 text-center">
                The page you were looking for doesn't exist!
                <br/>
                <i>Make sure you're logged in or that the url is typed correctly.</i>
                <br/>
                <b>Here's a way back home. o(*￣▽￣*)ブ See ya, cowboy!</b>
            </p>
            <button id="notfound-error-button" onClick={handleRedirect}>Return to Landing Page</button>
        </main>
    )
}