import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../Context/CaptainContext'
import axios from 'axios'


const CaptainProtectWrapper = ({ children }) => {

    // const {captain} = useContext(CaptainDataContext);   // we are using this to check if the user is logged in or not
    const token = localStorage.getItem("token");    // we are using because above line  is logout the user when we refresh the page
    const navigate = useNavigate();
    const {captain, setCaptain} = useContext(CaptainDataContext);


    useEffect(() => {
        if (!token) {
            navigate("/login");
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setCaptain(response.data.captain);
                
            }
        }).catch(err => {
            console.log(err);
            localStorage.removeItem("token");
            navigate("/captain-login");
        })
    
    }, [token, navigate, setCaptain]);

    
    // if(isLoading) {
    //     return <div>Loading...</div>    // This will be shown until the data is loaded  
    // }

    

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper
