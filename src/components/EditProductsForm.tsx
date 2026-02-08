import { X } from 'lucide-react'
import React, { useEffect, useRef, useState, type FormEvent } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { supabase } from '../supabaseClient'
import type { detailType } from './Products'
import { useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

type errsType = {
    name: boolean,
    price: boolean,
    file: boolean
}

type selected = {
    setSelected?: (value: string) => void
}

const EditProductsForm = (choseSelected: selected) => {
    const [errs, setErrs] = useState<errsType>({name: false, price: false, file: false})
    const inputRef = useRef<HTMLInputElement>(null)
    const [theFile, setTheFile] = useState<File | null>(null)
    const { id } = useParams()

    const [details, setDetails] = useState<detailType | null>(null)
    const [currentImg, setCurrentImg] = useState<string | null>(null)

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

    const uploadImage = async (file: File) => {
            const fileExt = file.name.split(".").pop();
            const fileName = `${crypto.randomUUID()}.${fileExt}`

            const { error } = await supabase.storage.from("product-images").upload(fileName, file);
            
            if(error){
                throw error
            }

            const { data: publicUrlData} = supabase.storage.from("product-images").getPublicUrl(fileName);

            return publicUrlData.publicUrl;
    }

    const createProduct = async (name: string, price: number, imageUrl: string) => {
        const { error } = await supabase.from("products").insert([{
            name,
            price,
            image_url: imageUrl
        }]);

        if(error) throw error
    }

    const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const name = formData.get("ItemName") as string;
        const price = parseFloat(formData.get("ItemPrice") as string);
        const file = theFile as File

        const errs = {name: false, price: false, file: false};

        if(!name || name.replace(/[ ]/g, "") == ""){
            errs.name = true
        }
        if(!price){
            errs.price = true;
        }
        if(!file){
            errs.file = true;
        }

        console.log(`${name}, ${price}, ${theFile}`)

        if(Object.values(errs).includes(true)){
            setErrs(errs);
            toast.error("Please input all fields and select an image before uploading.");
            return;
        }

        try {
            const imageUrl = await uploadImage(file);

            await createProduct(name, price, imageUrl);

            toast.success("Product added successfully!")
            
            if(choseSelected && choseSelected.setSelected){
                choseSelected.setSelected("shop")
            }
        } catch (error) {
            console.error((error as Error).message);
            toast.error("Something went wrong")
        }
    }

    // --------------------------------------------------------------
    const handleRemoveImage = () => {
        setCurrentImg(null);
    }

    const updateProduct = async (name: string, price: number) => {
        const {error} = await supabase.from("products").update({name, price}).eq("id", id);

        if(error) throw error;
    }

    const handleUpdate = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get("ItemName") as string
        const price = parseFloat(formData.get("ItemPrice") as string)
        
        console.log(`${name}, ${price}`)
        
        return 
        try {
            
        } catch (error) {
            
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
                            onChange={(e) => {
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
                <button className='bg-green-500 rounded p-5 cursor-pointer'>Upload</button>
            </form>
        ):(
            <div className='grid place-items-center h-[500px]'>
                <ClipLoader color='green' cssOverride={{borderWidth: 3}}/>
            </div>
        )}
        <ToastContainer/>
    </>

  )
}

export default EditProductsForm
