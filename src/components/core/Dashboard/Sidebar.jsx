import React from 'react'

import { useSelector, useDispatch } from 'react-redux';

import { sidebarLinks } from './../../../data/dashboard-links';
import SidebarLink from './SidebarLink';
import { VscSettingsGear, VscSignOut } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './../../common/ConfirmationModal';

import { useState } from 'react';
const Sidebar = () => {
    const {user,loading:profileLoading}= useSelector((state)=>state.profile);
    const {loading:authLoading}= useSelector((state)=>state.auth);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const [confirmationModal,setConfirmationModal]= useState(null);

    if(profileLoading || authLoading){
        return (
            <div className='mt-10'>
               Lading...
            </div>
        )
    }

  return (
    <div>
        <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
            <div className='flex flex-col'>
                {
            sidebarLinks.map((link,index)=>{
                if(link.type && user?.accountType !==link.type)return null;
                return(
                    <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                )
            

                
            })
        }
            </div>
            <div className='mx-auto  mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'>
            </div>
      <div className='flex flex-col '>
        <SidebarLink link={{name:"Settings",path:"dashboard/settings"}}iconName={VscSettingsGear}/>

      </div>
      <button
      className='text-sm font-medium text-richblack-300'
      onClick={()=>{ setConfirmationModal(
        {
        text1: "Are you Sure ?",
         text2:"You will be logged out of your Account",
         btnText1:"Logout",
         btn2Text:"Cancel",
        //  btn1Handler:()=>dispatch(logout(navigate)),
         btn2Handler:()=> setConfirmationModal(null)
         }

      )
      }}
      >
        <div className='flex items-center gap-x-2'>
            <VscSignOut className='text-lg'/>
             <span>Logout</span>
            </div>
        

      </button>

        </div>
        {confirmationModal && <ConfirmationModal modalData= {confirmationModal}/>}
      
    </div>
  )
}

export default Sidebar
