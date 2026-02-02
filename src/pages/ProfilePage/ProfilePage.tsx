import { useParams } from "react-router-dom"


export default function ProfilePage(){
    const params = useParams()

    return(
        <>
            Profile
            @{params.username}
            <p>Welcome to your page {params.username}</p>
        </>
    )
}