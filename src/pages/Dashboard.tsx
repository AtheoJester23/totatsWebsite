import { Calendar, Plus, Store } from "lucide-react";
import Schedules from "../components/dashboard/Schedules";
import { useState } from "react";
import CreateSchedForm from "../components/CreateSchedForm";
import { supabase } from "../supabaseClient";

const Dashboard = () => {
    const [selected, setSelected] = useState("schedules")

    const handleTesting = async () => {
        try {
            const {
            data: { session },
            error
            } = await supabase.auth.getSession();

            if (error || !session) {
            throw new Error("No session found");
            }

            const jwt = session.access_token;

            const res = await fetch(
            import.meta.env.VITE_TEST_SUPABASE_EDGE_FUNCTION,
            {
                method: "GET",
                headers: {
                Authorization: `Bearer ${jwt}`,
                apikey: import.meta.env.VITE_SUPABASE_ANON_KEY // or NEXT_PUBLIC_*
                }
            }
            );

            const data = await res.json();
            console.log("testing");
            console.log(data);
        } catch (error) {
            console.error((error as Error).message);
        }
        };



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
                        <li onClick={() => handleTesting()} className="bg-blue-500 min-md:relative text-white p-5 min-md:border border-white min-md:m-5 rounded hover:bg-white hover:text-[rgb(23,23,23)] cursor-pointer duration-300">
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