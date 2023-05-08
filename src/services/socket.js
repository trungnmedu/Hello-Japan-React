import {getToken} from "@utils/jwt";
import {io} from "socket.io-client";


class SocketService {
    static socket
    static isConnecting

    static async getSocket() {
        if (SocketService.socket && (SocketService.socket.connected || SocketService.isConnecting)) {
            return SocketService.socket
        }

        SocketService.socket = io(
            "ws://localhost:5000",
            {
                path: "/chat",
                autoConnect: false,
                transports: ["websocket"],
                reconnectionDelayMax: 1000,
                auth: {
                    token: getToken()
                }
            }
        )

        return new Promise(
            (resolve, reject) => {
                SocketService.isConnecting = true
                SocketService.socket.connect()
                SocketService.socket.on(
                    "connect",
                    () => {
                        SocketService.isConnecting = false
                        resolve(SocketService.socket)
                    }
                )
                SocketService.socket.on(
                    "connect_error",
                    error => {
                        SocketService.isConnecting = false
                        reject(error)
                    }
                )
            }
        )
    }

    static disconnect() {
        if(SocketService.socket && SocketService.socket.connected){
            SocketService.socket.disconnect()
            SocketService.socket = null
        }
    }

    static registerEvent (event, callback) {
        if(SocketService.socket.connected){
            SocketService.socket.on(event, callback)
        }
    }

    static async sendMessage(message) {
        if (SocketService.socket && SocketService.socket.connected) {
            SocketService.socket.emit('chat', message)
        }
    }
}

export default SocketService

