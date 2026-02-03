import { useNavigate } from "react-router-dom"
import './NotFoundPage.css'

export default function NotFoundPage(){
    const navigate = useNavigate()

    return(
        <main id="notfound-error-page" className="d-flex flex-column align-items-center">
            <p id="notfound-error-title">404 Not Found</p>
            <h2 id="notfound-error-subtitle">Page Not Found</h2>
            <p id="notfound-error-subtext" className="py-5 text-center">
                The page you were looking for doesn't exist!
                <br/>
                <i>The url may be mistyped in the address bar or the page was moved.</i>
                <br/>
                <b>Here's a way back home. o(*￣▽￣*)ブ See ya, cowboy!</b>
            </p>
            <button id="notfound-error-button" onClick={() => navigate('/')}>Return to Landing Page</button>
        </main>
    )
}