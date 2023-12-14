import { useState } from "react";
import { createContext } from "react";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [loggedin, setLoggedIn] = useState(false);
    const [user,setUser] = useState(null);
    const [form,setForm] = useState("login");

    const value = {
        loggedin,setLoggedIn,
        user,setUser,form ,setForm
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}; 
export default AppContextProvider;
