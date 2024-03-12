// import React from 'react'
import axios from 'axios'
import { getUserData } from './Storage'


axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1"
const API_KEY = "AIzaSyC2-9vYPwAZAQJUrOWUyZG6vkndAqakymM"
const REGISTER_URL = `/accounts:signUp?key=${API_KEY}`
const LOGIN_URL = `/accounts:signInWithPassword?key=${API_KEY}`
const USER_DETAIL=`/accounts:lookup?key=${API_KEY}`

export const Api = (inputs) => {
    let data = {
        displayName: inputs.name,
        email: inputs.email,
        password: inputs.password
    }
    return axios.post(REGISTER_URL, data)
}
export const LOGIN_API = (inputs) => {
    let data = {
        email: inputs.email,
        password: inputs.password
    }
    return axios.post(LOGIN_URL, data)
}

export const userDetailApi = ()=>{
    let data={idToken:getUserData()}
    return axios.post(USER_DETAIL, data)

}

