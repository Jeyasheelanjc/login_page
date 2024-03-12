import React, { useEffect, useState } from 'react'
import { userDetailApi } from '../services/Api'
import Navbar from '../components/Navbar'
import { logOut, isAuthenticated } from '../services/Auth'
import { useNavigate, Navigate } from 'react-router-dom'

const Dashboard = () => {
    const [user, setUser] = useState({
        email: "", localId: ""
    })

    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated()) {
            userDetailApi().then((response) => {
                console.log(response);
                setUser({
                    // name:response.data.users[0].displayName,
                    email: response.data.users[0].email,
                    localId: response.data.users[0].localId
                })
            })
        }
    }, [])
    const logoutUser = () => {
        logOut()
        navigate('/login')
    }
    if (!isAuthenticated()) {
        return <Navigate to="/login" />
    }
    return (
        <>
            <Navbar logoutUser={logoutUser} />
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-9 dash py-4 px-4 mx-auto mt-5 ">
                        <div>
                            <h4 className='text-center '>Dashboard page</h4>
                        </div>
                        {
                            user.email && user.localId ? (
                                <div className='text-center '>
                                    <p>Hi  your Firebase id is <b>{user.localId}</b> </p>
                                    <p>Your email id is {user.email}</p>
                                </div>
                            ) : (<p className='text-center  '>Loading...</p>)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
