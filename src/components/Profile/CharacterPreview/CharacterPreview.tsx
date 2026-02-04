import { useState } from "react"
import type { CharacterPreviewProps } from "../../../types"
import { useNavigate } from "react-router-dom"
import "./CharacterPreview.css"

export default function CharacterPreview({characterName, characterPicture, characterID}: CharacterPreviewProps ){
    const navigate = useNavigate()
    const [hovered, setHovered] = useState<Boolean>(false)

    return(
        <button 
        onClick={() => navigate(`/characters/${characterID}`)} //go to character page on click.
        onMouseOver={() => setHovered(true)} //set hovered to true to show name.
        onMouseLeave={() => setHovered(false)}
        style={{backgroundImage:`url(${characterPicture})`}} //set image of character as button background/
        className='character-preview-button'> 
            { hovered? characterName : "" } {/*Show the name of the character on Hover */}
        </button>
    )
}