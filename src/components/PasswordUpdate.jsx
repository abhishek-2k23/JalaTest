//This component will take email from the user and submit it to validate the email and get the OTP to the email
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contextAPI/AppContext";
import toast from "react-hot-toast";

const PasswordUpdate = () => {
  const { register, handleSubmit } = useForm();
  const Navigate = useNavigate();
  const { setForm, setEmail } = useContext(AppContext);

  //Getting OTP
  const submitHandler = async (data) => {
    let toastid;
    try {
      setEmail(data);
      toastid = toast.loading("Sending OTP");

      //request to validate email and getOTP
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}generateOTP`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      
      //if get the otp successfully swith the user to validate otp component
      if (result.status) {
        toast.success(result.message, { id: toastid });
        console.log("navigated to validOTP");
        Navigate("/validateOTP");
      } else {

        //if any error occur
        toast.error(result.message, { id: toastid });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message, { id: toastid });
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center gap-2 py-5">
      <h1 className="text-2xl font-bold tracking-wider">Forgot Password</h1>

      <div className="w-1/2 bg-white p-5">

        {/* //form to get the email */}
        <form onSubmit={handleSubmit(submitHandler)}>
          <input
            type="email"
            {...register("Email")}
            placeholder="Enter your email"
            className="border border-gray-500 w-full px-2 py-1 my-2"
          />
          <input
            type="submit"
            value={"Get OTP"}
            className="w-full py-2 bg-sky-500"
          />
        </form>

        {/* links to go back to login page or home page  */}
        <p
          className="text-blue-500 underline"
          onClick={() => {
            
              setForm("login");
              Navigate("/");
            
          }}
        >
          Back
        </p>
      </div>
    </div>
  );
};

export default PasswordUpdate;
