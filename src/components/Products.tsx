import { PhilippinePeso, Plus } from "lucide-react"
import type { RootState } from "../state/store"
import { useSelector } from "react-redux";

type ChildProps = {
    selected?: string,
    setSelected?: (value: string) => void
}

const Products = ({setSelected}: ChildProps) => {
    const items = [{title: "Needle", price: 123, image: "/card1.png"}, {title: "ink", price: 321, image: "/card2.png"}, {title: "Ointment", price: 23, image: "/card3.png"}]
    const authenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <div className="grid max-sm:grid-cols-2 grid-cols-4 max-sm:gap-5 gap-10">
            {items.map((item, index) => (
                <div key={index} className="text-[rgb(23,23,23)]  p-5 rounded border bg-white flex flex-col gap-3">
                    <img src={`${item.image}`} alt="" className="w-80" />
                    <div className="">
                        <h1 className="text-[16px]">{item.title}</h1>
                        <div className="flex items-center">
                            <PhilippinePeso size={15}/>
                            <span>{item.price}</span>
                        </div>
                    </div>
                </div>
            ))}
            {authenticated &&
                <div onClick={() => setSelected && setSelected("addProduct")} className="hover:bg-white hover:text-[rgb(23,23,23)] border border-white rounded grid place-items-center text-white duration-200 cursor-pointer">
                    <Plus size={50}/>
                </div>
            }
        </div>
    )
}

export default Products
