import { useForm} from "react-hook-form";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AppContext } from "../contextAPI/AppContext";
import toast from 'react-hot-toast';

export default function Register() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate();

  const {setLoggedIn,setForm} = useContext(AppContext);

  const submitHandler = async (loginData) => {
    let toastid;
    console.log(loginData)
    try{
      toastid = toast.loading("wait");
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`,{
        method : "POST",
        headers : {"content-type" : "application/json"},
        body : JSON.stringify(loginData)
      })
      const result = await res.json();
      console.log(result);
      if (res.status === 200) {
        toast.success("you are registered.",{id : toastid})
        setForm("login");
      } else if (res.status === 404) {
        toast.error(result.message,{id : toastid})
        setLoggedIn(false);
      } else {
        toast.error(result.message,{id : toastid})
        setLoggedIn(false);
      }

    }catch(err){
      toast.error(err.message,{id : toastid})
      console.log(err);
    }
  }


  return (
    <div className="w-full bg-white ">
      <h1 className="mb-5">Register</h1>
    <form onSubmit={handleSubmit(submitHandler)}>
    <div>
        <input {...register("Name")} type="text" placeholder="Name" className="w-full px-2  py-1 border border-gray-500 my-2"/>
      </div>
      <div>
        <input {...register("Email")} type="email" placeholder="Email" className="w-full px-2  py-1 border border-gray-500"/>
      </div>
      <div>
        <input {...register("Password" )} type="text" placeholder="password"  className="w-full px-2 my-2  py-1 border border-gray-500"></input>
      </div>
      
      <input type="submit" value={"sign in"} className="w-full py-2 bg-sky-500 text-white"/>
    </form>
    <div className="flex gap-4 justify-center mt-2">
        <p className="underline italic font-light " onClick={() => navigate("/passwordUpdate")}>forgot password</p>
        <p className="underline italic font-light " onClick={() => {setForm("login"); console.log("login")}}>login</p>
      </div>
    </div>
  )
}