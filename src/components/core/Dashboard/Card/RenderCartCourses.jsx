import React from 'react'
import { GiNinjaStar } from "react-icons/ci";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

const RenderCartCourses = () => {
    const {cart}= useSelector((state)=>state.cart);
    const dispatch = useDispatch();
  return (
    <div>
      {
        cart.map((course,index)=>{
            <div>
                <div>
                    <img src={course?.thumbnail}/>
                    <div>
                        <p>{course?.courseName}</p>
                        <p>{course?.category?.name}</p>
                        <div>
                            Ratings..
                            <ReactStars
                            count={5}
                            size={20}
                            edit={false}
                            activeColor="#ffd700"
                            emptyIcon={<GiNinjaStar/>}
                            fullIcon={<GiNinjaStar/>} 

                            />
                            <span>{course?.ratingAndReviews?.length} Rating</span>
                        </div>
                    </div>
                     <button onClick={()=>dispatch(removeFromCart(course?._id))}>
                        <RiDeleteBin6Line/>
                        <span>Remove</span>

                     </button>

                    </div>
                     <div>
                        
                        
                        </div>
                </div>
        })
      }
    </div>
  )
}

export default RenderCartCourses
