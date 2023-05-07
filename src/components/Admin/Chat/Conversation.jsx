const Header = () => {
    return (
        <div className="h-14 px-5 flex items-center space-x-5">
            <img
                className="h-10 w-10 rounded-full flex-none"
                src="https://lineone.piniastudio.com/images/avatar/avatar-19.jpg"
            />
            <div className="grow h-10 flex flex-col">
                <h2 className="font-medium">Alfredo Elliott</h2>
                <p className="text-sm text-slate-400">Last seen recently</p>
            </div>
        </div>
    )
}


const Message = ({ me = false }) => {
    return (
        <div className={`flex${me ? ' flex-row-reverse' : ''}`}>
            <img
                className="h-10 w-10 rounded-full flex-none"
                src="https://lineone.piniastudio.com/images/avatar/avatar-11.jpg"
            />
            <div className={`space-y-2 ${me ? 'mr-3' : 'ml-3'}`}>
                <div className={`w-fit ${me ? 'ml-auto' : 'mr-auto'}`}>
                    <p className="p-3 bg-slate-50 text-slate-700 shadow rounded-lg">Lorem ipsum dolor sit amet, consectetur.</p>
                </div>
                <div className={`w-fit ${me ? 'ml-auto' : 'mr-auto'}`}>
                    <p className="p-3 bg-slate-50 text-slate-700 shadow rounded-lg">Hello My Dear.</p>
                    <p className={`mt-0.5 text-xs text-slate-400 ${me ? 'text-left' : 'text-right'}`}>8:20</p>
                </div>
            </div>
        </div>
    )
}

const Messages = () => {
    return (
        <ul className="list-none p-5">
            <li className="">
                <Message />
            </li>
            <li className="">
                <Message me={true} />
            </li>
            <li className="">
                <Message />
            </li>
            <li className="">
                <Message me={true} />
            </li>
        </ul>
    )
}


const SendMessage = () => {
    return (
        <form className="h-12 flex items-center px-5 border-t">
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
                className="grow px-2"
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
                type="button"
                className="h-8 w-8 p-1.5 flex-none rounded-full text-slate-500 hover:bg-slate-100 hover:text-blue-500 transition-all duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.813 5.146 9.027 3.99c4.05 1.79 4.05 4.718 0 6.508l-9.027 3.99c-6.074 2.686-8.553.485-5.515-4.876l.917-1.613c.232-.41.232-1.09 0-1.5l-.917-1.623C1.26 4.66 3.749 2.46 9.813 5.146ZM6.094 12.389h7.341"></path>
                </svg>
            </button>

        </form >
    )
}


const Conversation = () => {
    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="flex-none border-b">
                <Header />
            </div>

            <div className="grow overflow-y-auto scrollbar-2">
                <Messages />
            </div>

            <div className="flex-none">
                <SendMessage />
            </div>
        </div>
    )
}

export default Conversation