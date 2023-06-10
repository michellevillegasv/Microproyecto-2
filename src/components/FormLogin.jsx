import {useState} from "react";
import { useAuth } from "../views/Auth";


function FormLogin(){
    const authUse= useAuth()
    const[emailRegister, setEmailRegister]=useState("")
    const[passwordRegister, setPasswordRegister]=useState("")
    
    const[email,setEmail]=useState("")
    const[password, setPassword]=useState("")

    const handleRegister=(e)=>{
        e.preventDefault()
        authUse.register(emailRegister,passwordRegister)
    };

    const handleLogin=(e)=>{
        e.preventDefault();
        authUse.login(email,password);
    };

    const handleGoogle=(e)=>{
        e.preventDefault();
        authUse.loginWithGoogle();
    };
    const handleLogout=()=>{
        authUse.logout();
    }
    return(
        <div className="Login ">
            <form className="loginForm">
                <h3 className="title">Registro Usuario</h3>
                <input 
                    onChange={(e)=> setEmailRegister(e.target.value)} 
                    className="input"
                    type="email"
                />
                <input onChange={(e)=>setPasswordRegister(e.target.value)}
                className="input"
                type="password"
                />     
                <button onClick={(e)=>handleRegister(e)}
                className="button">Sumbit</button>
            </form>
        </div>
    );
}
export default FormLogin;