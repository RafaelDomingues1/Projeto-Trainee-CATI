import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
})

api.interceptors.request.use((config) => {

    const token = localStorage.getItem('token')

    const rotaPublica =
        config.url === '/auth/aluno' ||
        config.url === '/aluno' ||
        config.url === '/aluno/'

    if(rotaPublica) {

        delete config.headers.Authorization
        return config
    }

    if (token){
        config.headers.Authorization =
            `Bearer ${token}`
    }

    return config
})

export default api