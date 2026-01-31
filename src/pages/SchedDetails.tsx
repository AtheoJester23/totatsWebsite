import { useEffect, useState, type FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import { supabase } from "../supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { motion } from 'framer-motion'
import { TriangleAlert } from "lucide-react";

type errsType = {name: boolean, date: boolean, time: boolean, category: boolean, colored: boolean}

type schedDeets = {
    id: string,
    name: string,
    date: string,
    time: string,
    category: string,
    colored: string
}

const SchedDetails = () => {
    const [errs, setErrs] = useState<errsType>({name: false, date: false, time: false, category: false, colored: false})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {id} = useParams();
    const [details, setDetails] = useState<schedDeets>({id: "", name: "", date: "", time: "", category: "", colored: ""})

    const [open, setOpen] = useState(false)

    console.log(id);

    useEffect(() => {
        const getDetails = async () => {
            try {
                setLoading(true)
                const {data, error} = await supabase.from("schedules").select().eq("id", id);
                
                if(error){
                    throw new Error(`${error}`)
                }

                setDetails(data[0]);
                console.log(data[0].name)
            } catch (error) {
                console.error((error as Error).message)
            } finally{
                setLoading(false)
            }
        }

        getDetails();
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //inputs
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const date = formData.get("date") as string;
        const time = formData.get("time") as string;
        const category = formData.get("category") as string;
        const colored = formData.get("colored") as string;

        //error section
        const collectedErrors: errsType = {name: false, date: false, time: false, category: false, colored: false}
        if(!name || name.replace(/[ 0-9]/g, "") == ""){
            collectedErrors.name = true
        }

        if(!date || date.replace(/[ ]/g, "") == ""){
            collectedErrors.date = true
        }

        if(!time || time.replace(/[ ]/g, "") == ""){
            collectedErrors.time = true
        }

        if(!date || date.replace(/[ ]/g, "") == ""){
            collectedErrors.time = true
        }

        if(!category || category.replace(/[ ]/g, "") == ""){
            collectedErrors.category = true
        }

        if(!colored || colored.replace(/[ ]/g, "") == ""){
            collectedErrors.colored = true
        }

        
        const pickedDate = new Date(date);
        const today = new Date();
        
        today.setHours(0,0,0,0);

        if(pickedDate < today){
            console.log("Invalid picked date")
            collectedErrors.date = true
        }else{
            console.log('valid')
        }
        
        if(Object.values(collectedErrors).includes(true)){
            setErrs(collectedErrors);
            toast.error("Oops—some fields are missing or invalid.")
            return;
        }
        
        try {
            setLoading(true)

            const { error} = await supabase.from('schedules').update({
                name,
                date,
                time,
                category,
                colored
            }).eq("id", id)

            if(error){
                throw new Error(`${error}`)
            }

            toast.success('Successfully booked a session.')
            navigate("/dashboard")
        } catch (error) {
            console.error((error as Error).message)
            toast.error('Failed to book a session.')
        } finally{
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        try {
            const {error} = await supabase.from("schedules").delete().eq("id", id);
            
            if(error){
                throw new Error(`Failed to delete schedule`)
            }

            toast.success("Successfully deleted schedule")
            navigate("/dashboard")
        } catch (error) {
            console.error((error as Error).message)
        }
    }

    return (
        <div className="flex flex-col w-full max-sm:p-5 max-sm:mt-30 max-sm:mb-10 p-20 mt-20">
            {!loading ? (
                <div className="flex flex-col w-full h-[79vh] p-7">
                <h1 className="text-white text-2xl mb-5">Book a session</h1>
                <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col w-full text-white gap-3">
                    <div className="flex flex-col select-none gap-1 ">
                        <label htmlFor="date" className="text-gray-500">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            onChange={() => {
                                setErrs((prev) => ({...prev, name: false}))
                            }}
                            placeholder="Enter your name here" 
                            className={`border ${errs.name ? "border-red-500" : "border-white"} p-3 rounded`}
                            autoComplete="off"
                            defaultValue={details.name}
                        />
                        {errs.name && (<small className="text-red-500">* Name is required / invalid name</small>)}
                    </div>
                    <div className="flex flex-col select-none gap-1">
                        <label htmlFor="date" className="text-gray-500">Date</label>
                        <input 
                            type="date" 
                            name="date" 
                            onChange={(e) => {
                                e.preventDefault();
                                setErrs((prev) => ({...prev, date: false}))
                            }}
                            onMouseDown={(e) => {e.preventDefault()}} 
                            onClick={(e) => {
                                e.preventDefault();
                                (e.target as HTMLInputElement).showPicker()
                            }} 
                            placeholder="YY/MM/DD" 
                            defaultValue={details.date}
                            className={`border ${errs.date ? "border-red-500" : "border-white"} p-3 rounded w-full`}
                        />
                        {errs.date && (<small className="text-red-500">Invalid Date</small>)}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="time" className="text-gray-500">Time</label>
                        <input type="time" 
                            defaultValue={details.time}
                            onMouseDown={(e) => {e.preventDefault()}} 
                            onChange={() => {setErrs((prev) => ({...prev, time: false}))}}
                            onClick={(e) => {(e.target as HTMLInputElement).showPicker()}}
                            name="time" placeholder="change this to 2 parts, from and to" className={`border ${errs.time ? "border-red-500" : "border-white"} p-3 rounded w-full`}/>
                        {errs.time && (<small className="text-red-500">That time is already scheduled, try another time</small>)}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="category" className="text-gray-500">Category</label>
                        <select defaultValue={details.category} name="category" className={`border bg-[rgb(23,23,23)] ${errs.category ? "border-red-500" : "border-white"} p-3 rounded`} onChange={() => {setErrs((prev) => ({...prev, category: false}))}}>
                            <option value={""} disabled>Select</option>
                            <option value="Minimalist">Minimalist</option>
                        <option value="Back Piece">Back Piece</option>
                        <option value="Outer/Inner Arm Sleeve">Outer/Inner Arm Sleeve</option>
                        <option value="Full Sleeve">Full sleeve</option>
                        </select>
                        {errs.category && (<small className="text-red-500">* Category is required</small>)}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="colored" className="text-gray-500">Colored?</label>
                        <select defaultValue={details.colored} name="colored" className={`border bg-[rgb(23,23,23)] ${errs.colored ? "border-red-500" : "border-white"} p-3 rounded`} onChange={() => {setErrs((prev) => ({...prev, colored: false}))}}>
                            <option value={""} disabled>Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {errs.colored && (<small className="text-red-500">* Please select Yes or No.</small>)}
                    </div>
                    {!loading ? (
                        <>
                            <button className="mt-2 bg-green-500 text-white p-3 font-bold rounded cursor-pointer hover:translate-y-0.5 duration-300">Submit</button>
                            <button type="button" onClick={() => setOpen(true)} className="mt-2 bg-red-500 text-white hover:translate-y-0.5 p-3 font-bold rounded cursor-pointer duration-300">Delete</button>
                        </>
                    ):(
                        <div className="mt-2 bg-blue-400 text-white p-3 font-bold rounded">
                            <p className="text-center">Loading</p>
                        </div>
                    )}
                </form>
                </div>
            ):(
                <div className="flex flex-col w-full h-[79vh] justify-center items-center">
                    <ClipLoader size={34} color="red"/>
                </div>
            )}
            <ToastContainer theme="dark"/>
            <Dialog
                open={open}
                onClose={setOpen}
                className="relative z-50"
            >
                {/* Background overlay */}
                <motion.div className="fixed inset-0 bg-black/60" 
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                />

                <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>

                    <DialogPanel className="mx-auto max-w-sm rounded bg-white p-5 max-sm:w-[90%] sm:w-[50%]">
                        <div className='flex justify-center flex-col items-center gap-3'>
                            <TriangleAlert size={100} className='text-red-500'/>
                            <div className='text-center'>
                                <DialogTitle className="text-2xl font-bold">Are you sure?</DialogTitle>
                                <p className="text-gray-500">Warning: This action cannot be undone.</p>
                            </div>
                            <div className='flex gap-3'>
                                <button 
                                    className='px-5 py-2 bg-red-500 text-white rounded-full cursor-pointer hover:bg-red-600 duration-200 -translate-y-0.25 hover:translate-none shadow hover:shadow-none' 
                                    onClick={() => handleDelete()}>
                                        Yes
                                </button>
                                <button className='px-5 py-2 bg-gray-500 text-white rounded-full cursor-pointer hover:bg-gray-600 duration-200 -translate-y-0.25 hover:translate-none shadow hover:shadow-none' onClick={() => setOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div> 
    );
}
 
export default SchedDetails;