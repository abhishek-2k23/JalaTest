import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contextAPI/AppContext";
import { useContext } from "react";
import toast from 'react-hot-toast';

const ValidateOTP = () => {
    const {register,handleSubmit} = useForm();
     const Navigate = useNavigate();
    const {email} = useContext(AppContext)
   
  //OTP validation
  const validateOTP = async (data) => {
        let toastid;
        try {
            console.log(data);
            toastid = toast.loading("validating....");
            const res = await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/otpValidate`,
              { method: "POST",
                headers : {"content-type" : "application/json"},
                body : JSON.stringify(data)
              }
            );
            const result = await res.json();
            console.log(result);
            if (result.status) {
              toast.success(result.message , {id : toastid});
              Navigate("/changePassword");
            }else{
              toast.error(result.message , {id : toastid});}
          } catch (err) {
            console.log(err);
            toast.error(err.message , {id : toastid});
          }
  };
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center gap-2 py-5">
      <h1 className="text-2xl font-bold tracking-wider">validate OTP</h1>

      <div className="w-1/2 bg-white p-5">
        <form onSubmit={handleSubmit(validateOTP)}>
          <input
            type="email"
            value={email?.Email}
            {...register("Email")}
            placeholder="Enter your email"
            className="border border-gray-500 w-full px-2 py-1 my-2"
          />
            <input
              type="number"
              {...register("OTP")}
              placeholder="Enter OTP"
              className="border border-gray-500 w-full px-2 py-1 my-2"
            />
            <input type="submit" value={"Validate OTP"} className="w-full py-2 bg-sky-500" />
          
        </form>

        <p className="text-blue-500 underline" onClick={() => Navigate("/passwordUpdate")}>
          Back
        </p>
      </div>
    </div>
  );
};

export default ValidateOTP;
