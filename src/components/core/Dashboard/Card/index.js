export default function Cart(){
    const {total,totalItems}= useSelector((state)=>state.auth);
    return (
        <div className="text-white">
        <h1>Your Cart</h1>
        <p> {totalItems} Courses in cart</p>
        {total>0
        ?(<div>
         <RenderCartCourses/>
         <RenderTotalAmount/>
        </div>):(<div>

        </div>)}
        </div>
    )
}