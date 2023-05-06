import { io } from "socket.io-client";


const socket = io(
    "ws://localhost:5000",
    {
        path: "/chat",
        autoConnect: false,
        reconnectionDelayMax: 10000,
        auth: {
            token: localStorage.getItem('accessToken') || false
        }
    }
)

class SocketService {
    static connect() {
        return new Promise(
            (resolve, reject) => {
                socket.connect()
                socket.on(
                    "connect",
                    () => resolve(socket)
                )
                socket.on(
                    "connect_error",
                    error => reject(error)
                )
            }
        )
    }


    static disconnect() {
        if (socket.connected) {
            socket.disconnect()
        }
    }
}

export default SocketService

