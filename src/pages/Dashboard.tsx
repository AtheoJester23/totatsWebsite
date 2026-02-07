import { Calendar, MoveLeft, Plus, Store } from "lucide-react";
import Schedules from "../components/dashboard/Schedules";
import { useState } from "react";
import CreateSchedForm from "../components/CreateSchedForm";
import Products from "../components/Products";
import AddProducts from "../components/AddProducts";
import PageNotFound from "./PageNotFound";

const Dashboard = () => {
    const [selected, setSelected] = useState("schedules")

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
                        <li onClick={() => setSelected("shop")} className="min-md:relative text-white p-5 min-md:border border-white min-md:m-5 rounded hover:bg-white hover:text-[rgb(23,23,23)] cursor-pointer duration-300">
                            <Store className="min-md:absolute"/>
                            <p className="text-center">Shop</p>
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
                    ): selected == "shop" ?(
                        <div className="p-5">
                            <Products setSelected={setSelected}/>
                        </div>
                    ): selected == "addProduct" ? (
                        <div className="p-5 flex flex-col gap-5 overflow-y-hidden h-[620px]">
                            <div className="px-5  m-0">
                                <button onClick={() => setSelected("shop")} className="text-white hover:bg-white hover:text-[rgb(23,23,23)] cursor-pointer duration-300 p-2 rounded">
                                    <MoveLeft/>
                                </button>
                            </div>
                            <AddProducts setSelected={setSelected}/>
                        </div>
                    ):(
                        <PageNotFound/>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;