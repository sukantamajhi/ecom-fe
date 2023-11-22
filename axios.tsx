'use client'

import Axios, { AxiosInstance } from "axios"

let axios: AxiosInstance

if (typeof window !== "undefined") {
    axios = Axios.create({
        baseURL: "http://localhost:4000/api",
        headers: { "Authorization": localStorage.getItem("token") }
    })
} else {
    axios = Axios.create({
        baseURL: "http://localhost:4000/api",
    })
}
export default axios
