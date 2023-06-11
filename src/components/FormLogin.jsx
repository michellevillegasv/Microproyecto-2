import {useState} from "react";
import { useAuth } from "../views/Auth";




function FormLogin(){
    const authUse= useAuth();
    const[emailRegister, setEmailRegister]=useState("")
    const[passwordRegister, setPasswordRegister]=useState("")
    const handleRegister=(e)=>{
        e.preventDefault()
        authUse.register(emailRegister,passwordRegister)
    };
    const handleGoogle=(e)=>{
        e.preventDefault();
        authUse.loginWithGoogle();
    };
    function handleClick(){
        window.location.href="http://localhost:5173/sign-up";
    }
    return(
        <div className="Login ">
            <form className="loginForm">
                <h3 className="title">Login</h3>
                <input 
                    onChange={(e)=> setEmailRegister(e.target.value)} 
                    className="input"
                    type="email"
                />
                <input onChange={(e)=>setPasswordRegister(e.target.value)}
                className="input"
                type="password"
                />     
                <button onClick={(e)=>handleRegister(e)} className="button">Enter</button>
                <button onClick={(e)=>handleGoogle(e)} className="button">Enter with Google</button>
                <h5 onClick={handleClick}>¿No tienes una cuenta? Regístrate</h5>
            </form>
        </div>
    );
}
export default FormLogin;
