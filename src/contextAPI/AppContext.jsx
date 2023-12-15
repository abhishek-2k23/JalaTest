import { useState } from "react";
import { createContext } from "react";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [loggedin, setLoggedIn] = useState(false);
    const [email,setEmail] = useState({});
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [form,setForm] = useState(localStorage.getItem("user") == null ? "login" : "userData");
    
    
    const value = {
        loggedin,setLoggedIn,
        user,setUser,form ,setForm,
        email,setEmail
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}; 
export default AppContextProvider;
