import Navbar from '../../components/Landing/Navbar/Navbar'
import './LandingPage.css'
import CharawikMascot from '../../assets/charawik-mascot-anio.png'
import LoginSignUpForm from '../../components/Landing/LoginSignUpForm/LoginSignUpForm'

export default function LandingPage() {
    return (
        <>
            <Navbar />
            <div id='landing-split-container' className='d-flex flex-row justify-content-between'>
                <div id='landing-left'>
                    <p id='welcome-message' className='pb-1'>Welcome to CharaWik!</p>
                    <p id='website-description'>A secure personal platform to host your<br />
                        characters’ information for creatives.</p>
                    <img id='charawik-mascot' src={CharawikMascot} />
                </div>
                <div id='landing-right'>
                    <LoginSignUpForm />
                </div>
            </div>
            <div id='credits' className='d-flex flex-row justify-content-between'>
                <p>Programmed and Designed By: Amanda Ogletree (ANIO)</p>
                <p>Update Log (TBA)</p>
            </div>
        </>
    )
}