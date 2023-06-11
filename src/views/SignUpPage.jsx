import FormSignUp from "../components/FormSignUp";
import { AuthProvider } from "./Auth";

function SignUp(){
    return(
        <div>
            <AuthProvider>
                <FormSignUp />
            </AuthProvider>
        </div>
    )
}
export default SignUp;