import { Bot, BotMessageSquare, Paperclip, SendHorizonal, X } from "lucide-react"
import { useState } from "react"
import { AnimatePresence, motion } from 'framer-motion'

const Chatbot = () => {
    const [open, setOpen] = useState(false)

  return (
    <div className="max-sm:bottom-5 max-sm:right-5 fixed bottom-10 z-20 right-10">
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
                    className="smallChatBox relative bg-white h-[600px] w-[500px] rounded-xl"
                >
                    <div className="bg-green-900 rounded-t-lg absolute top-0 left-0 right-0 h-20 flex items-center p-5 justify-between">
                        <div className="flex gap-2 items-center">
                            <div className="text-white bg-[rgb(43,43,43)] p-2 rounded-full flex justify-center items-center">
                                <Bot/>
                            </div>
                            <h1 className="text-white font-bold text-lg">Chat with Tobot</h1>
                        </div>
                        <X onClick={() => setOpen(false)} className="text-white cursor-pointer"/>
                    </div>
                    <div className="absolute top-20 left-0 right-0 bottom-20 p-10 bg-green-500 overflow-y-scroll">
                        <div className="h-[2000px]">
                            <h1>test</h1>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-20 flex gap-3 items-center p-5">
                        <Paperclip/>
                        <input type="text" placeholder="Write your message" className="border border-gray-500 px-5 py-3 rounded w-full"/>
                        <SendHorizonal/>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  )
}

export default Chatbot
