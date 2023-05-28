import axios from "axios"

const instance = axios.create(
    {
        baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
        headers: {
            'Content-Type': 'application/json'
        }
    }
)

instance.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            return {
                ...config,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        }
        return config
    }
)

export default instance