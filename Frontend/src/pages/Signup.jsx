import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://event-management-backend-pxns.onrender.com/api/users/register",
        newUser
      );

      if (response.status === 201) {
        const data = response.data;

        setUser(data.user);
        localStorage.setItem("token", data.token);

        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-4">What's your Name</h3>
          <div className="flex gap-4 mb-6">
            <input
              required
              className="bg-[#eeeeee] w-full rounded px-4 py-2 border text-base placeholder:text-sm"
              type="text"
              placeholder="User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <h3 className="text-lg font-medium mb-4">What's your Email</h3>
          <input
            required
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-lg font-medium mb-4">Enter Password</h3>

          <input
            required
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?
          <Link to="/login" className="text-blue-600">
            {" "}
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
