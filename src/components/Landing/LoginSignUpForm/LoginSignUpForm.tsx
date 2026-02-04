import { useState } from "react";
import "./LoginSignUpForm.css";
import { checkValidationFields, valueMissing } from "../../../utilities/formValidation";
import { useNavigate } from "react-router-dom";
import { submitUser } from "../../../utilities/userSubmission";
import type { userData } from "../../../types";
import { useAuthContext } from "../../../context/AuthContext/AuthContext";

export default function LoginSignUpForm() {
    const navigate = useNavigate();
    const [formIsValid, setFormIsValid] = useState<Boolean>(false); //default - Are all fields valid?
    const [isLoading, setIsLoading] = useState<Boolean>(false)
    const [fetchError, setFetchError] = useState<Boolean>(false)
    const [loggingIn, setLoggingIn] = useState<Boolean>(false); //default - Is the user logging in?
    const [errorField, setErrorField] = useState({
        username: "", //default
        email: "", //default
        password: "", //default
        confirmPassword: "" //default
    })
    const [formData, setFormData] = useState({
        username: "", //default
        email: "", //default
        password: "", //default
        confirmPassword: "" //default
    });

    //Context
    const { setToken, setUsername } = useAuthContext()

    //Form Toggling Buttons
    const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        return button.classList.contains("login")
            ? setLoggingIn(true)
            : setLoggingIn(false);
    };

    //Input Changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData, //get the previous version of the state variable keyvalue pairs.
            [name]: value, //set it to the new value from the event target.
        }));
    }

    //Form Validation Checks
    const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        const validityBool = checkValidationFields(event.currentTarget, setErrorField);
        setFormIsValid(validityBool); //final-check the fields to be sure they are valid.
    };

    //Form Submission : Final Validity Check, Check if Logging in or Signing Up, Send Appropriate Message, Send FormData
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        //CheckValidity================
        if (valueMissing(event.currentTarget)) {
            return alert(
                "You missed a field. Please check again! ( ﾉ ﾟｰﾟ)ﾉ",
            );
        }
        if (!formIsValid) {
            return alert(
                "Please check the highlighted field(s)! 🔔",
            );
        }
        //=============================
        //Welcome Alert, Send New User Data to Database============
        const data: userData[] = await submitUser(
            event.currentTarget, //form
            formData, //formData
            setIsLoading, //Function for loading state variable
            setLoggingIn, //Function for logging state variable
            loggingIn, //State variable for Logging in
            setFetchError //Function for a fetch error state variable.
        )
        setToken(data[0].token) //update state
        setUsername(data[0].user.username) //update state
        data && alert("Let's get you to your profile.ヾ(⌐■_■)ノ♪");
        data && navigate(`/${data[0].user.username}`); //Send to Profile with Data obtained
    }

    return (
        <>
            {loggingIn ? (
                <h2>
                    Welcome Back! Your characters missed
                    <br /> you. ( ͡° ͜ʖ ͡°)
                </h2>
            ) : (
                <h2>
                    Are you ready to start your character <br />
                    creation journey? Sign up today!
                </h2>
            )}

            <form
                id="login-signup-form"
                noValidate
                onChange={handleFormChange}
                onSubmit={handleSubmit}
            >
                <div
                    id="form-toggles"
                    className="d-flex flex-row justify-content-between align-items-center"
                >
                    <button
                        type="button"
                        onClick={handleToggle}
                        className={`toggler login ${loggingIn ? "active" : "inactive"}`}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={handleToggle}
                        className={`toggler signup ${loggingIn ? "inactive" : "active"}`}
                    >
                        Sign Up
                    </button>
                </div>
                {loggingIn ? (
                    <>
                        <div
                            id="form-inputs"
                            className="d-flex flex-column align-items-center pt-4"
                        >
                            <div id="email-input-container" className="d-flex flex-column">
                                <label htmlFor="email">Email Address</label>
                                <span id="email-error" className="error-message">{errorField.email}</span>
                                <input
                                    onChange={handleChange}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="janedoesnot404@gmail.com"
                                />
                            </div>
                            <div id="password-input-container" className="d-flex flex-column">
                                <label htmlFor="password">Password</label>
                                <span id="password-error" className="error-message">{errorField.password}</span>
                                <input
                                    onChange={handleChange}
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Atleast 8 characters, 1 number, 1 symbol, & 1 uppercase."
                                    minLength={8}
                                    maxLength={16}
                                    pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            id="form-inputs"
                            className="d-flex flex-column align-items-center pt-4"
                        >
                            <div id="username-input-container" className="d-flex flex-column">
                                <label htmlFor="username">Username</label>
                                <span id="username-error" className="error-message">{errorField.username}</span>
                                <input
                                    onChange={handleChange}
                                    id="username"
                                    type="text"
                                    name="username"
                                    placeholder="judyJuggerna4ut"
                                    minLength={4}
                                    maxLength={20}
                                    pattern="^[a-z0-9\d](?:[a-z0-9\d]|_(?=[a-z0-9\d])){0,38}"
                                />
                            </div>
                            <div id="email-input-container" className="d-flex flex-column">
                                <label htmlFor="email">Email Address</label>
                                <span id="email-error" className="error-message">{errorField.email}</span>
                                <input
                                    onChange={handleChange}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="janedoesnot404@gmail.com"
                                />
                            </div>
                            <div id="password-input-container" className="d-flex flex-column">
                                <label htmlFor="password">Password</label>
                                <span id="password-error" className="error-message">{errorField.password}</span>
                                <input
                                    onChange={handleChange}
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Atleast 8 characters, 1 number, 1 symbol, & 1 uppercase."
                                    minLength={8}
                                    maxLength={16}
                                    pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"
                                />
                            </div>
                            <div id="confirm-password-container" className="d-flex flex-column">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <span id="confirmPassword-error" className="error-message">{errorField.confirmPassword}</span>
                                <input
                                    onChange={handleChange}
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Retype your password exactly as before to confirm."
                                />
                            </div>
                        </div>
                    </>
                )}
                <div id="form-submit-button-containiner">
                    <button
                        type="submit"
                        className="basic"
                    >{` ${loggingIn ? "Login" : "Sign Up"}`}</button>
                </div>
                {
                    isLoading ? <p id="submit-message">Logging you in...(∪.∪ )...zzz</p> :
                        fetchError && !loggingIn ? <p id="submit-error">A server error occured while registering user. Please try again later.</p> :
                            fetchError && loggingIn ? <p id="submit-error">Incorrect Username or Password!</p> :
                                <p></p>}
            </form>
        </>
    );
}
