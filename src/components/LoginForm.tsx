import { useState, type FormEvent } from "react";
import { supabase } from "../supabaseClient";
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../state/store";
import { useNavigate } from "react-router-dom";
import { setAuthenticated } from "../state/auth/authSlice";


const LoginForm = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        
        console.log(email, password)
        
        try {
            setLoading(true);

            const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if(error){
                console.error("Sign in error: ", error);
                throw new Error(`${error}`)
            }

            console.log(data.session.access_token);

            toast.success("Logged-in successfully")
        
            dispatch(setAuthenticated(true));
            navigate("/dashboard");
        } catch (error) {
            console.error((error as Error).message)
            toast.error("Wrong Credentials")
        } finally{
            setLoading(false)
        }
    }

    return (  
        <form onSubmit={(e) => handleLogin(e)} className="bg-white flex flex-col p-5 gap-5 w-[25%] max-sm:w-[70%] max-md:w-[50%] rounded">
            <div className="flex flex-col gap-2">
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" placeholder="Enter email address" className="border p-3 rounded border-gray-500"/>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password">password: </label>
                <input type="password" name="password" placeholder="******" className="border p-3 rounded border-gray-500"/>
            </div>
            {loading ? (
                <div className="bg-blue-400 font-bold text-white rounded p-3 select-none text-center">Loading...</div>
            ): (
                <button className="bg-green-500 font-bold text-white rounded p-3 cursor-pointer">Submit</button>
            )}
            <ToastContainer/>
        </form>
    );
}
 
export default LoginForm;