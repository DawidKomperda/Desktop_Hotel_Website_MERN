import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./login.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";


const Login = () => {
    const [ credentials, setCredentials ] = useState({ username: undefined , password: undefined });
    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    }

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post('http://localhost:8800/api/auth/login', credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate("/");
        } catch ( err ) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    }
  return (
    <div className="login">
        <div className="lContainer">
            <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
            <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
            <button disabled={loading} className="lButton" onClick={handleLogin}>Login</button>
            {error && <span className="failure">{error.message}</span>}
        </div>
    </div>
  )
}

export default Login