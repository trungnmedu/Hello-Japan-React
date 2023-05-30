import { setAccount } from "@contexts/account"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import AppRouter from "./router/Router"
import { getProfile } from "./services/authentication"

const App = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        (
            async () => {
                const accessToken = localStorage.getItem('accessToken')
                if (!accessToken) {
                    setLoading(false)
                    return
                }

                try {
                    const { success, payload } = await getProfile()

                    if (success) {
                        dispatch(setAccount(payload))
                        return
                    }

                    localStorage.removeItem("accessToken")
                } catch {
                    localStorage.removeItem("accessToken")
                    navigate("/login")
                } finally {
                    setLoading(false)
                }

            }
        )()

    }, [])


    return (
        <>
            {
                loading ? (
                    <div className="h-screen w-screen flex justify-center items-center">
                        <div className="h-10 w-10 loading">
                        </div>
                    </div>
                ) : <AppRouter />
            }
        </>
    )
}

export default App