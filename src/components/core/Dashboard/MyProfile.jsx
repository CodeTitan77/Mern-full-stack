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
      <div>
        {/* section one */}
        <div>
            <img src="{user?.image}" alt={`profile=${user?.firstName}`}
            className='aspect-square w-[78px] rounded-full object-cover'/>
             <div>
                <p>

                </p>
                <p>

                </p>
             </div>
        </div>
        <IconBtn/>
    </div>
    </div>
  )
}

export default MyProfile
