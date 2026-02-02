
export function checkValidationFields(form:HTMLFormElement){
     // Checks if all fields are valid when called on Submit of the Form. Returns false when invalid.
        const username : HTMLInputElement | null = form.querySelector('#username')
        const email : HTMLInputElement | null = form.querySelector('#email')
        const password : HTMLInputElement | null = form.querySelector('#password')
        const confirmpasword : HTMLInputElement | null = form.querySelector('#cofirmPassword')

        /*FORM VALIDITY ON SUBMIT=========================== */
        //check for invalid areas
        switch (true){
            case username && !username.validity.valid:
                return false
            case email && !email.validity.valid:
                return false
            case password && !password.validity.valid:
                return false
            case confirmpasword && !confirmpasword.validity.valid:
                return false
            default:
                return true 
                
        }
}