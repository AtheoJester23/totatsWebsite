import { Calendar, Plus, Store } from "lucide-react";
import Schedules from "../components/dashboard/Schedules";
import { useState } from "react";
import CreateSchedForm from "../components/CreateSchedForm";
import { supabase } from "../supabaseClient";
import { GoogleGenAI } from '@google/genai'
import { getBase64Image } from "../utils/ai";


const Dashboard = () => {
    const [selected, setSelected] = useState("schedules")
    const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_API_KEY,
        apiVersion: "v1beta"
    })

    
    const handleSimpleChatbot = async () => {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: "write a short funny joke"
            });

            console.log(response.text);
        } catch (error) {
            console.log((error as Error).message)
        }
    };

    const handleSimpleImageUnderstanding = async () => {
        const base64Image = await getBase64Image("/card3.png")

        try {
            const contents = [
                {
                    inlineData: {
                        mimeType: "image/png",
                        data: base64Image
                    },   
                },
                {text: "Classify this tatttoo as: minimalist, tribal, portrait, full sleeve, back piece, realism... don't explain why just answer with the correct category."}
            ];

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents
            });

            console.log(response.text);
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    return (  
        <div className="h-[100vh] pt-30 flex w-full">
            <div className="relative border-t border-[rgb(18,18,18)] flex w-full ">
                <div className="phoneOption w-[23.5%] bg-[rgb(23,23,23)]">
                    <ul className="phoneOptionBtns">
                        <li onClick={() => setSelected("schedules")} className="min-md:relative text-white p-5 min-md:border border-white min-md:m-5 rounded hover:bg-white hover:text-[rgb(23,23,23)] cursor-pointer duration-300">
                            <Calendar className="min-md:absolute"/>
                            <p className="text-center">Schedules</p>
                        </li>
                        <li onClick={() => setSelected("createSched")} className="min-md:relative text-white p-5 min-md:border border-white min-md:m-5 rounded hover:bg-white hover:text-[rgb(23,23,23)] cursor-pointer duration-300">
                            <div className="max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
                                <Plus className="min-md:absolute"/>
                                <p className="text-center">Create Schedule</p>
                            </div>
                        </li>
                        <li className="min-md:relative text-white p-5 min-md:border border-white min-md:m-5 rounded hover:bg-white hover:text-[rgb(23,23,23)] cursor-pointer duration-300">
                            <Store className="min-md:absolute"/>
                            <p className="text-center">Shop</p>
                        </li>
                        <li onClick={() => handleSimpleImageUnderstanding()} className="bg-blue-500 min-md:relative text-white p-5 min-md:border border-white min-md:m-5 rounded hover:bg-white hover:text-[rgb(23,23,23)] cursor-pointer duration-300">
                            <p className="text-center">Test</p>
                        </li>
                    </ul>
                </div>
                
                <div className="w-full">
                    {selected == "schedules" ? (
                            <Schedules/>
                    ): selected == "createSched" ? (
                        <div className="p-5">
                            <CreateSchedForm/>
                        </div>
                    ):(
                        <p>etc...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;