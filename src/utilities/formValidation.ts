
export function checkValidationFields(form: HTMLFormElement, setErrors: Function) {
    // Checks if all fields are valid when called on Submit of the Form. Returns false when invalid.
    const username: HTMLInputElement | null = form.querySelector('#username')
    const email: HTMLInputElement | null = form.querySelector('#email')
    const password: HTMLInputElement | null = form.querySelector('#password')
    const confirmpasword: HTMLInputElement | null = form.querySelector('#confirmPassword')
    console.log(confirmpasword && confirmpasword.validationMessage)

    /*FORM VALIDITY ON SUBMIT=========================== */
    //check for invalid areas
    switch (true) {
        case username && username.validity.patternMismatch || username && username.validity.tooShort:
            username.setCustomValidity("Must be 4-20 characters. Can include [0-9]. Can include _.")
            setErrors((prevData: object) => ({
                ...prevData,
                username: username?.validationMessage
            }))
            return false
        case email && !email.validity.valid: //do not use setCustomValidity, will overwrite HTML's email validity check.
            setErrors((prevData: object) => ({
                ...prevData,
                email: "Must be in email format. Example: email@place.net"
            }))
            return false
        case password && password.validity.patternMismatch:
            password.setCustomValidity(`8 or more characters, 1 number, 1 symbol, 1 uppercase.`)
            setErrors((prevData: object) => ({
                ...prevData,
                password: password.validationMessage
            }))
            return false
        case password?.validationMessage == "" && confirmpasword?.value !== password?.value:
            confirmpasword?.setCustomValidity("Must match password field.")
            setErrors((prevData: object) => ({
                ...prevData,
                confirmPasword: confirmpasword?.validationMessage
            }))
            return false
        default:
            username && username.setCustomValidity("")
            email && email.setCustomValidity("")
            password && password.setCustomValidity("")
            confirmpasword && confirmpasword.setCustomValidity("")
            setErrors(() => ({
                username: "",
                email: "",
                password: "",
                confirmpasword: ""
            }))
            return true

    }
}

export function valueMissing(form: HTMLFormElement){
    const username: HTMLInputElement | null = form.querySelector('#username')
    const email: HTMLInputElement | null = form.querySelector('#email')
    const password: HTMLInputElement | null = form.querySelector('#password')
    const confirmpasword: HTMLInputElement | null = form.querySelector('#confirmPassword')

    if(
        username && username.value === "" ||
        email && email.value === "" ||
        password && password.value === "" ||
        confirmpasword && confirmpasword.value === ""
    ){
        return true //true a field is missing a value.
    }
    return false // false, everything is filled out
}