import { useAuthContext } from "../../../context/AuthContext/AuthContext";
import type { Character } from "../../../types";
import useFetch from "../../../custom-hooks/useFetch";
import "./CharacterList.css"
import AddCharacterButton from "../AddCharacterButton/AddCharacterButton";
import CharacterPreview from "../CharacterPreview/CharacterPreview";

export default function CharacterList() {
    const { token } = useAuthContext()

    //Fetch Characters - GET REQUEST (Default Request of useFetch)
    const { data, loading, error } = useFetch(
        `${import.meta.env.VITE_API_URL}/api/characters?token=${token}`,
    );

    const blanks = Array.from({ length: 12 - data[0].count })

    return (
        <div id="character-list-container" className="d-flex flex-column align-items-center justify-content-between">
            <h2>Characters</h2>
            {
                loading ? <p>Loading Characters...</p> : //Loading Data
                    error ? <p>Error Loading Characters!</p> : //Error Obtaining Data
                        data && data.length > 0 && data[0].count > 0 ?
                            <ul
                                id="character-list"
                                className="row row-cols-md-3 d-flex justify-content-around"
                                style={{ listStyle: "none" }}
                            >
                                {
                                    data[0].characters.map((character: Character) => (
                                        <CharacterPreview key={character._id} 
                                        characterName={character.name}
                                        characterPicture={character.profileImage}
                                        characterID={character._id}
                                        />
                                    ))
                                }
                                {
                                    data[0].count < 12 && blanks.map((blank, index) => (
                                        <AddCharacterButton key={`blank${index}${blank}`} />
                                    ))
                                }
                            </ul>
                            :
                            <ul
                                id="character-list"
                                className="row row-cols-md-3 d-flex justify-content-around"
                                style={{ listStyle: "none" }}
                            >
                                {
                                    blanks.map((blank, index) => (
                                        <AddCharacterButton key={`blank${index}${blank}`} />
                                    ))
                                }
                            </ul>
            }
        </div>
    )
}