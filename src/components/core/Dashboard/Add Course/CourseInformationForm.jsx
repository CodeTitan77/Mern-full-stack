import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},

    } = useForm();
    const {course,editCourse}= useSelector((state)=>state.course);
    const {loading,setLoading}=useState(false);
    const{courseCategories,setCourseCategories}=useState([]);
    const dispatch= useDispatch();
    useEffect(()=>{
        const getCategories= async()=>{
        setLoading(true);
        const categories= await fetchCourseCategories();
        if(categories.length>0){
            setCourseCategories(categories);
        }
        setLoading(false);
        }
        
    })

  return (
    <div>
       Course Info
    </div>
  )
}

export default CourseInformationForm
