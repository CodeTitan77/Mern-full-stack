import React from 'react'
import HighlightText from './../components/core/Homepage/HighlightText';
import BannerImage1 from "../assets/Images/aboutus2.webp"
import BannerImage2 from "../assets/Images/aboutus3.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from './../components/core/AboutPage/Quote';


const About = () => {
  return (
    <div className='mt-[100px] text-white'>
        <section>
            <div>
                <header>
                    Driving Innovation in Online Education for  <HighlightText text={"Brighter Future"}/>
                </header>
                <div className='flex gap-x-3 mx-auto'>
                    
                <img src={BannerImage1}></img>
                <img src={BannerImage2}></img>
                <img src={BannerImage3}></img>
                </div>
     

            </div>
         
        </section>
        {/* section2 */}
        <section>
            <div>
                <Quote/>
            </div>

        </section>
      
    </div>
  )
}

export default About

