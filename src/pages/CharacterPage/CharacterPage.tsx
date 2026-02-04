import { useNavigate, useParams } from "react-router-dom";
import "./CharacterPage.css";
import CharacterNav from "../../components/Character/CharacterNav/CharacterNav";
import useFetch from "../../custom-hooks/useFetch";
import { useAuthContext } from "../../context/AuthContext/AuthContext";
import DeletionModal from "../../components/Character/DeletionModal/DeletionModal";
import { useState } from "react";

export default function CharacterPage() {
    const params = useParams();
    const { token } = useAuthContext();
    const navigate = useNavigate();
    const [hidden, setIsHidden] = useState(true)
    const characterFetch = useFetch(
        `${import.meta.env.VITE_API_URL}/api/characters/${params.characterId}?token=${token}`,
    );

    return (
        <>
            <DeletionModal
                hidden={hidden}
                setHidden={setIsHidden}
                documentType="character"
                id={params.characterId?? ""}
            />
            {

                <div id="character-page-container" className="row mt-5">
                    <CharacterNav />
                    <main
                        id="character-page"
                        className="col-md d-flex flex-column align-items-center justify-content-between"
                    >
                        <div
                            id="character-details-container"
                            className="d-flex flex-column align-items-center justify-content-start"
                        >
                            <div className=" button-container d-flex flex-row justify-content-between">
                                <div style={{ maxHeight: "fit-content" }}>
                                    <button 
                                    className="warning" 
                                    onClick={() => setIsHidden(false)}>Delete</button>

                                </div>

                                <h2 id="character-subname">
                                    {Object.keys(characterFetch.data[0]).length > 0 &&
                                        characterFetch.data[0].characters.name}
                                </h2>
                            </div>
                            {characterFetch.loading ? (
                                <p>Loading Character Data...</p> //Loading Data
                            ) : characterFetch.error ? (
                                <p>Error Loading Character Data!</p> //Error Obtaining Data
                            ) : (
                                Object.keys(characterFetch.data[0]).length > 0 && ( //When data exist, display it
                                    <div id="character-details">
                                        <h2 className="character-details-title">Bio</h2>
                                        <p>{characterFetch.data[0].characters.biography}</p> {/*Biography */}
                                        <div id="like-dislikes-container">
                                            <div id="likes-container">
                                                <h2 className="character-details-title">Likes</h2>
                                                <ul>
                                                    {characterFetch.data[0].characters.likes.length ===
                                                        0 ? ( //Character has no likes
                                                        <p>
                                                            <i>No Likes Yet! ヾ(•ω•`)o</i>
                                                        </p>
                                                    ) : ( //Character has likes
                                                        characterFetch.data[0].characters.likes.map(
                                                            (item: string) => <li>{item}</li>,
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                            <div id="dislikes-container">
                                                <h2 className="character-details-title">Dislikes</h2>
                                                <ul>
                                                    {characterFetch.data[0].characters.dislikes.length ===
                                                        0 ? ( //Character has no dislikes
                                                        <p>
                                                            <i>No Disikes Yet! (╬▔皿▔)╯</i>
                                                        </p>
                                                    ) : ( //Character has dislikes
                                                        characterFetch.data[0].characters.dislikes.map(
                                                            (item: string) => <li>{item}</li>,
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="button-container d-flex flex-row justify-content-between">
                                            <h2 className="character-details-title">Activity</h2>
                                            <button 
                                            disabled={!hidden}
                                            onClick={() => navigate("/characters/create")} 
                                            id="create-activity-button">New Post +</button>
                                        </div>
                                        <div>Activity previews go here</div>
                                    </div>
                                )
                            )}
                        </div>
                    </main>
                </div>
            }
        </>
    );
}
