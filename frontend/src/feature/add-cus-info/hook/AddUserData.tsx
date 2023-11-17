import React, { useRef,useState } from 'react'
import axios from '../../../lib/axios'
import Swal from 'sweetalert2';

export default function AddAddress() {
    const nameRef = useRef<HTMLInputElement>(null)
    const surnameRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const houseNumberRef = useRef<HTMLInputElement>(null)
    const villageRef = useRef<HTMLInputElement>(null)
    const alleyRef = useRef<HTMLInputElement>(null)
    const streetRef = useRef<HTMLInputElement>(null)
    const subDistricRef = useRef<HTMLInputElement>(null)
    const subAreaRef = useRef<HTMLInputElement>(null)
    const provinceRef = useRef<HTMLInputElement>(null)
    const postalCodeRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string>('')

    const storeSubmit = (): void => {
        const data = {
            nameRef,
            surnameRef,
            phoneRef,
            address: {
                houseNumber: houseNumberRef,
                village: villageRef,
                alley: alleyRef,
                street: streetRef,
                subDistric: subDistricRef,
                subArea: subAreaRef,
                province: provinceRef,
                postalCode: postalCodeRef
            },
            emailRef
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
        nameRef,
        surnameRef,
        phoneRef,
        houseNumberRef,
        villageRef,
        alleyRef,
        streetRef,
        subDistricRef,
        subAreaRef,
        provinceRef,
        postalCodeRef,
        emailRef,
        error,
        storeSubmit
    }
}