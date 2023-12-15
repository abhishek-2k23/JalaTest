import React, { useContext } from "react";
import Login from "./Login";
import { AppContext } from "../contextAPI/AppContext";
import Register from "./Register";
import Dashboard from "./Dashboard";
import toast from "react-hot-toast";

export const Home = () => {
  const { form } = useContext(AppContext);
  console.log(form);
  return (
    <div className="flex flex-col items-center gap-2 py-10 bg-gray-300 h-screen">
      <h1 className="font-bold text-3xl mb-5 ">Jala Academy</h1>

      {form === "userData" ? (
        <Dashboard />
      ) : (
        <div className="w-full flex flex-col items-center gap-2">
          <h2 className=" text-3xl capitalize">Login credentials </h2>
          <h3>Email : training@jalaacademy.com</h3>
          <h3>Password : jobprogram</h3>
          <div className="w-1/2 bg-white p-5">
            {form === "login" && <Login />}
            {form === "register" && <Register />}
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
