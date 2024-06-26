import React, {useEffect, useState} from 'react'
import * as apiClient from "../../api/api.js"
import { useQuery } from 'react-query'
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(()=>{
    const id = setTimeout(async () => {
            console.log("Setting time out")
            const data = await apiClient.getPlaces(value);
            console.log(data)
            setDebouncedValue(data)
    }, 1000)

    return () => {
        clearTimeout(id)
    }
  }, [value, delay])

  return debouncedValue
}