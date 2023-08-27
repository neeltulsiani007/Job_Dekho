import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const setAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.number ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default setAuth;