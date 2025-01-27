import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const RequirementField = (name,label,register,setValue,errors,getValues) => {
    const [requirement,setRequirement]=useState("");
    const [requirementList,setRequirementList]= useState([]);
    useEffect(()=>{
        register(name,{
            required:true,
            validate: (value)=>value.length>0
        })

    },[]);
    const handleAddRequirement=()=>{q
        if(requirement){
            setRequirementList(...requirementList,requirement);
            setRequirement("");
        }

    }
    const handleRemoveRequirement=()=>{
        const updatedRequirementList= [...requirementList];
        updatedRequirementList.splice(index,1);
        setRequirementList(updatedRequirementList);
      
        
    }
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div>
        <input
        type="text"
        id={name}
        value={requirement}
        onChange={((e)=>setRequirement(e.target.value))}

        />
        <button
        type="button"
        onClick = {handleAddRequirement}
        className='font-semibold text-yelllow-50'
        >
            Add
        </button>
        {
            requirementList.length>0 && (
                <ul>
                    {
                        requirementList.map((requirement,ind)=>(
                            <li key={ind} className='flex items-center text-richblack-5'>
                                <span>
                                    {requirement}
                                </span>
                                <button
                                type='button'
                                onClick={()=>handleRemoveRequirement(ind)}
                                className='text-xs text-pure-grey'>
                                    clear
                                </button>
                            </li>

                        ))
                    }
                </ul>
            )
        }
        {
            errors[name] && (
                <span>
                    {label} is requried
                </span>
            )
        }
        
      </div>
    </div>
  )
}

export default RequirementField
