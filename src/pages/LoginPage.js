import React from 'react'
import { useState } from 'react'
import { LOGIN_API } from '../services/Api'
import { StorageUser } from '../services/Storage'
import { Link, Navigate } from 'react-router-dom'
import { isAuthenticated } from '../services/Auth'
import Navbar from '../components/Navbar'

const LoginPage = () => {
    // return <Navigate to="/dashboard" />
    const initialStateErrors = {
        email: { required: false },
        password: { required: false },
        custom_error: null
    }

    //  To hide and display the errors in register page

    const [errors, setErrors] = useState(initialStateErrors)

    // Tp hide and display the Spinner-loader

    const [loading, setLoading] = useState(false)
    const [inputs, setInput] = useState({
        email: "",
        password: "",
       
    })
    console.log(inputs);

    const handleInput = (e) => {
        setInput({ ...inputs, [e.target.name]: e.target.value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        let errors = initialStateErrors
        let haserror = false
        if (inputs.email === "") {
            errors.email.required = true
            haserror = true
        }
        if (inputs.password === "") {
            errors.password.required = true
            haserror = true
        }


        if (!haserror) {
            setLoading(true)
            LOGIN_API(inputs).then((response) => {
                // console.log(response);
                StorageUser(response.data.idToken)

            }).catch((err) => {
                // console.log(err)
                if(err.code==='BAD_BAD_REQUEST'){
                    setErrors({...errors,custom_error:'Invalid Credentials'})
                }                
            }).finally(() => {
                setLoading(false)
            })
        }
        setErrors({...errors})
    }

    if (isAuthenticated()) {
        return <Navigate to="/dashboard" />
    }
    return (
        <div>
             <Navbar />
            <section className="login-block px-3">
                <div className="container ">
                    <div className="row  justify-content-center min-vh-100   d-flex align-items-center ">
                        <div className="col-lg-4 col-md-8 login-sec py-5 px-3 ">
                            <h2 className="mb-4">Login Now</h2>
                            <form className="login-form" action="" onSubmit={handleSubmit} >
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                                    <input type="email" className="form-control" onChange={handleInput} name="email"  placeholder="email" />
                                    {errors.email.required ? (<span className="text-danger" >
                                        Email is required.
                                    </span>) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                    <input className="form-control" onChange={handleInput} type="password" name="password" placeholder="password"  />
                                    {errors.password.required ? (<span className="text-danger" >
                                        Password is required.
                                    </span>) : null}
                                </div>
                                <div className="form-group">
                                    {loading ? (
                                        <div className="text-center">
                                            <div className="spinner-border text-primary " role="status">
                                                <span className="sr-only"></span>
                                            </div>
                                        </div>
                                    ) : null}
                                    {errors.custom_error ? (
                                        <span className="text-danger" >
                                            <p>Custom Error Message!</p>
                                        </span>
                                    ) : null}
                                   <div className="text-center mt-3 py-2">
                                   <input type="submit" className="regbut " disabled ={loading} value="Login" />
                                   </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="forget">
                                    <Link to='/resetpassword' className='reset'>Forget Password</Link>
                                </div>
                                <div className="formgroup mt-3">
                                    Create new account ? Please <Link to='/register' className='login'> Register</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6"></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LoginPage
