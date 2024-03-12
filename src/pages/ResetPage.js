import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { dataBase } from '../services/fireBaseConfig'
import { useNavigate } from 'react-router-dom'

const ResetPage = () => {
    const state ={
        email:{required:false}
    }
    const [errors,setErrors]=useState(state)
    const [inputs,setInputs]=useState({
        email:''
    })

    const handleInput = e =>{
        setInputs({...inputs,[e.target.name]:e.target.value})
    }
   
    const navigate = useNavigate()
    const reset = async (e) => {
        let errors=state
        if(inputs.email===""){
            errors.email.required=true
        }
        e.preventDefault();
        const emailValue = e.target.email.value
        sendPasswordResetEmail(dataBase, emailValue).then(data => {
            alert("check your gmail")
            navigate('/login')
        }).catch(err => {
            console.log(err.code)
        })
        setErrors({...errors})

    }
    const back = ()=>{
        navigate('/login')
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-9 py-5 mt-3 mx-auto">
                        <h2>Reset Password</h2>
                        <form className='reset-sec py-4 px-4' onSubmit={e => reset(e)}>
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' onChange={handleInput} placeholder='enter your email id...' className="form-control" />
                            {
                                        errors.email.required ? (
                                            <span className="text-black   " >
                                                Email is required.
                                            </span>
                                        ) : null
                                    }
                            <div className="resetBtn text-center mt-4">
                                <button type='submit' className='px-3 py-1'>Reset</button>
                                <button className='px-3 py-1 ms-3' onClick={back}>Back</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ResetPage
