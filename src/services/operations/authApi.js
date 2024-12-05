import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"

export function getPasswordResetToken(email,setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response= await apiConnector("POST",RESETPASSWORD_API,{email});
            console.log("Reset passowwrd response",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Reset Email Sent");
            setEmailSent(true);
        }
        catch(error){
            console.log("Reset password token error");
            dispatch(setLoading(false));

        }
    }
}
