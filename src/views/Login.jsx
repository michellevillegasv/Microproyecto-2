import FormLogin from "../components/FormLogin";
import { AuthProvider } from "./Auth";

function Login(){
    return(
        <div>
            <AuthProvider>
                <FormLogin />
            </AuthProvider>
        </div>
    )
}
export default Login;