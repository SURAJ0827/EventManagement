import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const sumbitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://event-management-backend-pxns.onrender.com/api/users/login",
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Invalid email or password");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <form onSubmit={sumbitHandler}>
          <h3 className="text-lg font-medium mb-4">What's your Email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-4">Enter Password</h3>
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="password"
            placeholder="Password"
          />

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm">
            Login
          </button>
        </form>
        <p className="text-center">
          New here?
          <Link to="/signup" className="text-blue-600">
            {" "}
            Create new Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
