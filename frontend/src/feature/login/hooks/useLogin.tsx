import React, { FormEvent, useRef,useState } from 'react'

export default function useLogin() {
    const username = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const [error,setError] = useState<string>('')

    const handleLogin = (e: FormEvent<HTMLFormElement>) : void=>{
        e.preventDefault()

        //.catch(err=>{
            //console.log(err.response.data.message)
            //setError(err.response.data.message)
        //})
    }

    
    return {
        username,
        password,
        error,
        handleLogin,
    }
}
