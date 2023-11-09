import React, { FormEvent, useRef,useState } from 'react'

export default function useAddProduct() {
    const name = useRef<HTMLInputElement>(null)
    const price = useRef<HTMLInputElement>(null)
    const [error,setError] = useState<string>('')
    const [file,setFile] = useState<File | undefined>()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) : void=>{
        
    }
  
    return {
        name,
        price,
        error,
        file,
        setFile,
        handleSubmit
    }
}
