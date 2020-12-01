import axios from 'axios'

const request = axios.create({
    baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    timeout: 6000,
})

request.interceptors.request.use((config) => {

    let token = localStorage.getItem('token')

    config.headers.Authorization = token

    return config

}, (err) => {
    return Promise.reject(err)
})

request.interceptors.response.use((response) => {

    return response

}, (err) => {
    return Promise.reject(err)
})

export default request