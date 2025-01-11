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
        if(editCourse){
          setValue("courseTitle",course.courseName);
          setValue("courseShortDesc",course.courseDescription);
          setValue("coursePrice",course.price);
          setValue("courseTags",course.tags);
          setValue("courseBenefits",course.whatWillYouLearn);
          setValue("courseCategory",course.category);
          setValue("courseRequirements",course.instructions);
          setValue("courseImage",course.thumbnail);

        }
        getCategories();
        
    },[]);
    const onSubmit= async(data)=>{

    }

  return (
   <form onSubmit={handleSubmit(onSubmit)}
   className='rounded-md border-richblack-700 p-6 space-y-8'>
   <div>
    <label htmlFor='courseTitle'> Coourse Title</label>
      <input id="courseTitle"
      placeholder='Enter Course Title'
      className='w-full'
      {...register("courseTitle",{required:true})}/>
      {
        errors.courseTitle && (
          <span>
            Course Title is required 
          </span>
        )
      }
      
   
   </div>
   <div>
    <label htmlFor='courseShortDesc'>Course Short Description<sup>*</sup></label>
    <input
    id="courseShortDesc"
    placeholder='Enter Description'
    className='w-full min-h-[140px]'
    {...register("courseShortDesc",{required:true})}
    
    />
    {
        errors.courseShortDesc && (
          <span>
            Course Description is required 
          </span>
        )
      }
   </div>

   <div className='relative'>
    <label htmlFor='coursePrice'>Course Price<sup>*</sup></label>
    <input
    id="coursePrice"
    placeholder='Enter Course Price'
    className='w-full '
    {...register("coursePrice",{required:true,
      valueAsNumber:true
    })}
    
    />
    <MiOutlineCurrrencyRupee className ="absolute top-1/2 text-richblack-400"/>
    {
        errors.coursePrice && (
          <span>
            Course Price  is required 
          </span>
        )
      }
   </div>
   <div>
    <label htmlFor='courseCategory'> Course Category</label>
      <select id="courseCategory"
     defaultValue=""
      className='w-full'
      {...register("courseCategory",{required:true})}>
        <option value="" disabled >Choose a category</option>
        {

          !loading && courseCategories.map((category,index)=>{
            <option key={index} value={category?.id}>
              {category?.name}
            </option>
          })
        }
        </select>
      {
        errors.courseCategory && (
          <span>
            Course category is required 
          </span>
        )
      }
      
   
   </div>
   {/* create a custom component for handling inout tags */}
   
   {/* <ChipInput

   />
    */}

   {/* upload component */}
  {/* Benifits of the course */}
  <div>
  <label htmlFor='courseBenefits'>Benifits of the course</label>
  <textarea  className='min-h-[130px] w-full' id="courseBenefits"
  placeholder='Enter benefits of the course'
   {...register("courseBenefits",
    {required:true})}/>
  
  {
        errors.courseBenefits && (
          <span>
            Course benefits is required 
          </span>
        )
      }

  </div>

  {/* requirementField component */}
  <RequirementField
  name="courseRequirements"
  label="Requirements/Instructions"
  register={register}
  errors={errors}
  setValue={setValue}
  getValues={getValues}/>

   </form>
  )
}

export default CourseInformationForm
