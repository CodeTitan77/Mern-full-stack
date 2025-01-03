import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const token= useSelector((state)=>state.auth);
    if(token!==null){
   return children
    }
    else{
        return <Navigate to="/login"/>
    }
  return (
    <div>
      
    </div>
  )
}

export default PrivateRoute
