import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const {signupData,loading}= useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const [otp,setOtp]= useState("");
    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }

    },[])
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        const{
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }=signupData
        dispatch(signup(accountType,
            firstName,
            lastName,
            email,
            password,
            otp,navigate,
            confirmPassword))

    }

  return (
    <div>
        {
            
        loading ? (
        <div>
            ...Loading
            </div>
            ):(
                <div>
                    <h1>Verify Email</h1>
                    <p>A verification code has been sent to you. Enter the code below </p>
                    <form onSubmit={handleOnSubmit}>
                        <OTPInput value={otp} numInputs={6} onChange={setOtp}
                         renderInput={(props) => <input {...props} />} placeholder="-"
                         renderSeparator={<span>-</span>}/>
                         <button type="submit">
                         Verify Email
                         </button>
                       
                       
                    </form>
                    <div>
                    <Link to ="/login">
                    <p>
                        Back to Login
                    </p>
                    </Link>
                        </div>
                        <button onClick={()=>dispatch(sendOtp(signupData.email,navigate))}>
                            Resend it
                        </button>
            
                </div>

        )


        }
      
      
    </div>
  )
}

export default VerifyEmail
