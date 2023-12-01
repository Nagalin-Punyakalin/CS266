import React, { FormEvent, useRef,useState } from 'react'
import axios from '../../../lib/axios'
import Swal from 'sweetalert2';

export default function useStatus() {
    const name = useRef<HTMLInputElement>(null)
    const total = useRef<HTMLInputElement>(null)
    const quantity = useRef<HTMLInputElement>(null)
    const status = useRef<HTMLInputElement>(null)
    const [error,setError] = useState<string>('')

    const handleStatus = (e: FormEvent<HTMLFormElement>) : void=>{
        e.preventDefault()
        const data = {
            name : name.current?.value,
            total : total.current?.value,
            quantity : quantity.current?.value,
            status : status.current?.value
        }

        axios.put('/user/order', data)
        .then(response => {
            if(response.status === 201) {
                Swal.fire(response.data.message, '', 'success')
            }
        })
        .catch(err => {
            console.log(err.response.data.message)
            setError(err.response.data.message)
        })
    }

    return {
        name,
        total,
        quantity,
        status,
        error,
        handleStatus
    }
}
