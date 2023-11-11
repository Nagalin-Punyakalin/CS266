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

        axios.put('/add-product',formData)
        .then(response=>{
            if(response.status === 201) {
                Swal.fire('Product added successfully', '', 'success')
            }
        })
        .catch(err=>{
            console.log(err)
            if(err.response.status === 409) setError('Your product is already exists in the store')
            if(err.response.status === 500) setError('Internal server error, please try again later')
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
