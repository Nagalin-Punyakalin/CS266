import React, { FormEvent, useRef,useState } from 'react'
import axios from '../../../lib/axios'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function useLogin() {
    const {
        setRole
    } = useAuth()
    const navigate = useNavigate()
    const username = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const [error,setError] = useState<string>('')

    const handleLogin = (e: FormEvent<HTMLFormElement>) : void=>{
        e.preventDefault()
        axios.post('/login',{
            username : username.current?.value,
            password : password.current?.value
        })
        .then(response=>{
            localStorage.setItem('jwt',JSON.stringify(response.data.token))
           
            setRole(response.data?.role)
            navigate('/homepage')
        })
        .catch(err=>{
            console.log(err)
            setError(err.response.data.message)
        })
    }

    
    return {
        username,
        password,
        error,
        handleLogin,
    }
}
