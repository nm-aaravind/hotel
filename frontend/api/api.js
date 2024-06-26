import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const register = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/users/register`, JSON.stringify(formData), {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        if (response.status !== 200) {
            throw Error(response.data.message)
        }
        return response.data
    } catch (error) {
        console.log(error.response)
        throw Error(error.response.data.message)
    }
}

export const validateToken = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/validateToken`, {
            withCredentials: true
        }); //credentials to be added
        if (!response) {
            return false
        }
        return true;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const login = async (formData) => {
    try {
        console.log("Entered", API_BASE_URL)
        const response = await axios.post(`${API_BASE_URL}/api/users/login`, formData, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        if (response.status !== 200) {
            throw new Error(response.data.message)
        }
        return response.data;
    } catch (error) {
        throw error
    }

}

export const getHotelsByUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/hotels/my-hotels`, {
            withCredentials: true
        })
        if (!response.data) return null;
        return response.data;
    } catch (error) {
        console.log(error)
        // throw new Error(error.response.data.message)
    }
}

export const googleLogin = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/google/redirect`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
        if (response.status !== 200) {
            throw new Error(response.data.message)
        }
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export const logout = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/users/logout`, {}, {
            headers: {
                "Content-Type": "application/json"
            }, withCredentials: true
        })
        if (!response) {
            throw new Error("Can't sign out")
        }
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const addHotel = async (formData) => {
    try {
        console.log('sdfsfsfsdf')
        const response = await axios.post(`${API_BASE_URL}/api/hotels/add-hotel`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })
        if (!response) {
            throw new Error("Cannot list hotel")
        }
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getHotelById = async (hotelId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/hotels/hotel/${hotelId}`, {
            withCredentials: true
        })
        if (!response.data) throw new Error("Something went wrong")
        return response.data.data;
    } catch (error) {
        throw error
    }
}

export const getPlaces = async (search) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/hotels/cities/${search}`, {
            withCredentials: true
        })
        return response.data.data;
    } catch (error) {
        throw error
    }
}

export const getUserDetails = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/details`, {
            withCredentials: true
        })
        return response.data.data;
    } catch (error) {
        throw error
    }
}

export const searchHotels = async (search) => {
    try {
        const params = new URLSearchParams();
        params.append('destination', search.queryKey[1].destination)
        params.append('checkIn', search.queryKey[1].checkIn)
        params.append('checkOut', search.queryKey[1].checkOut)
        params.append('guests', search.queryKey[1].guestCount)
        params.append('page', search.queryKey[1].page)
        params.append('room', search.queryKey[1].roomCount)
        params.append('limit', search.queryKey[1].limit)
        search.queryKey[1].facilities?.forEach((facility) => {
            params.append('facility', facility)
        })
        const response = await axios.get(`${API_BASE_URL}/api/search`, {
            params: params,
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        throw error
    }
}

export const updateUser = async (data) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/api/users/update`,
            data,
            {
                withCredentials: true
            }
        )
        console.log(response, "Inside api response")
        return response.data.message
    } catch (error) {
        throw error
    }
}
export const deleteHotel = async (hotelId) => {
    try {
        const params = new URLSearchParams();
        params.append('hotelId', hotelId)
        const response = await axios.delete(`${API_BASE_URL}/api/hotels/delete`, {
            params: params,
            withCredentials: true
        })
        return response.data;
    } catch (error) {   
        throw error
    }
}
export const removeTraveller = async (travellerId) => {
    try {
        const params = new URLSearchParams();
        params.append('travellerId', travellerId)
        const response = await axios.delete(`${API_BASE_URL}/api/users/travellers/delete`, {
            params: params,
            withCredentials: true
        })
        return response.data;
    } catch (error) {   
        throw error
    }
}

export const updatePassword = async (data) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/api/users/update/password`,
            data,
            {
                withCredentials: true
            }
        )
        return response.data.message
    } catch (error) {
        throw error
    }
}

export const addTravellers = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/users/add-travellers`, data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const getTravellers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/travellers`, {
            withCredentials: true
        })
        return response.data.data
    } catch (error) {
        throw error
    }
}

export const loginUserWithGoogle = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/google`, {
            withCredentials: true
        })
    } catch (error) {
        
    }
}