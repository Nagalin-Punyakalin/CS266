import React, { useRef,useState } from 'react'
import axios from '../../../lib/axios'
import Swal from 'sweetalert2';

export default function AddAddress() {
    const nameRef = useRef<HTMLDivElement>(null)
    const surnameRef = useRef<HTMLDivElement>(null)
    const phoneRef = useRef<HTMLDivElement>(null)
    const addressRef = useRef<HTMLDivElement>(null)
    const emailRef = useRef<HTMLDivElement>(null)
    const [error,setError] = useState<string>('')

    const storeSubmit = () => {
        const data = {
            Name: document.getElementById("formName"),
            Surname: document.getElementById("formSurname"),
            Phone: document.getElementById("formPhoneNumber"),
            Address: document.getElementById("formAddress"),
            Email: document.getElementById("formEmail"),
        }
        axios.put('/user/add-cus-info', data)
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

    return {
        nameRef,
        surnameRef,
        phoneRef,
        addressRef,
        emailRef,
        error,
        storeSubmit
    }
}
