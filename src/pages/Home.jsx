import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import {Link} from "react-router-dom"

import HighlightText from './../components/core/Homepage/HighlightText';
import CTAButton from './../components/core/Homepage/CTAButton';
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import TimelineSection from './../components/core/Homepage/TimelineSection';
import LearningLanguageSection from './../components/core/Homepage/LearningLanguageSection';
import InstructorSection from './../components/core/Homepage/InstructorSection';
import Footer from '../components/common/Footer'
import ExploreMore from './../components/core/Homepage/ExploreMore';


const Home = () => {
  return (
    <div className="relative mx-auto w-11/12 flex flex-col text-white justify-between max-w-maxContent">
        {/* Section 1 */}
        <div>
           <Link to={"/signup"}>
           <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit '>
              <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
              transition-all duration-200 group-hover:bg-richblack-900 '>
                <p>Become an Instructor</p>
                <FaArrowRight />
                
              </div>
          
           </div>
           
           </Link>
           <div className='text-center text-4xl font-semibold mt-6'>
            Empower your future <HighlightText text= {"Coding Skills"}/>
           </div>
           <div className='text-center mt-4 w-[90%] text-lg font-bold text-richblack-300'>
            <span>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</span>
           </div>
          <div className='flex flex-row gap-7 justify-center mt-8'>
         <CTAButton active={true} linkto={"/signup"}>
            Learn More
         </CTAButton>
         <CTAButton  active={false} linkto={"/login"}>
           Book a Demo
         </CTAButton> 
       
          </div >
          <div className='shadow-blue-200 mx-3 my-12'>
          <video  muted loop autoPlay>
            <source src={Banner} type="video/mp4"/>
          </video >
          </div>
          {/* Code Section 1 */}
         <div>
            <CodeBlocks position={"lg:flex-row"} heading={
                <div className='text-4xl font-semibold'>
                    Unlock Your <HighlightText text={"coding potential"}/> with online courses
                    </div>
            } subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            ctabtn1={
                {
                btnText: "try it yourself",
                linkto:"/signup",
                active:true,
                }
            }
            ctabtn2={
                {
                btnText: "learn more",
                linkto:"/login",
                active:false,
                }
            }
            codeblock={`<!DOCTYPE html>
                <html>
                head<title>Example</
                title><linkrel="stylesheet"href="styles.css">
                /head>
                body>

                `}
                codeColor={"text-yellow-25"}
            
            />
                 <ExploreMore/>
         </div>
       
        </div>
        {/* section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700 '>
          <div className='homepage_bg h-[310px]'>
            <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between  gap-5 mx-auto  '>
            <div className='h-[150px]'>

            </div>
            <div className='flex flex-row gap-7 text-white'>
              <CTAButton active={true} linkto={"/signup"}>
              <div className='flex items-center gap-3'>
                Explore Full Catalog
                <FaArrowRight/>
              </div>
              

              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
              <div className='flex items-center gap-3'>
               Learn More
                <FaArrowRight/>
              </div>
              </CTAButton>



            </div>

            </div>
         
          </div>

            {/* Section2 */}
           <div className='mx-auto w-11/12 max-w-maxContent flex flex-col gap-7 items-center justify-between '>


            <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
              <div className='text-4xl font-semibold w-[45%]'>
                Get the skills you need for
                <HighlightText text="Job that is in demand "/>
              </div>
              
            <div className='w-[40%] flex flex-col gap-10 items-start'>
              <div className='text-[16px]'>
              The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>
                Learn More
                </div>
              </CTAButton>
            </div>
           </div>
           <TimelineSection/>
           <LearningLanguageSection/>
          </div>  
        </div>


        {/* section3 */}
        <div className='w-[11/12] flex  mx-auto max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white '>
           <InstructorSection/>
           <h2 className='text-center text-4xl font-semibold mt-10'>Review from other learners</h2>
           {/* ReviewSlider */}
        <div>
        </div>
      
          
          
          </div>
          <Footer/>

    </div>
  )
}


export default Home
