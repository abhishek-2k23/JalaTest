import React, { useContext, useState } from "react";
import { AppContext } from "../contextAPI/AppContext";
import { MdDelete } from "react-icons/md";
import { GrFormPreviousLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { form,setForm,user } = useContext(AppContext);
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();
  
  useState(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getallusers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const users = await res.json();
      
      setUserDetails(users.users);
    } catch (err) {
      console.log("Error : ", err);
    }
  }
  const deleteHandler = async (email) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/deleteuser`,
        {
          method: "delete",
          body: JSON.stringify(email),
        }
      );

      const result = await res.json();
      console.log(result);
      if (result.status) {
        fetchUsers();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full px-6 md:w-1/2">
      <p className="text-xl font-bold mb-3">Hi, {user.Name}</p>
      <div
        className="flex justify-between items-center -mb-5"
      >
        <div className="flex items-center gap-1" onClick={() => {setForm("login");toast("login page")}}>
          <span>
            <GrFormPreviousLink />
          </span>
          <span>Go Back</span>
        </div>
        <div className="text-blue-950 font-bold text-lg tracking-wider">
          All Users 
        </div>
        <div className="p-2 border bg-blue-900 rounded-md text-white" onClick={() => {setForm("register"); console.log("clicked in create : ",form); navigate("/")}}>
          create user
        </div>
      </div>
      <br />
      {/* table section  */}
      {userDetails.length === 0 ? (
        <div className="underline italic text-lg tracking-wide"> No User Available </div>
      ) : (
        <div className="flex flex-col mt-6 w-full">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal  text-center text-gray-500 dark:text-gray-400"
                      >
                        <span>Name</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {userDetails?.map((person) => (
                      <tr key={person.Name}>
                        <td className="py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {person.Name}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {person.Email}
                          </div>
                        </td>

                        <td className="py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          <div className="flex gap-10 justify-center">
                            <MdDelete
                              className="text-red-500 text-2xl"
                              onClick={() => deleteHandler(person?.email)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* table section end  */}
    </div>
  );
};

export default Dashboard;
