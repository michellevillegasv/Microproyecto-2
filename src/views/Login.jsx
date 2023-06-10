import FormLogin from "../components/FormLogin";
import { AuthProvider } from "./Auth";

function Login(){
    return(
        <div className="frameLogin">
            <AuthProvider>
                <FormLogin />
            </AuthProvider>
        </div>
    );
}
export default Login;