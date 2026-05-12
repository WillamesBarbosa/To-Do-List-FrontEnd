import axios from 'axios';
import { getRefreshToken, getToken, removeTokens, saveTokens } from './auth';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

api.interceptors.request.use((config)=>{
    const token = getToken()
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    (response) => response,
    async(error) =>{
        const originalRequest = error.config

        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true


            try {
                const refreshToken = getRefreshToken()
                const response = await api.post('/refresh', {}, {
                    headers: {
                        x_token_refresh: `Refresh ${refreshToken}` 
                    }
                })

                saveTokens(response.data.token, response.data.refreshToken)

                return api.request(originalRequest)
            } catch {
                removeTokens()

                window.location.href = '/'
            }
        }

        return Promise.reject(error)
    }
)
export default api;