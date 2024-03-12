import React, { useState } from 'react'
import { Api } from '../services/Api'
import { StorageUser } from '../services/Storage'
import { isAuthenticated } from '../services/Auth'
import { Navigate,Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const RegisterPage = () => {

    const initialStateErrors = {
        email: { required: false },
        password: { required: false },
        name: { required: false },
        custom_error: null
    }

    //  To hide and display the errors in register page

    const [errors, setErrors] = useState(initialStateErrors)

    // Tp hide and display the Spinner-loader

    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        let errors = initialStateErrors
        let haserror = false
        if (inputs.name === "") {
            errors.name.required = true
            haserror = true
        }
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
            Api(inputs).then((response) => {
                // console.log(response);
                StorageUser(response.data.idToken)

            }).catch((err) => {
                // console.log(err)
                if(err.response.data.error.message==="EMAIL_EXISTS"){
                    setErrors({...errors,custom_error:"Already This email has been registered"})
                }
                else if(String(err.response.data.error.message).includes('WEAK_PASSWORD')){
                    setErrors({...errors,custom_error:"Password should be atleast 6 characters"})
                }
            }).finally(() => {
                setLoading(false)
            })
        }
        setErrors({...errors})
    }

    // Get the input value from the input

    const [inputs, setInput] = useState({
        email: "",
        password: "",
        name: ""
    })
    console.log(inputs);

    const handleInput = (e) => {
        setInput({ ...inputs, [e.target.name]: e.target.value })
    }
    if (isAuthenticated()) {
        return <Navigate to="/dashboard"/>
    }

    return (
        <div>
             <Navbar/>
            <section className="register-block px-4 d-flex align-items-center min-vh-100 ">
                <div className="container registerpage">
                    <div className="row  ">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-4 col-md-9 mx-auto px-3 py-4  register-sec">
                            <h2 className="mb-3">Register Now</h2>
                            <form onSubmit={handleSubmit} className="register-form" action="" >
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Name</label>
                                    <input type="text" onChange={handleInput} className="form-control" name="name"  />
                                    {
                                        errors.name.required ? (<span className="text-danger" >
                                            Name is required.
                                        </span>) : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                                    <input type="text" onChange={handleInput} className="form-control" name="email"  />
                                    {
                                        errors.email.required ? (
                                            <span className="text-danger" >
                                                Email is required.
                                            </span>
                                        ) : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                    <input className="form-control" onChange={handleInput} type="password" name="password"  />
                                    {errors.password.required ? (
                                        <span className="text-danger" >
                                            Password is required.
                                        </span>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    {
                                        errors.custom_error ? (
                                            <span className="text-danger" >
                                                <p>{errors.custom_error}</p>
                                            </span>
                                        ) : null
                                    }
                                    {loading ? (
                                        <div className="text-center">
                                            <div className="spinner-border text-primary " role="status">
                                                <span className="sr-only"></span>
                                            </div>
                                        </div>
                                    ) : null}
                                 <div className="text-center mt-3  ">
                                 <input type="submit" className="regbut " disabled={loading} value="Register" />
                                 </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="formgroup">
                                    Already have account ? Please  <Link to='/login'className='login'> Login</Link>
                                </div>
                            </form>
                        </div>

                    </div>


                </div>
            </section>
        </div>
    )
}

export default RegisterPage
