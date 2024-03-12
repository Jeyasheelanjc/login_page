import React from 'react'
import { isAuthenticated } from '../services/Auth'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    return (
        <div>

            <nav class="navbar navbar-expand-lg navbar-light ">
                <div class="container-fluid">
                    <a class="navbar-brand fw-bold " href="#">Jeya Sheelan</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            {!isAuthenticated() ? (<li className="nav-item"><Link to="/register" className="nav-link" >Register</Link></li>) : null}
                            {!isAuthenticated() ? (<li><Link to="/login" className="nav-link"  >Login</Link></li>) : null}
                            {isAuthenticated() ? (<li className="nav-item"><Link to="/dashboard" className="nav-link" >Dashboard</Link></li>) : null}
                            {isAuthenticated()?(<li className='nav-item' onClick={props.logoutUser}><a className='nav-link'>Logout</a></li>):null}
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
