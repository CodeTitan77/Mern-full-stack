import "./App.css";
import {Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import MyProfile from "./components/core/Dashboard/MyProfile" ;
import EnrolledCourses from "./components/core/Dashboard/Settings/EnrolledCourses";

<Route
  path="login"
  element={
   <Login/>
  }
  />
function App() {
  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>
  <Routes>
    <Route path="/" element= {<Home/>}/>
    <Route path="/About" element ={<About/>}/>
    <Route path="/dashboard" element ={<Dashboard/>}/>
    <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>} />
  </Routes>
  
   </div>
  );
}

export default App;
