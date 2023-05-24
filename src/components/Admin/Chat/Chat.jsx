import SocketService from "@services/socket.js";
import { memo, useEffect } from "react";
import Conversation from "./Conversation";
import SidebarPanel from "./SidebarPanel";

const Chat = () => {
    useEffect(() => {
        (
            async () => {
                await SocketService.getSocket()
            }
        )()
        return () => {
            SocketService.removeAllEvent()
            SocketService.disconnect()
        }
    }, [])


    return (
        <div className="flex h-body">
            <div className="w-72 flex-none border-r">
                <SidebarPanel />
            </div>
            <div className="h-full grow">
                <Conversation />
            </div>
        </div>
    )
}

export default memo(Chat)