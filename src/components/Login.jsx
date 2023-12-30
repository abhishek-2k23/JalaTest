import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contextAPI/AppContext";
import toast from 'react-hot-toast';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { setLoggedIn, setUser, form, setForm } = useContext(AppContext);

  const submitHandler = async (loginData) => {

    let toastid;

    // console.log(loginData);
    try {
      toastid = toast.loading("login in process...")

      //send the login request
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}login`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(loginData),
      });

      //data converted to json
      const result = await res.json();

      //if login successful set userLoggedIn -> True
      if (res.status === 200) {
        setLoggedIn(true);

        //toast
        toast.success("login successfull",{id : toastid});

        //set user details in var and localstorage
        setUser(JSON.stringify(result.user));
        localStorage.setItem("user", JSON.stringify(result.user));

        //form status change for dashboard screen
        setForm("userData");

        //navigate to home
        navigate("/");
      } 
      // if any error in user login 
      else if (res.status === 404) {
        toast.error(result?.message, {id : toastid});

        setLoggedIn(false);
      } else {
        toast.error(result?.message, {id : toastid});
        setLoggedIn(false);
      }
    } catch (err) {
      toast.error(err?.message, {id : toastid});
      console.log(err);
    }
  };

  return (
    <div className="w-full bg-white ">
      <h1 className="mb-5">Sign in</h1>

      {/* //form to get the user data  */}
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <input
            {...register("Email")}
            type="email"
            placeholder="Email"
            className="w-full px-2  py-1 border border-gray-500"
          />
        </div>
        <div>
          <input
            {...register("Password")}
            type="text"
            placeholder="password"
            className="w-full px-2 my-2  py-1 border border-gray-500"
          ></input>
        </div>

        <input
          type="submit"
          value={"sign in"}
          className="w-full py-2 bg-sky-500 text-white"
        />
      </form>
      <div className="flex gap-4 justify-center mt-2">
        {/* link for forgot password  */}
        <p
          className="underline italic font-light "
          onClick={() => navigate("/passwordUpdate")}
        >
          forgot password
        </p>
        
        {/* link for register secreen  */}
        <p
          className="underline italic font-light "
          onClick={() => {
            setForm("register");
            console.log(form + " register");
          }}
        >
          Register
        </p>
        
        {/* link for Dashboard  */}
        <p
          className="underline italic font-light "
          onClick={() => {
            setForm("userData");
            console.log(form + "see users");
          }}
        >
          See Users
        </p>
      </div>
    </div>
  );
}
