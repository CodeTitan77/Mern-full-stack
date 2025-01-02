import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IconBtn from './../../common/IconBtn';

const MyProfile = () => {
    const {user}= useSelector((state)=>state.profile)
    const navigate = useNavigate();
  return (
    <div>
      <h1>My Profile</h1>
        {/* section one */}
      <div>
      
        <div>
            <img src={user?.image} alt={`profile=${user?.firstName}`}
            className='aspect-square w-[78px] rounded-full object-cover'/> 
            {/* make it a square to add it as a full circle */}
             <div>
                <p>
                 {user?.firstName + " "+ user?.lastName}
                </p>
                <p>
                {user?.email}
                </p>
             </div>
        </div>
        <IconBtn text="Edit" onClick={()=>{
          navigate("/dashboard/settings")
        }}>

        </IconBtn>
    </div>
    </div>
  )
}

export default MyProfile
