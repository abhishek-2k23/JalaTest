import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PasswordUpdate from "./components/PasswordUpdate";
import { Outlet, createBrowserRouter } from "react-router-dom";
import ValidateOTP from "./components/ValidateOTP";
import ChangePassword from "./components/ChangePassword";

function App() {

  return (
    <div className="text-center">
      <Outlet/>
    </div>
  );
}

export const approuter = createBrowserRouter([{
    path : "/",
    element : <App/>,
    children : [
      {
        path : '/',
        element : <Home/>
      },
      {
        path : '/login',
        element : <Login/>
      },
      {
        path : '/register',
        element : <Register/>
      },
      {
        path : '/passwordUpdate',
        element : <PasswordUpdate/>
      },
      {
        path : '/validateOTP',
        element : <ValidateOTP/>
      },
      {
        path : '/changePassword',
        element : <ChangePassword/>
      },
    ]
  }])

export default App;