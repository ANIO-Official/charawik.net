// For all PUT, POST, and DELETE REQUESTS 

//CREATE A DOCUMENT
export const createNewDocument = async (
    collection: string,
    id: string,
    newData: Object,
    token: string
) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/${collection === "characters" ?  //Create Character
                `${collection}` : `characters/${id}/${collection}` //Create Activity
            }?token=${token}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newData),
            },
        );
        if (!response.ok) throw new Error("API Error! Response was not ok.");
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
        return error
    }
};

//EDIT A DOCUMENT
export const editExisitingDocument = async (
    collection: string,
    id: string,
    newData: Object,
    token: string
) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/${collection}/${id}?token=${token}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newData),
            },
        );
        if (!response.ok) throw new Error("API Error! Response was not ok.");
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
         return error
    }
};

//DELETE A DOCUMENT
export const deleteExisitingDocument = async (
    collection: string,
    id: string,
    token: string
) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/${collection}/${id}?token=${token}`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            },
        );
        if (!response.ok) throw new Error("API Error! Response was not ok.");
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
         return error
    }
};


