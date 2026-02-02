import { useEffect, useState } from "react";
import "./LoginSignUpForm.css";
import { checkValidationFields } from "../../../utilities/formValidation";
import { useNavigate } from "react-router-dom";

export default function LoginSignUpForm() {
    const navigate = useNavigate();
    const [loggingIn, setLoggingIn] = useState<Boolean>(false); //default - Is the user logging in?
    const [field, setField] = useState({
        username: "", //default
        email: "", //default
        password: "", //default
        confirmPassword: "", //default
    });
    const [formIsValid, setFormIsValid] = useState<Boolean>(false); //default - Are all fields valid?

    const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        return button.classList.contains("login")
            ? setLoggingIn(true)
            : setLoggingIn(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setField((prevData) => ({
            ...prevData, //get the previous version of the state variable keyvalue pairs.
            [name]: value, //set it to the new value from the event target.
        }));
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        const validityBool = checkValidationFields(event.currentTarget);
        setFormIsValid(validityBool); //final-check the fields to be sure they are valid.
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        //CheckValidity================
        if (!formIsValid) {
            console.log(field, formIsValid);
            return alert(
                "There are incorrect or missing field(s). Please check the highlighted field(s)! 🔔",
            );
        }
        //=============================
        loggingIn ? alert("Welcome back!") : alert("Welcome to CharaWik! Let's get you to your profile.ヾ(⌐■_■)ノ♪")
        //Send New User Data to Database============
        const form = event.currentTarget; //cache the form to a variable
        const formData = new FormData(form); //create new form data
        //===========================================
        //Clear Form, Set to Login, Send to Profile
        form.reset(); //reset form
        setLoggingIn(true); //toggle to Login Screen as new default due to registering a new account.
        loggingIn? navigate(`/exampleToReplace`) : navigate(`/${field.username}`)
    };

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
                            <div id="email-input-container">
                                <label>Email Address</label>
                                <br />
                                <input
                                    onChange={handleChange}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="janedoesnot404@gmail.com"
                                />
                            </div>
                            <div id="password-input-container">
                                <label>Password</label>
                                <br />
                                <input
                                    onChange={handleChange}
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Atleast 8 characters, including 1 number and 1 symbol."
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
                            <div id="username-input-container">
                                <label>Username</label>
                                <br />
                                <input
                                    onChange={handleChange}
                                    id="username"
                                    type="text"
                                    name="username"
                                    placeholder="judyJuggerna4ut"
                                />
                            </div>
                            <div id="email-input-container">
                                <label>Email Address</label>
                                <br />
                                <input
                                    onChange={handleChange}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="janedoesnot404@gmail.com"
                                />
                            </div>
                            <div id="password-input-container">
                                <label>Password</label>
                                <br />
                                <input
                                    onChange={handleChange}
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Atleast 8 characters, including 1 number and 1 symbol."
                                />
                            </div>
                            <div id="password-confirm-container">
                                <label>Confirm Password</label>
                                <br />
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
            </form>
        </>
    );
}
