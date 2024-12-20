import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"

export function getPasswordResetToken(email,setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response= await apiConnector("POST",RESETPASSTOKEN_API,{email});
            console.log("Reset passowwrd response",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Reset Email Sent");
            setEmailSent(true);
        }
        catch(error){
            console.log("Reset password token error");
            toast.error("Unable to update password")
          

        }
        dispatch(setLoading(false));
    }
}
export function resetPassword(password,confirmPassword,token){
    return async (dispatch)=>{
        dispatch(setLoading(true));
        try{
         const response= await apiConnector("POST",RESETPASSWORD_API,{password,confirmPassword,token});
         console.log("Response from resetPassword", response);
         if(!response.data,success){
            throw new Error(response.data.message);
         }
         toast.success("Password reset successfully");
        }
        catch(error){
            console.log("Reset password token error");
            toast.error("Unable to reset password")
           
        }
        dispatch(setLoading(false));

    }

}
