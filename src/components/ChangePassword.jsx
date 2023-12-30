// This component to update the new passoword
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../contextAPI/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const { register, handleSubmit } = useForm();
  const { email,setForm } = useContext(AppContext);
  const navigate = useNavigate();

  //function to handle the change password
  const submitHandler = async (data) => {
    //for toast 
    let toastid;
    try{
      //loading toast
      toastid = toast.loading("Updating...")

      //send POST req to change the passoword with data
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}resetPassword`,{method:"POST",headers :  {"content-type" : "application/json"},body : JSON.stringify(data)});

      //convert response to json data
      const result = await res.json();

      //if Password changed successfully
      if(result.status){
        setForm("login");
        navigate("/");
        toast.success(result?.message,{id : toastid});
      }else{
        //If passoword not changed 
        toast.error(result?.message,{id : toastid});
      }
    }catch(err){
      //if any error occur in requesting to change the password
      toast.error(err?.message,{id : toastid});
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center py-5 h-screen bg-slate-300 w-full">
      <h1 className="text-lg font-bold tracking-wider"> Change Password</h1>

      <div className="bg-white w-3/4 md:w-1/2  p-5">

        {/* form to get the email, old password and new Password  */}
      <form onSubmit={handleSubmit(submitHandler)}>
        <input
          type="text"
          value={email.Email}
          {...register("Email")}
          className="border border-gray-500 w-full px-2 py-1 my-2"
        />
        <input
          type="text"
          placeholder="New Password"
          {...register("Password")}
          className="border border-gray-500 w-full px-2 py-1 my-2"
        />
        <input
          type="text"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          className="border border-gray-500 w-full px-2 py-1 my-2"
        />

        {/* submit button */}
        <input type="submit" value={"Change Password"} 
          className="bg-sky-400 w-full px-2 py-1 my-2"/>
      </form>

      {/* Home tab link  */}
      <p className="italic underline cursor-pointer " onClick={() => {navigate("/")}}>Home</p>
        </div>
    </div>
  );
};

export default ChangePassword;
