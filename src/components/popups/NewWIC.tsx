import { Dialog, DialogPanel } from "@headlessui/react"
import { motion } from 'framer-motion'
import { Footprints } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../state/store"
import { setConfWIC, setWIC } from "../../state/status/shopStats"
import type { FormEvent } from "react"
import { supabase } from "../../supabaseClient"
import { toast } from "react-toastify"

const NewWIC = () => {
    const confWIC = useSelector((state: RootState) => state.shop.confWIC);
    const dispatch = useDispatch<AppDispatch>()

    const handleAddNewWIC = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
    
            const formData = new FormData(e.currentTarget);
            const category = formData.get("category")
    
            console.log(category);
    
            try {
                const {data, error} = await supabase.from('walkinclients').insert({category});
    
                if(error){
                    throw new Error(`${error.message}`)
                }
    
                console.log('Updated Successfully');
                dispatch(setConfWIC(!confWIC));
                toast.success("New Walk-In schedule created");
                console.log(data);

                const walkIns = await supabase.from("walkinclients").select();

                if(walkIns.error){
                    throw new Error(`${walkIns.error.message}`)
                }

                dispatch(setWIC(walkIns.data));
                
                dispatch(setConfWIC(false));
            } catch (error) {
                console.error((error as Error).message)
                toast.error("Failed to create schedule")
            } finally{
                dispatch(setConfWIC(false));
            }
        }

  return (
    <>
        <Dialog open={confWIC} onClose={() => dispatch(setConfWIC(false))} className={"bg-[rgba(0,0,0,0.5)] fixed top-0 bottom-0 left-0 right-0 z-3000 flex justify-center items-center"}>  
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
                    <form onSubmit={(e) => handleAddNewWIC(e)} className="flex flex-col gap-5">
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
                            <button type="button" onClick={() => dispatch(setConfWIC(false))} className="bg-red-500 text-white font-bold px-3 rounded py-1 hover:translate-y-0.5 duration-200 cursor-pointer">Cancel</button>
                        </div>
                    </form>
                </motion.div>
            </DialogPanel>
        </Dialog>       
    </>
  )
};


export default NewWIC
