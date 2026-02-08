import { PhilippinePeso, Plus } from "lucide-react"
import type { RootState } from "../state/store"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { ClipLoader } from "react-spinners";
import { Link, useLocation } from "react-router-dom";

type ChildProps = {
    selected?: string,
    setSelected?: (value: string) => void
}

export type detailType = {
    id: string,
    name: string,
    image_url: string,
    price: number,
    created_at: string
}

export type productsType = detailType[]


const Products = ({setSelected}: ChildProps) => {
    const [items, setItems] = useState<productsType | null>(null)
    const authenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const currentDir = location.pathname.split("/")[1];


    useEffect(() => {
        const getProducts = async () => {
            
            try {
                setLoading(true);
                const {data, error} = await supabase.from("products").select();
    
                if(error){
                    throw new Error(`${error.message}`)
                }

                console.log(data)
                setItems(data);
            } catch (error) {
                console.error((error as Error).message)
            }finally{
                setLoading(false)
            }
        }

        getProducts();
    }, [])

    return (
        <div className="h-[610px] max-sm:h-[520px] overflow-y-auto max-sm:no-scrollbar p-5">
            {!loading ? (
                <div className="grid max-sm:grid-cols-2 grid-cols-5 max-sm:gap-5 gap-10 auto-rows-fr">
                        {currentDir == "dashboard" ? (
                            <>
                                {items &&
                                    <>
                                        {items.map((item, index) => (
                                            <Link to={`/edit/${item.id}`} key={index} className="text-[rgb(23,23,23)] p-5 rounded border bg-white flex flex-col gap-3 cursor-pointer">
                                                <img src={`${item.image_url}`} alt="" className="w-70 h-41 object-contain rounded-t" />
                                                <div className="">
                                                    <h1 className="text-[16px]">{item.name}</h1>
                                                    <div className="flex items-center">
                                                        <PhilippinePeso size={15}/>
                                                        <span>{item.price}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </>
                                }
                                {authenticated &&
                                    <div onClick={() => setSelected && setSelected("addProduct")} className="hover:bg-white hover:text-[rgb(23,23,23)] border border-white rounded grid place-items-center text-white duration-200 cursor-pointer h-full">
                                        <Plus size={50}/>
                                    </div>
                                }
                            </>
                        ):(
                            <>
                                {items &&
                                    <>
                                        {items.map((item, index) => (
                                            <div key={index} className="text-[rgb(23,23,23)] p-5 rounded border bg-white flex flex-col gap-3 cursor-pointer">
                                                <img src={`${item.image_url}`} alt="" className="w-70 h-41 object-contain rounded-t" />
                                                <div className="">
                                                    <h1 className="text-[16px]">{item.name}</h1>
                                                    <div className="flex items-center">
                                                        <PhilippinePeso size={15}/>
                                                        <span>{item.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                }
                            </>
                        )}
                </div>
            ) : (
                <div className="grid place-items-center w-full h-full">
                    <ClipLoader className="text-red-500" color="yellow"/>
                </div>
            )}
        </div>
    )
}

export default Products
