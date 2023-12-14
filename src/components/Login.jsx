import { useForm} from "react-hook-form";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AppContext } from "../contextAPI/AppContext";


export default function Login() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate();

  const {setLoggedIn,setUser,setForm} = useContext(AppContext);

  const submitHandler = async (loginData) => {
    
    console.log(loginData)
    try{
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`,{
        method : "post",
        headers : {"content-type" : "application/json"},
        body : JSON.stringify(loginData)
      })
      const result = await res.json();
      console.log(result);

      if (res.status === 200) {
        setLoggedIn(true);
        setUser(JSON.stringify(result.user));
        localStorage.setItem("user",JSON.stringify(result.user));
        console.log(JSON.parse(localStorage.getItem('user')));  
        setForm("userData");
        navigate("/");
      } else if (res.status === 404) {
        setLoggedIn(false);
      } else {
        setLoggedIn(false);
      }

    }catch(err){
      console.log(err);
    }
  }


  return (
    <div className="w-full bg-white ">
      <h1 className="mb-5">Sign in</h1>
    <form onSubmit={handleSubmit(submitHandler)}>
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
        <p className="underline italic font-light " onClick={() => setForm("register")}>Register</p>
      </div>
      
    </div>
  )
}