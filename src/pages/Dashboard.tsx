import { Calendar, Plus, Store } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    const [_, setSelected] = useState("schedules")

    return (  
        <div className="h-[100vh] pt-14 flex w-full">
            <div className="relative border-t border-[rgb(18,18,18)] flex w-full ">
                <div className="phoneOption w-[23.5%] bg-[rgb(23,23,23)]">
                    <ul className="phoneOptionBtns">
                        <NavLink to={"/dashboard"} onClick={() => setSelected("schedules")} className="phoneOptionLinks">
                            <Calendar className="flex-none"/>
                            <p className="text-center flex-1">Schedules</p>
                        </NavLink>
                        <NavLink to={"/dashboard/createSchedule"} onClick={() => setSelected("createSched")} className="phoneOptionLinks">
                                <Plus className="flex-none"/>
                                <p className="flex-1 text-center">Create Schedule</p>
                        </NavLink>
                        <NavLink to={"/dashboard/shop"} onClick={() => setSelected("shop")} className="phoneOptionLinks">
                            <Store className="flex-none"/>
                            <p className="text-center flex-1">Shop</p>
                        </NavLink>
                    </ul>
                </div>
                
                <div className="w-full">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;