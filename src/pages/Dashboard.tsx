import { Calendar, Footprints, Layers2, Plus, Store, StoreIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store";
import { setActive, setOpen } from "../state/status/shopStats";
import { supabase } from "../supabaseClient";


const Dashboard = () => {
    const [_, setSelected] = useState("schedules")
    const isOpen = useSelector((state: RootState) => state.shop.isOpen);
    const walkIn = useSelector((state: RootState) => state.shop.isActive);
    const dispatch = useDispatch<AppDispatch>()
    const id = import.meta.env.VITE_ID_SHOP_STATUS;

    useEffect(() => {
        const handleFetchStatus = async () => {
            try {
                const {data, error} = await supabase.from("shop_status").select();

                if(error){
                    throw new Error(`${error.message}`)
                }

                console.log("This is the shop_status: ", data);
                
                dispatch(setOpen(data[0].is_open));
                dispatch(setActive(data[0].is_active));
            } catch (error) {
                console.error((error as Error).message)
            }
        }

        handleFetchStatus();
    }, [])

    const handleUpdateOpen = async () => {
        try {
            const { error } = await supabase.from("shop_status").update({is_open: !isOpen}).eq("id", id)

            if(error){
                throw new Error(`${error.message}`)
            }

            console.log("Updated successfully")
            dispatch(setOpen(!isOpen));
        } catch (error) {
            console.error((error as Error).message)
        }
    }

    const handleUpdateActive = async () => {
        try {
            const {error} = await supabase.from('shop_status').update({is_active: !walkIn}).eq("id", id);

            if(error){
                throw new Error(`${error.message}`)
            }

            console.log('Updated Successfully');
            dispatch(setActive(!walkIn));
        } catch (error) {
            console.error((error as Error).message)
        }
    }

    return (  
        <div className="h-[100vh] pt-14 flex w-full">
            <div className="relative border-t border-[rgb(18,18,18)] flex w-full ">
                <div className="phoneOption w-[23.5%] bg-[rgb(23,23,23)] flex flex-col gap-5">
                    <h1 className="text-2xl text-white font-bold px-5 pt-5 max-sm:hidden">Dashboard</h1>
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
                        <NavLink to={"/dashboard/shortcut"} onClick={() => setSelected("shop")} className="phoneOptionLinks min-md:hidden!">
                            <Layers2 className="flex-none"/>
                            <p className="text-center flex-1">Shortcut</p>
                        </NavLink>
                    </ul>

                    <div className="flex flex-col gap-3 max-sm:hidden">
                        <div className="text-gray-500 px-5 flex gap-2">
                            <Layers2/>
                            Shortcuts
                        </div>

                        <hr className="bg-[rgb(11,11,11)] mx-5 border-1"/>

                        <div className="flex px-5 flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <div className="text-gray-500 flex items-center gap-2">
                                    <StoreIcon size={15}/>
                                    <small>Shop is:</small>
                                </div>
                                <button onClick={() => handleUpdateOpen()} className={`select-none text-sm relative flex items-center justify-between p-3 ${isOpen ? "bg-green-500 text-white font-bold" : "bg-[rgb(11,11,11)]"} text-gray-500 w-[115px] h-[30px] rounded-full relative cursor-pointer active:cursor-default duration-300`}>
                                    <motion.div 
                                        initial={{ x: 5 }}
                                        animate={{ left: isOpen ? "calc(100% - 45px - 0.7rem)" : "0px" }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className={`absolute bottom-1 top-1 left-1 bg-white rounded-full w-[45px]`}
                                    />
                                    <span>Open</span>
                                    <hr className={`${isOpen ? "bg-white" : "bg-[rgb(23,23,23)] text-[rgb(23,23,23)]"} w-[1px] h-[20px]`}/>
                                    <span>Close</span>
                                </button>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="text-gray-500 flex items-center gap-2">
                                    <Footprints size={15}/>
                                    <small>Walk-in Client:</small>
                                </div>
                                <button onClick={() => handleUpdateActive()} className={`select-none text-sm relative flex items-center justify-between p-3 ${walkIn ? "bg-green-500 text-white font-bold" : "bg-[rgb(11,11,11)]"} text-gray-500 w-[95px] h-[30px] rounded-full relative cursor-pointer active:cursor-default duration-300`}>
                                    <motion.div 
                                        initial={{ x: 5 }}
                                        animate={{ left: walkIn ? "calc(100% - 45px - 0.7rem)" : "0px" }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className={`absolute bottom-1 top-1 left-1 bg-white rounded-full w-[45px]`}
                                    />
                                    <span>Yes</span>
                                    <span>No</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="w-full overflow-auto max-sm:pb-17">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;