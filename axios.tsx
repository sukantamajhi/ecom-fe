'use client'

import Axios, { AxiosInstance } from "axios"

const baseURL = "http://localhost:4000/api"
// const baseURL = "https://ecom-be-oeik.onrender.com/api"

let axios: AxiosInstance

if (typeof window !== "undefined") {
    axios = Axios.create({
        baseURL,
        headers: { "Authorization": localStorage.getItem("token") }
    })
} else {
    axios = Axios.create({
        baseURL,
    })
}
export default axios
