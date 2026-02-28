import { Footprints, Layers2, StoreIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../state/store"
import { setActive, setOpen } from "../state/status/shopStats"

const Shortcuts = () => {
    const isOpen = useSelector((state: RootState) => state.shop.isOpen);
    const isActive = useSelector((state: RootState) => state.shop.isActive);
    const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="flex flex-col gap-5 h-full p-10">
      <div className="text-white flex gap-2 items-center">
        <Layers2/>
        <h1 className="text-xl font-bold">Shortcuts</h1>
      </div>
      
      <hr className="bg-gray-500"/>

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

                <div className="flex flex-col gap-2">
                    <div className="text-gray-500 flex items-center gap-2">
                        <Footprints size={15}/>
                        <small>Walk-in Client:</small>
                    </div>
                    <button onClick={() => dispatch(setActive(!isActive))} className={`select-none relative flex items-center justify-between p-3 ${isActive ? "bg-green-500 text-white font-bold" : "bg-[rgb(11,11,11)] border border-gray-500"} text-gray-500 w-[95px] h-[30px] rounded-full relative cursor-pointer active:cursor-default duration-300`}>
                        <motion.div 
                            initial={{ x: 5 }}
                            animate={{ left: isActive ? "calc(100% - 45px - 0.7rem)" : "0px" }}
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
  )
}

export default Shortcuts
