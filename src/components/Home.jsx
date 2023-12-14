import React, { useContext } from 'react'
import Login from './Login';
import { AppContext } from '../contextAPI/AppContext';
import Register from './Register';
export const Home = () => {
  const {form} = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-2 py-10 bg-gray-300 h-screen'>
      <h1 className='font-bold text-3xl mb-5 '>Jala Academy</h1>
      <h2 className=' text-3xl capitalize'>Login credentials </h2>
      <h3>Email : training@jalaacademy.com</h3>
      <h3>Password : jobprogram</h3>
      <div className='w-1/2 bg-white p-5'>
        {
          form === "login" ? <Login></Login> : <Register/>
        }
        
      </div>
    </div>
  )
}
export default Home;