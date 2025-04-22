import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../Context/UserContext';
import axios from 'axios'

const UserProtectWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token')       // we are using because above line  is logout the user when we refresh the page
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)           // we are using this to check if the user is logged in or not
  

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
                
            }
        })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/login')
            })
    }, [token])

    // if (isLoading) {
    //     return (
    //         <div>Loading...</div>
    //     )
    // }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper








// import React, { useContext, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'


// const UserProtectWrapper = ({ children }) => {

//     // const {user} = useContext(UserDataContext);   // we are using this to check if the user is logged in or not
//     const token = localStorage.getItem("token");    // we are using because above line  is logout the user when we refresh the page
//     const navigate = useNavigate();
//     // const [isLoading, setIsLoading] = React.useState(true);

//     useEffect(() => {
//         if (!token) {
//             navigate("/login");
//         }
//     }, [token]);

//     // if(isLoading) return <h1>Loading...</h1>


//     return (
//         <>
//             {children}
//         </>
//     )
// }

// export default UserProtectWrapper
