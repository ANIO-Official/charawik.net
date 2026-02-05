import Mascot from "../../../assets/charawik-mascot-anio.png";
import { useNavigate, useParams } from "react-router-dom";
import "../../MainNav.css";
import { useAuthContext } from "../../../context/AuthContext/AuthContext";
import useFetch from "../../../custom-hooks/useFetch";
import { useEffect, useState } from "react";
import { submitProfilePicture } from "../../../utilities/userRequests";
import type { ProfileImage } from "../../../types";

export default function ProfileNav() {
    const params = useParams();
    const { token, setToken } = useAuthContext();
    const navigate = useNavigate();

    //Fetch Characters - GET REQUEST (Default Request of useFetch)
    const { data, loading, error } = useFetch(
        `${import.meta.env.VITE_API_URL}/api/characters?token=${token}`,
    );
    const mongoProfilePicture = useFetch(
        `${import.meta.env.VITE_API_URL}/api/users/profilepicture?token=${token}`,
    );
    const [uploading, setUploading] = useState<Boolean>(false);
    const [profileImage, setProfileImage] = useState<ProfileImage>({
        profilePicture: "",
    });

    useEffect(() => {
        if (
            Object.keys(mongoProfilePicture.data[0]).length > 0 && //data returns
            !mongoProfilePicture.loading && //not loading more data
            !mongoProfilePicture.error
        ) {
            // no error occured
            setProfileImage(mongoProfilePicture.data[0]); //set the data to the profile picture state variable.
        }
    }, [mongoProfilePicture.data]);

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        await submitProfilePicture(profileImage, token);
        setUploading(false);
    };

    const handleURLChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.preventDefault();
        setProfileImage({ ...profileImage, profilePicture: event.target.value });
    };

    const handleCancelUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setUploading(false);
    };

    const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setToken("");
        navigate("/");
        console.log("logged out.");
    };

    return (
        <header className="d-flex flex-row justify-content-start col-md">
            <nav
                id="main-nav"
                className="bg-white d-flex flex-column align-items-center justify-content-between p-1 p-lg-5"
            >
                <form
                    className="d-flex flex-column justify-content-center"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="profile-image-input" className="text-center">
                         <h2 id="username" className="py-1 pt-lg-4 pb-lg-5">@{params.username}</h2>
                        <img
                            onClick={() => setUploading(true)}
                            id="profile-image-upload"
                            src={profileImage.profilePicture || Mascot}
                            alt="Your profile picture."
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
                {loading ? (
                    <h2 id="stats-loading">Loading Character Stats...</h2>
                ) : error ? (
                    <h2 id="stats-error">Error Obtaining Character Stats! Sorry :(</h2>
                ) : (
                    <h2 id="stats">
                        {" "}
                        {Object.keys(data[0]).length === 0 ? 0 : data[0].count} character(s)
                        made
                    </h2>
                )}
                <button onClick={handleLogout} className="warning">
                    Logout
                </button>
            </nav>
        </header>
    );
}
