import {useState} from "react";
import { useAuth } from "../views/Auth";


// const handleLogout=()=>{
//        authUse.logout();
 //   }

function FormSignUp(){
    const authUse= useAuth();
    const[email, setEmail]=useState("")
    const[password, setPassword]=useState("")
    const handleLogin=(e)=>{
        e.preventDefault();
        authUse.login(email,password);
    };

    const handleGoogle=(e)=>{
        e.preventDefault();
        authUse.loginWithGoogle();
    };
    function handleClick(){
        window.location.href="http://localhost:5173/login";
    }
    return(
        <div className="Sign-Up">
            <form className="SignUpForm">
                <h3 className="title">Sign Up</h3>
                <input 
                    onChange={(e)=> setEmail(e.target.value)} 
                    className="input"
                    type="email"
                />
                <input onChange={(e)=>setPassword(e.target.value)}
                className="input"
                type="password"
                />     
                <button onClick={(e)=>handleLogin(e)} className="button">Enter</button>
                <button onClick={(e)=> handleGoogle(e)} className="button">Sign Up with Google</button> 
                <h5 onClick={handleClick}>¿Ya tienes una cuenta? Login</h5>
            </form>
        </div>
    );
}
export default FormSignUp;