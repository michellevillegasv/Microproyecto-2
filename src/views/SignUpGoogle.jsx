import FormSignUpGoogle from "../components/FormSignUpGoogle";
import { AuthProvider } from "./Auth";

function SignUpGoogle(){
    return(
        <div>
            <AuthProvider>
                <FormSignUpGoogle />
            </AuthProvider>
        </div>
    )
}
export default SignUpGoogle;