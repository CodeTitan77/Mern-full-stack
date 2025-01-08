import React from 'react'

export const RenderTotalAmount = () => {
    const {total,cart}= useSelector((state)=>state.cart);
    const handleBuyCourse=()=>{
     const courses= cart.map((course)=>course?._id);
     console.log("Brought these courses",courses);
    
    }
  return (
    <div>
       <p>Total</p>
       <p>Rs{total}</p>
       <IconBtn text="Buy now" onClick={handleBuyCourse} customClasses={"w-full justify-center"}/>
        </div>
  )
}

