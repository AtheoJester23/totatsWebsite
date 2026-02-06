import { Bot, BotMessageSquare, Paperclip, SendHorizonal, X } from "lucide-react"
import { useEffect, useRef, useState, type FormEvent } from "react"
import { AnimatePresence, motion } from 'framer-motion'

type message = {
    role: string,
    message: string,
    id?: string
}[]

const Chatbot = () => {
    const [open, setOpen] = useState(false)

    const [messages, setMessages] = useState<message>(
        [
            {role: "bot", message: "Magandang araw saiyo! Welcome sa TOTATS TATTOO SHOP official website! How can I help you today?"},
        ]
    )
    const chatRef = useRef<HTMLDivElement>(null)
    const spacerRef = useRef(null)
    const messagesRef = useRef(null)

    useEffect(() => {
        if (!chatRef.current) return;

        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [open, messages]);

    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const message = formData.get("message") as string;

        if(!message || message.replace(/[ ]/g, "") == "") return;

        let current = [...messages, {role: "user", message}]
        setMessages(current)
        
        handleChatbot(message);

        e.currentTarget.reset();
    }

    const handleChatbot = async (userInput: string) => {
        const id = Math.random().toString(36).substring(2, 9);

        setMessages(prev => [
            ...prev,
            { role: "bot", message: "Thinking...", id}
        ]);

        try {
            const res = await fetch(import.meta.env.VITE_AI_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
                },
                body: JSON.stringify({
                    question: userInput
                })
            })


            if(!res.ok){
                throw new Error(`${res.status}`)
            }

            const data = await res.json();

            console.log(data);

            setMessages(prev => prev.map(m => m.id === id ? {...m, message: data.reply || ""} : m))

        } catch (error) {
            console.error((error as Error).message)
        }
    }

  return (
    <div className="max-sm:bottom-5 max-sm:right-5 fixed bottom-10 z-2000 right-10">
        <AnimatePresence mode="wait">
            {!open ? (
                <button onClick={() => setOpen(true)} className="bg-green-900 p-5 rounded-full cursor-pointer">
                    <BotMessageSquare className="text-white"/>
                </button>
            ):(
                <motion.div 
                    key="open"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                    className="smallChatBox flex bg-white h-[600px] w-[500px] rounded-xl flex-col"
                    onAnimationComplete={() => {
                        chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
                    }}
                >
                    {/* header */}
                    <div className="shrink-0 px-4 py-3 font-medium bg-green-900 flex justify-between items-center w-full rounded-t-lg">
                        <div className="flex gap-2 items-center">
                            <div className="text-white bg-[rgb(43,43,43)] p-2 rounded-full flex justify-center items-center">
                                <Bot/>
                            </div>
                            <h1 className="text-white font-bold text-lg">Chat with Tobot</h1>
                        </div>
                        <X onClick={() => setOpen(false)} className="text-white cursor-pointer"/>
                    </div>

                    {/* scroll area */}
                    <div
                        ref={chatRef}
                        data-lenis-prevent
                        className="flex-1 overflow-y-auto px-4 py-5 scrollbar-invisible"
                    >
                        <div
                            ref={spacerRef}
                            className="transition-[height] duration-200"
                        >
                            <div ref={messagesRef} className="space-y-3 flex flex-col">
                                {messages.map((m, i) => (
                                    <div key={i} className={` flex items-end gap-3
                                        ${m.role == "user" ? "justify-end" : "justify-start"}
                                    `}>
                                        {m.role != "user" &&
                                            <button onClick={() => setOpen(true)} className="bg-green-900 p-2 rounded-full cursor-pointer">
                                                <BotMessageSquare className="text-white"/>
                                            </button>
                                        }
                                        <div
                                            key={i}
                                            className={`${m.role == "user"? "bg-green-400" : "bg-zinc-100"} max-sm:max-w-[80%] max-w-[50%] rounded-xl px-5 py-4 text-sm`}
                                        >
                                            {m.message}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>                    
                    
                    <form onSubmit={(e) => handleSendMessage(e)} className="shrink-0 border-t border-gray-300 px-4 py-3 flex items-center gap-4">
                        <Paperclip onClick={() => console.log(messages)}/>
                        <input type="text" name="message" placeholder="Write your message" className="border border-gray-500 px-5 py-3 rounded w-full"/>
                        <button className="cursor-pointer hover:translate-y-0.25 duration-300">
                            <SendHorizonal/>
                        </button>
                    </form> 
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  )
}

export default Chatbot
