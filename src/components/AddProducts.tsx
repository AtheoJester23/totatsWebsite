import { Upload, X } from 'lucide-react'
import React, { useRef, useState, type FormEvent } from 'react'
import { toast, ToastContainer } from 'react-toastify'

type errsType = {
    name: boolean,
    price: boolean,
    file: boolean
}

const AddProducts = () => {
    const [errs, setErrs] = useState<errsType>({name: false, price: false, file: false})
    
    const [fileName, setFileName] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
        

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(!file) return

        const validTypes = ["image/jpeg", "image/png"];

        if(!validTypes.includes(file.type)){
            toast.error("Invalid file type. Please select a JPG or PNG image.");
            return;
        }
        setErrs(prev => ({...prev, file: false}))
        setFileName(file.name)
    }

    const handleDiscardSelected = () => {
        setFileName(null);

        if(inputRef.current){
            inputRef.current.value = "";
        }
    }

    const handleUpload = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const name = formData.get("ItemName") as string;
        const price = formData.get("ItemPrice") as string;
        const file = inputRef.current?.files?.[0]

        const errs = {name: false, price: false, file: false};

        if(!name || name.replace(/[ ]/g, "") == ""){
            errs.name = true
        }
        if(!price || price.replace(/[ ]/g, "") == ""){
            errs.price = true;
        }
        if(!file){
            errs.file = true;
        }

        if(Object.values(errs).includes(true)){
            setErrs(errs);
            toast.error("Please input all fields and select an image before uploading.");
            return 
        }


    }
  return (
    <>
        <form onSubmit={(e) => handleUpload(e)} className='text-white flex flex-col gap-5 overflow-y-auto px-5 '>
            <div className='inputCombo'>
                <label htmlFor="ItemName">Item Name:</label>
                <div className='flex flex-col'>
                    <input onChange={() => setErrs(prev => ({...prev, name: false}))} type="text" id="ItemName" name="ItemName" className={`border ${errs.name ? "border-red-500" : "border-gray-500"} p-5 rounded`} placeholder='Enter item name'/>
                    {errs.name &&
                        <small className='text-red-500'>* Item name is required</small>
                    }
                </div>
            </div>
            <div className='inputCombo'>
                <label htmlFor="ItemPrice">Price:</label>
                <div className='flex flex-col'>
                    <input onChange={() => setErrs(prev => ({...prev, price: false}))} type="number" id="ItemPrice" name="ItemPrice" className={`border ${errs.price ? "border-red-500" : "border-gray-500"} p-5 rounded`} placeholder='0'/>
                    {errs.price &&
                            <small className='text-red-500'>* Item price is required</small>
                    }
                </div>
            </div>
            <div className="inputCombo">
                <p>Upload Image: </p>
                {!fileName ? (
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
                ): (
                    <div className='bg-white text-[rgb(23,23,23)] flex justify-between p-5 rounded'>
                        <p>{fileName}</p>
                        <button onClick={() => handleDiscardSelected()} type='button' className='cursor-pointer'>
                            <X/>
                        </button>
                    </div>
                )}
            </div>
            <button className='bg-green-500 rounded p-5 cursor-pointer'>Upload</button>
        </form>
        <ToastContainer/>
    </>

  )
}

export default AddProducts
