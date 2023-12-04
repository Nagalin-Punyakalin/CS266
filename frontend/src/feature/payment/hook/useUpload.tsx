import React, { FormEvent, useRef,useState } from 'react'
import axios from '../../../lib/axios'
import Swal from 'sweetalert2';

export default function useUpload() {
    const [orderID,setOrderID] = useState<number>()
    const [error,setError] = useState<string>('')
    const [file,setFile] = useState<File | undefined>()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) : void=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('orderID' , orderID)
        formData.append('image' , file!)

        axios.put('/admin/product',formData)
        .then(response=>{
            if(response.status === 201) {
                Swal.fire(response.data.message, '', 'success')
            }
        })
        .catch(err=>{
            console.log(err.response.data.message)
            setError(err.response.data.message)
        })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFile(file)
      };

    return {
        name,
        price,
        error,
        file,
        handleFileChange,
        handleSubmit
    }
}
