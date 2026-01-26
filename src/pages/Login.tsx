import LoginForm from "../components/LoginForm";

const Login = () => {
    return (  
        <div className="bg-[rgb(23,23,23)] h-[100vh] flex flex-col gap-5 justify-center items-center">
            <h1 className="text-4xl font-bold text-center text-white">Sign-in</h1>
            <LoginForm/>
        </div>
    );
}
 
export default Login;