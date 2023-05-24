import { getAllConversations } from "@services/admin";
import SocketService from "@services/socket.js";
import { memo, useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center h-14 space-x-2 px-2.5">
                <div className="h-8 p-2 bg-blue-200 rounded-full text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                </div>
                <h2 className="font-medium text-lg">Tin Nhắn</h2>
            </div>

            <div className="px-2.5">
                <form className="border rounded flex space-x-2 bg-zinc-100">
                    <button
                        type="submit"
                        className="h-8 w-8 block p-1.5 flex-none text-slate-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                d="M3.316 13.781l.73-.171-.73.171zm0-5.457l.73.171-.73-.171zm15.473 0l.73-.171-.73.171zm0 5.457l.73.171-.73-.171zm-5.008 5.008l-.171-.73.171.73zm-5.457 0l-.171.73.171-.73zm0-15.473l-.171-.73.171.73zm5.457 0l.171-.73-.171.73zM20.47 21.53a.75.75 0 101.06-1.06l-1.06 1.06zM4.046 13.61a11.198 11.198 0 010-5.115l-1.46-.342a12.698 12.698 0 000 5.8l1.46-.343zm14.013-5.115a11.196 11.196 0 010 5.115l1.46.342a12.698 12.698 0 000-5.8l-1.46.343zm-4.45 9.564a11.196 11.196 0 01-5.114 0l-.342 1.46c1.907.448 3.892.448 5.8 0l-.343-1.46zM8.496 4.046a11.198 11.198 0 015.115 0l.342-1.46a12.698 12.698 0 00-5.8 0l.343 1.46zm0 14.013a5.97 5.97 0 01-4.45-4.45l-1.46.343a7.47 7.47 0 005.568 5.568l.342-1.46zm5.457 1.46a7.47 7.47 0 005.568-5.567l-1.46-.342a5.97 5.97 0 01-4.45 4.45l.342 1.46zM13.61 4.046a5.97 5.97 0 014.45 4.45l1.46-.343a7.47 7.47 0 00-5.568-5.567l-.342 1.46zm-5.457-1.46a7.47 7.47 0 00-5.567 5.567l1.46.342a5.97 5.97 0 014.45-4.45l-.343-1.46zm8.652 15.28l3.665 3.664 1.06-1.06-3.665-3.665-1.06 1.06z"></path>
                        </svg>
                    </button>
                    <input
                        className="grow bg-transparent"
                        name="search"
                        placeholder="Tìm kiếm"
                    />
                </form>
            </div>

        </div>
    )
}

const ContactRepresent = ({ conversation }) => {
    const { name, avatar, clientId } = conversation
    const [messages, setMessages] = useState(conversation.messages)
    const location = useLocation()

    const unread = messages?.filter(message => message?.status === "UNREAD")?.length || 0
    const { body: lastMessage } = messages?.slice(-1).at(0) || {}

    const addMessage = useCallback((data) => {
        const { clientId: conversationId, message } = data

        if (conversationId !== clientId) {
            return
        }

        setMessages(messages => [...messages, message])
    }, [])

    useEffect(() => {
        SocketService.registerEvent("chat", addMessage)
    }, [])

    const active = location.pathname.split("/").at(-1) === clientId

    return (
        <Link
            className={`block transition-all rounded-lg duration-200 cursor-pointer p-2 ${active ? 'bg-zinc-200' : 'hover:bg-zinc-200'}`}
            to={`/admin/chat/${clientId}`}
        >
            <div className="h-12 flex space-x-4">
                <div className="flex-none h-full aspect-square relative">
                    <img
                        src={avatar || "https://picsum.photos/200"}
                        alt="avatar"
                        className="h-full w-full rounded-full"
                    />
                </div>
                <div className="grow overflow-hidden">
                    <div className="flex overflow-hidden space-x-2">
                        <p className="grow truncate font-medium">{name || clientId}</p>
                        <span className="text-sm text-slate-400">Tue</span>
                    </div>
                    <div className="flex overflow-hidden space-x-2">
                        <p className="grow text-sm text-slate-400 truncate">{lastMessage}</p>
                        {
                            unread ? (
                                <span
                                    className="flex-none flex items-center justify-center text-xs h-5 w-5 bg-blue-700 text-white rounded-full">{unread}</span>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </Link>
    )
}


const Contacts = () => {
    const [loading, setLoading] = useState(true)
    const [conversations, setConversations] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                try {
                    const { success, payload } = await getAllConversations()
                    if (success) {
                        setConversations(payload)
                    }
                } finally {
                    setLoading(false)
                }
            }
        )()

    }, [])

    useEffect(() => {
        if (conversations.length === 0) {
            navigate("/admin/chat")
            return
        }
        const { clientId } = conversations.at(0)
        navigate(`/admin/chat/${clientId}`)
    }, [conversations])

    return (
        <div className="h-fit">
            {
                loading ? (
                    <div className="flex justify-center items-center">
                        <div className="my-5 h-8 w-8 loading"></div>
                    </div>
                ) : null
            }
            {
                conversations.length > 0 ? (
                    conversations.map(
                        conversation => <ContactRepresent key={conversation.clientId} conversation={conversation} />
                    )
                ) : null
            }
        </div>
    )
}


const SidebarPanel = () => {
    return (
        <div className="flex flex-col space-y-2.5 h-full overflow-hidden">
            <Header />
            <div className="grow overflow-auto scrollbar-2">
                <Contacts />
            </div>
        </div>
    )
}

export default memo(SidebarPanel)