import React, { FormEvent, useRef,useState } from 'react'
import axios from '../../../lib/axios'
import Swal from 'sweetalert2';

export default function useAddUserData() {
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

    

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
    //ไปดู useRef ใน data ยังใช้ไม่ถูก
    //แก้เป็น obj แบบ key,value
        const data = {
            name : name.current?.value,
            surname : surname.current?.value,
            phone : phone.current?.value,
            houseNumber : houseNumber.current?.value,
            village : village.current?.value,
            alley : alley.current?.value,
            street : street.current?.value,
            subDistric : subDistric.current?.value,
            subArea : subArea.current?.value,
            province : province.current?.value,
            postalCode : postalCode.current?.value
        }
        
        axios.post('/user/address', data)
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