import React, { FormEvent, useRef, useState } from 'react'
import axios from '../../../lib/axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function useUpload(orderID: number) {
    const [error, setError] = useState<string>('')
    const [file, setFile] = useState<File | undefined>()
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('orderID', orderID.toString())
            formData.append('image', file!)

            const response = await axios.post('/user/slip', formData)

            if (response.status === 201) {
                await Swal.fire(response.data.message, '', 'success')
                navigate('/order')
            }
        } catch (err : any) {
            console.error(err.response.data.message)
            setError(err.response.data.message)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFile(file)
    };

    return {
        error,
        file,
        handleFileChange,
        handleSubmit
    }
}
