import { Link } from "react-router-dom";

const Footer = () => {
    return (  
        <div className="z-1000 bg-[rgb(23,23,23)] w-full p-10 flex justify-center items-center">
            <Link to={"/tpc"} className="text-gray-500">Terms, Policies & Consent</Link>
        </div>
    );
}
 
export default Footer;
