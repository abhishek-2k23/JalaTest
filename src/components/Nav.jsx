import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../contextAPI/AppContext';
const Nav = () => {
    const navigate = useNavigate();
    const {loggedin,setLoggedIn,setForm} = useContext(AppContext);
    console.log(loggedin);
  return (
    <div className='flex gap-5 p-4 justify-evenly'>
        {/* title  */}
        <div>
            <p>Jala Academy</p>
        </div>
        {/* menu  */}
        <div>
            <span onClick={() => navigate("/")}>DashBoard</span>
        </div>
        {/* buttons  */}
        <div className='space-x-5'>{
            !loggedin ? <span onClick={() => {navigate("/login");}} className='px-3 py-2 border cursor-pointer'>Login </span> : <span onClick={() => {setForm("login"); setLoggedIn(false)}} className='px-3 py-2 border cursor-pointer'>Logout </span>
        }
            
            <span onClick={() => setForm("register")} className='px-3 py-2 border cursor-pointer' >Register</span>
        </div>
    </div>
  )
}

export default Nav;