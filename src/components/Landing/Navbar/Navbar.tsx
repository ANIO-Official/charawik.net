import './Navbar.css'
import { NavLink } from "react-router-dom"

export default function Navbar(){
    return(
        <header className='d-flex flex-row justify-content-center'>
            <nav id='landing-nav' className='bg-white p-3 d-flex flex-row justify-content-center'>
                <NavLink to="/" style={{textDecoration: 'none'}}>
                    <h1 id="title">🌐 CharaWik.net <i id="subtitle">The character creation network!( •̀ ω •́ )y</i></h1>
                </NavLink>
            </nav>
        </header>
    )
}