import Conversation from "./Conversation"
import SidebarPanel from "./SidebarPanel"

const Chat = () => {
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

export default Chat