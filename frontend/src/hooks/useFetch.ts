import React, { useEffect, useState } from 'react'
import axios from '../lib/axios'

export default function useFetch<T>(url : string,initialValue : T) :[T | null,string] {
    const [isLoading,setIsloading] = useState<boolean>(true)
    const [data,setData] = useState(initialValue)
    const [error,setError] = useState<string>('')

    useEffect(()=>{
        axios.get(url)
        .then(response=>{
            setData(response.data)
        })
        .catch(err=>{
            setError(err.response.data.message)
        })
        .finally(()=>{
            setIsloading(false)
        })
    })

    if(isLoading) return [null,error]
   
    return [data,error]
}
