import React from 'react'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from 'react-router-dom';
const UpdatePassword = () => {
    const [showPassword,setShowPassword]= useState(false);
    const [showConfirmPassword,setShowConfirmPassword]= useState(false);
    const [formData,setFormData]= useState({
        password:"",
        confirmPassword:"",
    }
    )
    const {password, confirmPassword}= formData;
    const {loading}= useSelector((state)=>state.auth);
    const handleOnChange = (e)=>{
        setFormData((prevData)=>(
            {
                ...prevData,
                [e.target.name] : e.target.value

            }

        ))
    }
    const handleOnSubmit= (e)=>{
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token));



    }
  return (
   <div>
     {
        loading ? (
            <div>

           ..Loading
            </div>

        ):(
            <div>
           <h1>Choose new Password</h1>
           <p>Almost done.Enter your new password and you are all set </p>
           <form onSubmit={handleOnSubmit}>
           <label>
                <p>
                    New Passwords
                </p>
                <input required type={showPassword ? " text " : "password"} 
                     name="password"
                     value={password}
                     onChange={handleOnChange}/>
                             <span
                onClick={()=>setShowPassword((prev)=>!prev)}>
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
           
                </label>

                <label>
                <p>
                    Confirm new Passwords
                </p>
                <input required type={showConfirmPassword ? " text " : "password"} 
                     name="confirmPassword"
                     value={confirmPassword}
                     onChange={handleOnChange}
                     placeholder='Confirm Password'/>
                             <span
                onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
           
                </label>
                <button type="submit">
                    Reset Passoword
                </button>
                <div>
                    <Link to ="/login">
                    <p>
                        Back to Login
                    </p>
                    </Link>
                </div>
        
           </form  >
                
                
                
                
            </div>

        )
     }
   </div>
  )
}

export default UpdatePassword
