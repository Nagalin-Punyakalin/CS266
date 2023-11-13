import React, { useEffect, useState } from 'react'
import axios from '../lib/axios'

interface useFetchProps {
    url : string
}

export default function useFetch<T>({url } : useFetchProps) {
    const [isLoading,setIsloading] = useState<boolean>(true)
    const [data,setData] = useState([])
    const [error,setError] = useState<string>('')

    useEffect(()=>{
        axios.get(url)
        .then(response=>{
            setData(response.data)
        })
        .catch(err=>{
            setError(err.data.message)
        })
        .finally(()=>{
            setIsloading(false)
        })
    })

    if(isLoading) return null
   
    return data
}
