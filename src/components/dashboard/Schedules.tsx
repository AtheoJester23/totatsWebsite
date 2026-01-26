import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { ClipLoader } from 'react-spinners'
import { Link } from "react-router-dom";

export type schedTypes = {
    id: string,
    name: string,
    date: string,
    time: string,
    category: string
}[]

const Schedules = () => {
    const [scheds, setScheds] = useState<schedTypes>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getScheds = async () => {
            try {
                setLoading(true)
                const {data, error} = await supabase.from('schedules').select();

                if(error){
                    throw new Error(`${error}`)
                }

                console.log(data);

                setScheds(data)
            } catch (error) {
                console.error((error as Error).message)
            } finally{
                setLoading(false)
            }
        }

        getScheds();
    }, [])

    console.log(scheds)

    return (  
        <div className="flex flex-col gap-5 p-5 text-white">
            {!loading ? (
                <div className="max-sm:h-[70vh] min-md:h-[79vh] overflow-y-auto flex flex-col gap-5 p-5">
                    {scheds.map((item) => (
                        <Link to={`/editSched/${item.id}`} key={item.id} className="border rounded p-5 relative">
                            <h1 className="max-sm:text-xl text-4xl font-bold">{item.name}</h1>
                            <p className="max-sm:text-[14px]"><strong>Category:</strong> {item.category}</p>
                            <p className="max-sm:text-[12px]"><strong>Date:</strong> {item.date}</p>
                            <div className="absolute top-5 right-5 flex justify-center items-center">
                                <Pencil className="w-[17px] h-auto" size={100}/>
                            </div>
                        </Link>
                    ))}
                </div>
            ):(
                <div className="text-white flex justify-center items-center h-[80vh]">
                    <ClipLoader size={40} color="green" cssOverride={{ borderWidth: "3px" }}/>
                </div>
            )}

        </div>
    );
}
 
export default Schedules;