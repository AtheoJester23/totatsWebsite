import { Footprints, Layers2, Plus, StoreIcon, TriangleAlert, X } from "lucide-react"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../state/store"
import { setConfWIC, setOpen, setWIC } from "../state/status/shopStats"
import { useEffect, useState, type FormEvent } from "react"
import { supabase } from "../supabaseClient"
import { toast, ToastContainer } from "react-toastify"
import { Dialog, DialogPanel } from "@headlessui/react"

const Shortcuts = () => {
    const isOpen = useSelector((state: RootState) => state.shop.isOpen);
    const dispatch = useDispatch<AppDispatch>()
    const WIC = useSelector((state: RootState) => state.shop.WIC)
    const [delConf, setDelConf] = useState(false)
    const [targetDel, setTargetDel] = useState<string | null>(null);
    const [upWIC, setUpWIC] = useState(false);

    useEffect(() => {
        const handleGetWIC = async () => {
            try {
                const {data, error} = await supabase.from("walkinclients").select();
                
                if(error){
                    throw new Error(`${error.message}`)
                }

                dispatch(setWIC(data));
                console.log(data);
            } catch (error) {
                console.error((error as Error).message)
            }
        }

        handleGetWIC();
    }, [])

    const openConfDel = async (id: string) => {
        setDelConf(true)
        setTargetDel(id)
    }

    const handleDeleteWIC = async (id: string) => {
        try {
            const {error} = await supabase.from("walkinclients").delete().eq("id", id);

            if(error){
                throw new Error(`${error.message}`)
            }

            toast.success("Schedule deleted successfully!")
            const filtered = WIC.filter(item => item.id != id);
            
            dispatch(setWIC(filtered));
            setDelConf(false)
        } catch (error) {
            console.error((error as Error).message)
            toast.error("Failed to delete schedule")
        } 
    }

    const handleUpdateWIC = async (id: string, e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const category = formData.get("category");

        try {
            const upWICS = await supabase.from("walkinclients").update({category}).eq("id", id);

            if(upWICS.error){
                throw new Error(`${upWICS.error.message}`)
            }

            toast.success("Walk in schedule updated successfully!")

            const getWICS = await supabase.from("walkinclients").select();

            if(getWICS.error){
                throw new Error(`${getWICS.error.message}`)
            }

            dispatch(setWIC(getWICS.data))
        } catch (error) {
            console.error((error as Error).message)
            toast.error("Failed to update schedule")
        } finally{
            setUpWIC(false)
        }
    }

  return (
    <>
        <div className="flex flex-col gap-10 h-full p-10">
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                <div className="text-white flex gap-2 items-center">
                    <Layers2/>
                    <h1 className="text-xl font-bold">Shortcuts</h1>
                </div>
                
                <hr className="bg-gray-500"/>
                </div>

                <div className="">
                    <div className="flex px-5 flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <div className="text-gray-500 flex items-center gap-2">
                                <StoreIcon size={15}/>
                                <small>Shop is:</small>
                            </div>
                            <button onClick={() => dispatch(setOpen(!isOpen))} className={`select-none relative flex items-center justify-between p-3 ${isOpen ? "bg-green-500 text-white font-bold" : "bg-[rgb(11,11,11)] border border-gray-500"} text-gray-500 w-[115px] h-[30px] rounded-full relative cursor-pointer active:cursor-default duration-300 border-gray-500`}>
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
                    </div>
                    
                </div>
            </div>
            
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <div className="flex justify-between">
                        <div className="text-white flex justify-between w-full gap-3 px-5">
                            <div className="flex gap-5 items-center">
                                <Footprints/>
                                <h1 className="font-bold text-xl">Walk-in list</h1>
                            </div>
                            
                            <button onClick={() => dispatch(setConfWIC(true))} className="hover:text-green-500 cursor-pointer duration-300 active:cursor-default">
                                <Plus/>
                            </button>
                        </div>
                    </div>
                    <hr className="bg-gray-500"/>
                </div>
                
                <div className={`h-[400px] bg-[rgb(7,7,7)] p-5 rounded overflow-auto ${WIC.length < 1 && "flex justify-center items-center"}`}>
                    {WIC.length > 0 ? (
                        <ul className="flex flex-col gap-5 w-full">
                            {WIC.map(item => {
                                const d = new Date(item.createdat);

                                return(
                                    <li onClick={() => setUpWIC(true)} key={item.id} className="bg-white p-5 rounded flex justify-between items-center cursor-pointer active:cursor-default">
                                        <div >
                                            <h1 className="font-bold text-xl">{item.category}</h1>
                                            <p>{`Date: ${d.toLocaleDateString()}`} </p>
                                            <p>{`Time: ${ d.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}`}</p>
                                        </div>
                                        <button onClick={() => openConfDel(item.id)} className="hover:text-red-700 duration-200 cursor-pointer">
                                            <X/>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    ):(
                        <h1 className="text-[rgb(23,23,23)] font-bold text-3xl text-center">No walk-in clients</h1>
                    )}
                </div>
            </div>


        </div>
        {/* Delete WIC Pop up: */}
        <Dialog open={delConf} onClose={setDelConf} className={"bg-[rgba(0,0,0,0.5)] fixed top-0 bottom-0 left-0 right-0 z-3000 flex justify-center items-center"}>  
            <DialogPanel>
                <motion.div
                    drag
                    dragMomentum={false}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    className="max-sm:w-[90%] w-[500px] hover:cursor-grab active:cursor-grabbing bg-white p-5 rounded shadow-xl flex gap-3 flex-col"
                >   
                    <div className="flex gap-3 items-center">
                        <TriangleAlert/>
                        <h1 className="font-bold text-xl">Warning</h1>
                    </div>

                    <p className="px-5">This action cannot be undone.</p>                    
                    <div className="flex gap-2 justify-end">
                        <button type="button" onClick={() => targetDel && handleDeleteWIC(targetDel)} className="bg-blue-500 text-white font-bold px-3 rounded py-1 hover:translate-y-0.5 duration-200 cursor-pointer">Confirm</button>
                        <button type="button" onClick={() => setDelConf(false)} className="bg-red-500 text-white font-bold px-3 rounded py-1 hover:translate-y-0.5 duration-200 cursor-pointer">Cancel</button>
                    </div>
                </motion.div>
            </DialogPanel>
        </Dialog>

        {/* Update WIC Pop up: */}
        <Dialog open={upWIC} onClose={() => setUpWIC} className={"bg-[rgba(0,0,0,0.5)] fixed top-0 bottom-0 left-0 right-0 z-3000 flex justify-center items-center"}>  
            <DialogPanel>
                <motion.div
                    drag
                    dragMomentum={false}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    className="max-sm:w-[90%] w-[500px] hover:cursor-grab active:cursor-grabbing bg-white p-5 rounded shadow-xl flex gap-3 flex-col"
                >   
                    <div className="flex gap-3 items-center">
                        <Footprints/>
                        <h1 className="font-bold text-xl">Create new Walk-in client</h1>
                    </div>
                    <form onSubmit={(e) => targetDel && handleUpdateWIC(targetDel, e)} className="flex flex-col gap-5">
                        <div className="flex flex-col">
                            <label htmlFor="category" className="text-sm">Category:</label>
                            <select defaultValue={"unknown"} name="category" id="category" className="border py-2 px-3 rounded">
                                <option value="Unknown">Unknown</option>
                                <option value="Minimum">Minimum</option>
                                <option value="BackPiece">Back Piece</option>
                                <option value="ArmSleeve">Outer/Inner Arm Sleeve</option>
                            </select>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button className="bg-blue-500 text-white font-bold px-3 rounded py-1 hover:translate-y-0.5 duration-200 cursor-pointer">Confirm</button>
                            <button type="button" onClick={() => setUpWIC(false)} className="bg-red-500 text-white font-bold px-3 rounded py-1 hover:translate-y-0.5 duration-200 cursor-pointer">Cancel</button>
                        </div>
                    </form>
                </motion.div>
            </DialogPanel>
        </Dialog>   
        <ToastContainer theme="dark"/>
    </>
  )
}

export default Shortcuts
