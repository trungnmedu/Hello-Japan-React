import SocketService from "@/services/socket";
import rules from "@/validation/rule";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import * as Yup from 'yup';


const ChatSupport = () => {

    const [displayChat, setDisplayChat] = useState(false)
    const toggleDisplayChat = useCallback(() => {
        setDisplayChat(toggle => !toggle)
    }, [])

    useEffect(() => {

        const connectChatService = async () => {
            try {
                const socket = await SocketService.connect()
                socket.on(
                    "chat", (data) => {
                        console.log(data)
                    }
                )
            } catch (error) {
                console.log(error.message);
            }

        }

        connectChatService()

        return () => SocketService.disconnect()
    }, [])

    const formik = useFormik(
        {
            validateOnBlur: true,
            validateOnChange: true,
            validateOnMount: true,
            validationSchema: Yup.object().shape(
                { message: Yup.string(rules.notEmpty, "Invalid").required("Tin nhắn là bắt buộc.") }
            ),
            initialValues: {
                message: ""
            },
            onSubmit: async ({ message }) => {
                SocketService.sendMessage(message.trim())
            }
        }
    )

    const { values, touched, isValid, isSubmitting, handleBlur, handleChange, handleSubmit } = formik
    const { message } = values
    const isDisable = (!isValid && touched.message) || isSubmitting

    return (
        <div className="fixed z-40 bottom-5 right-10">
            {
                displayChat ? (
                    <div
                        style={{ height: '80vh' }}
                        className="max-w-sm bg-white rounded flex flex-col shadow"
                    >
                        <div className="border-b p-2 text-slate-700 border-gray-200 flex justify-between">
                            <h2 className="text-lg">Chatting with Hello Japan</h2>
                            <button
                                className="h-6 aspect-square hover:p-1 hover:bg-red-600 hover:text-white rounded-full transition-all"
                                onClick={toggleDisplayChat}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="grow flex flex-col justify-end overflow-auto space-y-2">
                            <ul className="p-5 space-y-4">

                                <li className="flex space-x-2 h-fit">
                                    <div className="w-20 h-20">
                                        <div className="relative w-full aspect-square">
                                            <img className="block w-full h-full rounded-full" src="https://picsum.photos/200" alt="chat-user" />
                                            <span className="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                                        </div>
                                    </div>

                                    <div className="grow overflow-hidden">
                                        <p className="rounded bg-red-500 text-white p-2 px-6">Hey there. We would like to invite you over to our office for a visit. How about it?</p>
                                        <small className="text-white">15 April</small>
                                    </div>
                                </li>

                                <li className="flex flex-col items-end">
                                    <p className="w-fit max-w-full bg-blue-600 rounded-full p-2 px-6 text-white">It's like a dream come true</p>
                                </li>

                            </ul>

                            <form
                                onSubmit={handleSubmit}
                                className="h-12 flex items-center px-5 border-t"
                            >
                                <button
                                    type="button"
                                    className="h-8 w-8 p-1.5 flex-none rounded-full text-slate-500 hover:bg-slate-100 hover:text-blue-500 transition-all duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                                    </svg>
                                </button>

                                <input
                                    name="message"
                                    placeholder="Aa"
                                    value={message}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className="grow px-2 outline-none resize-none"
                                    rows={1}
                                />
                                <button
                                    type="button"
                                    className="h-8 w-8 p-1.5 flex-none rounded-full text-slate-500 hover:bg-slate-100 hover:text-blue-500 transition-all duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </button>
                                <button
                                    type="submit"
                                    disabled={isDisable}
                                    className="h-8 w-8 p-1.5 flex-none rounded-full text-slate-500 hover:bg-slate-100 hover:text-blue-500 transition-all duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.813 5.146 9.027 3.99c4.05 1.79 4.05 4.718 0 6.508l-9.027 3.99c-6.074 2.686-8.553.485-5.515-4.876l.917-1.613c.232-.41.232-1.09 0-1.5l-.917-1.623C1.26 4.66 3.749 2.46 9.813 5.146ZM6.094 12.389h7.341"></path>
                                    </svg>
                                </button>

                            </form >
                        </div>
                    </div>
                ) : (
                    <div className="w-fit flex flex-col space-y-2">
                        <button
                            className="bg-catalina-blue text-white w-12 aspect-square rounded-full p-2 animate-bounce"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <button
                            onClick={toggleDisplayChat}
                            className="relative z-10 w-fit h-fit"
                        >
                            <div className="absolute top-0 left-0 z-auto h-full w-full bg-red-600 aspect-square rounded-full animate-ping">

                            </div>
                            <div className="bg-red-600 w-12 aspect-square rounded-full p-2" >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="currentColor" alt="Chat" className="w-full h-full text-white">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M400 26.2c-193.3 0-350 156.7-350 350 0 136.2 77.9 254.3 191.5 312.1 15.4 8.1 31.4 15.1 48.1 20.8l-16.5 63.5c-2 7.8 5.4 14.7 13 12.1l229.8-77.6c14.6-5.3 28.8-11.6 42.4-18.7C672 630.6 750 512.5 750 376.2c0-193.3-156.7-350-350-350zm211.1 510.7c-10.8 26.5-41.9 77.2-121.5 77.2-79.9 0-110.9-51-121.6-77.4-2.8-6.8 5-13.4 13.8-11.8 76.2 13.7 147.7 13 215.3.3 8.9-1.8 16.8 4.8 14 11.7z"></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default ChatSupport