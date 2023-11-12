import React, { FormEvent, useRef,useState } from 'react'
import axios from '../../../lib/axios'
import Swal from 'sweetalert2';

export default function useAddProduct() {
    const name = useRef<HTMLInputElement>(null)
    const price = useRef<HTMLInputElement>(null)
    const [error,setError] = useState<string>('')
    const [file,setFile] = useState<File | undefined>()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) : void=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('name' , name.current?.value!)
        formData.append('price' , price.current?.value!)
        formData.append('image' , file!)

        axios.put('/admin/add-product',formData)
        .then(response=>{
            if(response.status === 201) {
                Swal.fire(response.data.message, '', 'success')
            }
        })
        .catch(err=>{
            console.log(err)
            setError(err.data.message)
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
