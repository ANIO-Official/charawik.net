import { useNavigate, useParams } from 'react-router-dom'
import './CharacterPage.css'
import CharacterNav from '../../components/Character/CharacterNav/CharacterNav'

export default function CharacterPage(){
    const params = useParams()
    const navigate = useNavigate()

    return (
        <>
            {
                <div id="character-page-container" className="row mt-5">
                    <CharacterNav/>
                    <main id="character-page" className="col-md d-flex flex-column align-items-center justify-content-between">
                        Body
                    </main>
                </div>

            }
        </>
    )
}