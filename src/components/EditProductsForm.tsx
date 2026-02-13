import { TriangleAlert, X } from 'lucide-react'
import React, { useEffect, useRef, useState, type FormEvent } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { supabase } from '../supabaseClient'
import type { detailType } from './Products'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import {motion} from 'framer-motion'

type errsType = {
    name: boolean,
    price: boolean,
    file: boolean
}

const EditProductsForm = () => {
    const [errs, setErrs] = useState<errsType>({name: false, price: false, file: false})
    const inputRef = useRef<HTMLInputElement>(null)
    const [theFile, setTheFile] = useState<File | null>(null)
    const { id } = useParams()

    const [details, setDetails] = useState<detailType | null>(null)
    const [currentImg, setCurrentImg] = useState<string | null>(null)
    const navigate = useNavigate();

    //Delete request:
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getDetails = async () => {
            try {
                const {data, error} = await supabase.from("products").select().eq("id", id);

                if(error){
                    throw new Error(`${error.message}`)
                }

                console.log(data);
                setDetails(data && data.length > 0 ? data[0] : null)
                setCurrentImg(data && data.length> 0 ? data[0].image_url : null)
            
                
            } catch (error) {
                console.error((error as Error).message)
            }
        }

        getDetails();
    }, [])

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null
        if(!file) return

        const validTypes = ["image/jpeg", "image/png"];

        if(!validTypes.includes(file.type)){
            toast.error("Invalid file type. Please select a JPG or PNG image.");
            return;
        }
        setErrs(prev => ({...prev, file: false}))
        setTheFile(file);
        setCurrentImg(null);
    }

    const handleDiscardSelected = () => {
        setTheFile(null);
        setErrs(prev => ({...prev, file: false}))

        if(inputRef.current){
            inputRef.current.value = "";
        }
    }

    // --------------------------------------------------------------
    const handleRemoveImage = () => {
        setCurrentImg(null);
    }

    const updateProductImage = async (file: File) => {
        const ext = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${ext}`

        const { error } = await supabase.storage.from("product-images").upload(fileName, file);

        if(error) throw error;

        const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);

        return {newImageName:fileName ,publicUrl: data.publicUrl};
    }

    const deleteOldImage = async (image: string) => {
        const {error} = await supabase.storage.from("product-images").remove([`${image}`]);

        if(error) throw error
    }

    const updateProductWithImage = async (name: string, price: number, image_url: string, image_name: string) => {
        const {error} = await supabase.from("products").update({name, price, image_url, image_name}).eq("id", id);

        if(error) throw error
    }

    

    const handleUpdate = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get("ItemName") as string
        const price = parseFloat(formData.get("ItemPrice") as string)
        
        console.log(`${name}, ${price}`)
        
        try {
            if(!details) return

            let imageUrl = details.image_url;
            let imageName = details.image_name;

            if(!currentImg && theFile){
                const uploaded = await updateProductImage(theFile)
                imageUrl = uploaded.publicUrl;
                imageName = uploaded.newImageName;

                console.log(`Image name: ${details.image_name}`)
                await deleteOldImage(details.image_name)
            }

            if(!currentImg && !theFile){
                setErrs(prev => ({...prev, file: true}))
                toast.error("Missing image")
                return;
            }

            updateProductWithImage(name, price, imageUrl, imageName)

            toast.success("Product updated successfully!")
            navigate("/dashboard/shop")
        } catch (error) {
            console.error(error);
            toast.error("Update failed");
        }
    }

    // Delete

    const deleteProduct = async () => {
        const { error } = await supabase.from("products").delete().eq("id", id);

        if(error) throw error
    }

    const handleDelete = async () => {
        if(!details) return;
        
        try {
            deleteProduct();

            deleteOldImage(details.image_name)

            toast.success("Product deleted successfully")
            navigate("/dashboard")
        } catch (error) {
            console.error((error as Error).message)
        }
    }

  return (
    <>
        {details ? (
            <form onSubmit={(e) => handleUpdate(e)} className='text-white flex flex-col gap-5 overflow-y-auto px-5 '>
                <div className='inputCombo'>
                    <label htmlFor="ItemName">Item Name:</label>
                    <div className='flex flex-col'>
                        <input defaultValue={details.name} onChange={() => setErrs(prev => ({...prev, name: false}))} type="text" id="ItemName" name="ItemName" className={`border ${errs.name ? "border-red-500" : "border-gray-500"} p-5 rounded`} placeholder='Enter item name'/>
                        {errs.name &&
                            <small className='text-red-500'>* Item name is required</small>
                        }
                    </div>
                </div>
                <div className='inputCombo'>
                    <label htmlFor="ItemPrice">Price:</label>
                    <div className='flex flex-col'>
                        <input
                            defaultValue={details.price}
                            onChange={() => {
                                setErrs(prev => ({...prev, price: false}))
                            }} 
                            type="number" id="ItemPrice" name="ItemPrice" className={`border ${errs.price ? "border-red-500" : "border-gray-500"} p-5 rounded`} placeholder='0' />
                        {errs.price &&
                                <small className='text-red-500'>* Item price is required</small>
                        }
                    </div>
                </div>
                <div className="inputCombo">
                    <p>Upload Image: </p>
                    {!theFile && !currentImg ? (
                        <div>
                            <div className='flex flex-col'>
                            {/* Hidden file input */}
                            <input
                                type="file"
                                ref={inputRef}
                                id="ItemImage"
                                className="hidden"
                                accept="image/png, image/jpeg"
                                onChange={(e) => handleSelectFile(e)}
                            />

                            {/* Styled button */}
                            <label
                                htmlFor="ItemImage"
                                className={
                                    `cursor-pointer text-white px-4 py-2 rounded text-center h-full w-full flex flex-col justify-center items-center gap-2 border-dashed border-2  ${errs.file ? "border-red-500" : "border-gray-500"} py-15 gap-10`}
                            >
                                <h1 className='text-2xl font-bold'>Select File here</h1>
                                <p className='text-gray-500'>Files Supported: JPG, PNG</p>
                                <p className='bg-green-700 px-5 py-2 rounded'>Choose Image</p>
                            </label>
                                {errs.file &&
                                        <small className='text-red-500'>* Item image is required</small>
                                }
                            </div>
                        </div>
                    ): theFile && !currentImg ? (
                        <div className='bg-white text-[rgb(23,23,23)] flex justify-between p-5 rounded'>
                            <p>{theFile.name}</p>
                            <button onClick={() => handleDiscardSelected()} type='button' className='cursor-pointer'>
                                <X/>
                            </button>
                        </div>
                    ):(
                        <div className='flex justify-center items-center'>
                            <div className='relative'>
                                <img src={`${details.image_url}`} alt="" className='w-50'/>
                                <button type='button' onClick={handleRemoveImage} className='text-red-500 bg-black rounded-full p-1 absolute top-[-15px] right-[-15px] hover:translate-y-0.25 duration-200 cursor-pointer'>
                                    <X size={30}/>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <button className='bg-green-500 rounded p-5 cursor-pointer'>Update</button>
                <button onClick={() => setOpen(true)} type='button' className='bg-red-500 rounded p-5 cursor-pointer'>Delete</button>
            </form>
        ):(
            <div className='grid place-items-center h-[500px]'>
                <ClipLoader color='green' cssOverride={{borderWidth: 3}}/>
            </div>
        )}
        <ToastContainer theme='dark'/>
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
    </>

  )
}

export default EditProductsForm
