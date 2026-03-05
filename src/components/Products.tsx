import { ChevronDown, PhilippinePeso, Plus } from "lucide-react"
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
    image_name: string,
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

    // const quickSort = (arr: []) =>{
    //     if(arr.length <= 1) return arr;

    //     const pivot = arr[arr.length - 1];
    //     const left = [];
    //     const right = [];

    //     for(let i = 0; i < arr.length - 1; i++){
    //         if(arr[i] < pivot){
    //             left.push(arr[i]);
    //         }else{
    //             right.push(arr[i])
    //         }
    //     }

    //     return [...quickSort(left), pivot, ...quickSort(right)]
    // }

    // const lowHigh = () => {
    //     if(!items || items.length <= 0) return;
    //     // const sorted = items.map()
    // }

    return (
        <div className={`${currentDir == "shop" ? "h-[670px] max-sm:h-full max-sm:p-5 overflow-y-auto max-sm:no-scrollbar p-5" : "h-[670px] max-sm:h-full overflow-y-auto max-sm:no-scrollbar p-5"} flex flex-col gap-2`}>
            <div className="flex justify-end gap-2 items-center">
                <label htmlFor="Sort" className="text-sm text-gray-500">Sort By:</label>
                <div className="relative">
                    <select className="bg-white p-2 rounded appearance-none pe-10">
                        <option value="lowToHigh" className="hover:bg-gray-500">Price low to high</option>
                        <option value="highToLow">Price high to low</option>
                    </select>
                    <ChevronDown className="absolute top-[11px] right-2 text-gray-500" size={20}/>
                </div>
            </div>
            {!loading ? (
                <div className="grid max-sm:grid-cols-2 grid-cols-5 max-sm:gap-5 gap-10 auto-rows-fr">
                        {currentDir == "dashboard" ? (
                            <>
                                {items &&
                                    <>
                                        {items.map((item, index) => (
                                            <Link to={`edit/${item.id}`} key={index} className="text-[rgb(23,23,23)] max-sm:p-3 p-5 rounded border bg-white flex flex-col gap-3 cursor-pointer max-sm:h-50 hover:translate-y-0.25 duration-300">
                                                <img src={`${item.image_url}`} alt="" className="w-70 max-sm:h-31 h-41 object-cover rounded-t" />
                                                <div className="">
                                                    <h1 className="text-[16px] truncate">{item.name}</h1>
                                                    <div className="flex items-center">
                                                        <PhilippinePeso className={`h-4`}/>
                                                        <span>{item.price}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                        {authenticated &&
                                            <Link to={"createProduct"} onClick={() => setSelected && setSelected("addProduct")} className="hover:bg-white hover:text-[rgb(23,23,23)] border border-white rounded grid place-items-center text-white duration-200 cursor-pointer auto-rows-fr">
                                                <Plus size={50}/>
                                            </Link>
                                        }
                                    </>
                                }
                            </>
                        ):(
                            <>
                                {items &&
                                    <>
                                        {items.map((item, index) => (
                                            <div key={index} className="text-[rgb(23,23,23)] p-5 rounded border bg-white flex flex-col gap-3 cursor-pointer max-sm:h-50 h-73">
                                                <img src={`${item.image_url}`} alt="" className="w-70 h-41 object-contain rounded-t" />
                                                <div className="">
                                                    <h1 className="text-[16px] truncate">{item.name}</h1>
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
