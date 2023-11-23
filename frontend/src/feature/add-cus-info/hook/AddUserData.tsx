import React, { useRef,useState } from 'react'
import axios from '../../../lib/axios'
import Swal from 'sweetalert2';

export default function AddAddress() {
    const name = useRef<HTMLInputElement>(null)
    const surname = useRef<HTMLInputElement>(null)
    const phone = useRef<HTMLInputElement>(null)
    const houseNumber = useRef<HTMLInputElement>(null)
    const village = useRef<HTMLInputElement>(null)
    const alley = useRef<HTMLInputElement>(null)
    const street = useRef<HTMLInputElement>(null)
    const subDistric = useRef<HTMLInputElement>(null)
    const subArea = useRef<HTMLInputElement>(null)
    const province = useRef<HTMLInputElement>(null)
    const postalCode = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string>('')

    const handleSubmit = (): void => {
        const data = {
            name,
            surname,
            phone,
            houseNumber,
            village,
            alley,
            street,
            subDistric,
            subArea,
            province,
            postalCode
        }
        
        axios.put('/user/address', data)
            .then(response => {
                if (response.status === 201) {
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
        surname,
        phone,
        houseNumber,
        village,
        alley,
        street,
        subDistric,
        subArea,
        province,
        postalCode,
        error,
        handleSubmit
    }
}