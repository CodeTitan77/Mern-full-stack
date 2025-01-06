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
    {/* //section2 */}
      <div>
        <div>
        <p>About</p>
        <IconBtn text="Edit" onClick={()=>{
          navigate("/dashboard/settings");
        }}/>
          </div>
        
      
      <p>{user?.additionalDetails?.about ?? "Write something about yourself"}</p>
    </div>
    {/* section3 */}
    <div>
      <div>
        <p>Personal Details</p>
        <IconBtn text="Edit" onClick={()=>{
          navigate("/dashboard/settings")
        }}/>
        <div>
          <p>
           First Name  
          </p>
          <p>
              {user?.firstName}
            </p>
        </div>
        <div>
          <p>
           Email 
          </p>
          <p>
              {user?.email}
            </p>
        </div>
        <div>
          <p>
           Gender
          </p>
          <p>
              {user?.additionalDetails?.gender  ??  "add gender"}
            </p>
        </div>
        <div>
          <p>
           Last Name
          </p>
          <p>
              {user?.lastName}
            </p>
        </div>
        <div>
          <p>
           Contact Number
          </p>
          <p>
              {user?.additionalDetails?.contactNumber ??  "contact number"}
            </p>
        </div>
        <div>
          <p>
           Date of birth
          </p>
          <p>
              {user?.additionalDetails?.dateOfBirth ?? "Add dob"} 
            </p>
        </div>

      
        </div>
      </div>
    </div>
  )
}

export default MyProfile
