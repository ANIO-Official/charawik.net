// For all PUT and POST REQUESTS 

export const submitUser = async (
    form: HTMLFormElement,
    formData: Object,
    isLoading: Function,
    isLogging: Function,
    loggingIn: Boolean,
    isFetchError: Function,
) => {
    try {
        isLoading(true); //Loading is true once fetch begins
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/users/${loggingIn ? "login" : "register"}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            },
        );
        if (!response.ok) throw new Error("API Error! Response was not ok.");
        const data = await response.json();
        //Clear Form, Set to Login, Send to Profile
        form.reset(); //reset form
        isLogging(true); //toggle to Login Screen as new default due to registering a new account.
        return data
    } catch (error) {
        console.error(error);
        isFetchError(true); //Set true, a Fetch error occurs.
    } finally {
        isLoading(false); //Set false, Loading has ended.
    }
};
export const submitProfilePicture = async (
    newImageObj: Object,
    token: string
) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/users/profilepicture?token=${token}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newImageObj),
            },
        );
        if (!response.ok) throw new Error("API Error! Response was not ok.");
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
};
