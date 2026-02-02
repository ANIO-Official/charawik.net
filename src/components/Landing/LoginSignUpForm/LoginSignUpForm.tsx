import { useState } from 'react'
import './LoginSignUpForm.css'

export default function LoginSignUpForm() {
    const [loggingIn, setLoggingIn] = useState(false)

    const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget
        return button.classList.contains('login') ? setLoggingIn(true) : setLoggingIn(false)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
        console.log('submitted')

        const form = event.currentTarget //cache the form to a variable 
        const formData = new FormData(form) //create new form data
        alert('Registered User!') //alert user of registration (temp/testing)
        form.reset() //reset form
        setLoggingIn(true) //toggle to Login Screen as new default due to registering a new account.
    }

    return (
        <>
            {loggingIn ? <h2>Welcome Back! Your characters missed<br /> you.  ( ͡° ͜ʖ ͡°)</h2> :
                <h2>Are you ready to start your character <br />creation journey? Sign up today!</h2>}

            <form noValidate onSubmit={handleSubmit}>
                <div id="form-toggles" className='d-flex flex-row justify-content-between align-items-center'>
                    <button type='button' onClick={handleToggle} className={`toggler login ${loggingIn ? 'active' : 'inactive'}`}>
                        Login
                    </button>
                    <button type='button' onClick={handleToggle} className={`toggler signup ${loggingIn ? 'inactive' : 'active'}`}>
                        Sign Up
                    </button>
                </div>
                {
                    loggingIn ?
                        <>
                            <div id='form-inputs' className='d-flex flex-column align-items-center pt-4'>
                                <div id='email-input-container'>
                                    <label>Email Address</label><br />
                                    <input type='email' placeholder='janedoesnot404@gmail.com' />
                                </div>
                                <div id='password-input-container'>
                                    <label>Password</label><br />
                                    <input type='password' placeholder='Atleast 8 characters, including 1 number and 1 symbol.' />
                                </div>
                            </div>
                        </> :
                        <>
                            <div id='form-inputs' className='d-flex flex-column align-items-center pt-4'>
                                <div id='username-input-container'>
                                    <label>Username</label><br />
                                    <input type='text' placeholder='judyJuggerna4ut' />
                                </div>
                                <div id='email-input-container'>
                                    <label>Email Address</label><br />
                                    <input type='email' placeholder='janedoesnot404@gmail.com' />
                                </div>
                                <div id='password-input-container'>
                                    <label>Password</label><br />
                                    <input type='password' placeholder='Atleast 8 characters, including 1 number and 1 symbol.' />
                                </div>
                                <div id='password-confirm-container'>
                                    <label>Confirm Password</label><br />
                                    <input type='password' placeholder='Retype your password exactly as before to confirm.' />
                                </div>
                            </div>
                        </>
                }
                <div id='form-submit-button-containiner'>
                    <button type='submit' className='basic'>{` ${loggingIn ? 'Login' : 'Sign Up'}`}</button>
                </div>
            </form>
        </>

    )
}