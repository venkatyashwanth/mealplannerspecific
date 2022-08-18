import { useNavigate } from "react-router-dom"

const HomePage = () => {
    let navigate = useNavigate();
    const navigateToProfilesPage = () => {
        navigate('/profilesPage')
    }

    const navigateToCreateProfilePage = () => {
        navigate('/registerProfile')
    }


    return(
        <>
            <h1>Do you have your profile?</h1>
            <div>
                <button onClick={navigateToProfilesPage}>YES</button>
                <button onClick={navigateToCreateProfilePage}>NO</button>
            </div>
        </>
    )
}

export default HomePage