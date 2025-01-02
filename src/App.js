import "./App.css";
import {Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import MyProfile from "./components/core/Dashboard/MyProfile" ;

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
    <Route path="/" element ={<Dashboard/>}/>
  </Routes>
  
   </div>
  );
}

export default App;
