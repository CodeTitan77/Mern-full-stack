import React from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath, useLocation } from 'react-router-dom';
import { NavbarLinks } from './../../data/navbar-links';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDown from './../core/Auth/ProfileDropDown';
// import { apiConnector } from '../../services/apiconnector';
import { useState } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

const sublinks=[
  {
    title:"Python",
    link:"/catalog/python"
  },
  {
    
      title:"web dev",
      link:"/catalog/webdev"
    

  }
]
const Navbar = () => {
    const{token}= useSelector((state)=>state.auth);
    const{user}= useSelector((state)=>state.profile);
    const{totalItems}= useSelector((state)=>state.cart);

    const location = useLocation();

    // const [subLinks,setSubLinks]=useState([]);
    // useEffect(()=>{
    //   async()=>{
    //     try{
    //     const result =await apiConnector("Get",categories.CATEGORIES_API);
    //     setSubLinks(result.data.data);
    //     }
    //     catch(error){
    //       console.log("could not fetch categorly list");

    //     }

    //   }

    // },[])
    const matchRoute = (route)=>{
        return matchPath({path:route} ,location.pathname);
    } // location.pathname current url in the browser 
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between '>
      <Link to="/">
       <img src={logo} width={160} height={42} loading='lazy'/>
      </Link>
      {/* navtags */}
      <nav>
        <ul className='flex gap-x-6 text-richblack-25'>
            {
                NavbarLinks.map((link,index)=>(
                    <li key={index}>
                        {
                            link.title==="Catalog"? (<div className='flex items-center gap-2'>
                              <p>
                                {link.title}
                                <IoIosArrowDropdownCircle/>
                              </p>
                      
           
                            </div>):(
                                <Link to= {link?.path}>
                                    <p className={`${matchRoute(link?.path)?"text-yellow-25":"ring-richblack-25"}`}>
                                      {link.title}  
                                    </p>
                                </Link>

                            )


                        }

                    </li>
                ))

            }
           
        </ul>
      </nav>

      {/* loginsignin  */}
      <div className='flex items-center gap-x-4'>
        {
          user && user?.accountType !="Instructor" && (
            <Link to="/dashboard/cart" className='relative'>
              <AiOutlineShoppingCart />
              {
                totalItems>0 && (
                  <span>
                     {totalItems}
                    </span>
                )
              }
            </Link>
          )
        }
        {
          token===null && (
            <Link to="/login">
              <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[12x] text-richblack-100 rounded-md' >
                Log in 
              </button>
            </Link>

          )
        }
        {
          token===null && (
            <Link to="/signup" className='border border-richblack-700 bg-richblack-800 px-[12px] py-[12x] text-richblack-100 rounded-md'>
              <button>
                Sign up
              </button>
            </Link>

          )
        }
        {
          token!==null && <ProfileDropDown/>

        }
        

      </div>

      </div>
    </div>
  )
}

export default Navbar

