import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext/AuthContext";
import useFetch from "../../../custom-hooks/useFetch";
import Mascot from "../../../assets/charawik-mascot-anio.png";
import "../../MainNav.css"
import { editExisitingDocument } from "../../../utilities/requestHandlers";

export default function CharacterNav() {
    const params = useParams();
    const { token, username } = useAuthContext();
    const navigate = useNavigate();
    //Fetch Characters - GET REQUEST (Default Request of useFetch)
    const characterFetch = useFetch(
        `${import.meta.env.VITE_API_URL}/api/characters/${params.characterId}?token=${token}`,
    );
    const [uploading, setUploading] = useState<Boolean>(false);
    const [profileImage, setProfileImage] = useState({ profileImage: "" });
    useEffect(() => {
        if (
            Object.keys(characterFetch.data[0]).length > 0 && //data returns
            !characterFetch.loading && //not loading more data
            !characterFetch.error
        ) {
            const imageURL: string = characterFetch.data[0].characters.profileImage
            // no error occured
            setProfileImage({ profileImage: imageURL }); //set the data to the profile picture state variable.
        }
    }, [characterFetch.data]);

    //PUT Request for Any changes submitted
    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        await editExisitingDocument(
            "characters",
            params.characterId ?? "",
            profileImage,
            token
        );
        setUploading(false);
    };

    const handleURLChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.preventDefault();
        setProfileImage({ ...profileImage, profileImage: event.target.value });
    };

    const handleCancelUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setUploading(false);
    };

    return (
        <header className="d-flex flex-row justify-content-start col-md">
            <nav
                id="main-nav"
                className="bg-white d-flex flex-column align-items-center justify-content-between p-lg-5"
            >
                <form
                    className="d-flex flex-column justify-content-center"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="profile-image-input" className="text-center">
                        <h2 id="username" className="py-1 pt-lg-4 pb-lg-5">@{username}</h2>
                        <img
                            onClick={() => setUploading(true)}
                            id="profile-image-upload"
                            src={profileImage.profileImage || Mascot}
                            alt="Character profile picture."
                        />
                    </label>
                    <input
                        onChange={(event) => handleURLChange(event)}
                        style={uploading ? { display: "block" } : { display: "none" }}
                        placeholder="Enter a URL for your image. JPG, JPEG, or PNG."
                        type="url"
                        name="profile-image-input"
                        id="profile-image-input"
                    />
                    {uploading ? (
                        <div id="upload-buttons-container">
                            <button type="submit" className="confirm">
                                Upload
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelUpload}
                                className="warning"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        false
                    )}
                </form>
                <h2 style={{ color: "#575757" }}>
                    {Object.keys(characterFetch.data[0]).length > 0 &&
                        characterFetch.data[0].characters.name}
                </h2>
                {characterFetch.loading ? (
                    <h2 id="stats-loading">Loading Character Age</h2>
                ) : characterFetch.error ? (
                    <h2 id="stats-error">Error Obtaining Character Age! Sorry :(</h2>
                ) : (
                    Object.keys(characterFetch.data[0]).length > 0 &&
                    (<h2 id="stats">
                        {
                            characterFetch.data[0].characters.age === "" ?
                                <i>No Age Provided</i> :
                                ` Age: ${characterFetch.data[0].characters.age}`}</h2>)
                )
                }
                <button onClick={() => navigate(`/${username}`)} className="basic">
                    My Profile
                </button>
            </nav>
        </header>
    );
}