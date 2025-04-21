import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import { LogIn, UserPlus } from "lucide-react";

const LoginRegister = () => {
  const { setIsLoggedIn } = useContext(AppContext);

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    const payload = isLogin
      ? { email: form.email, password: form.password }
      : { userName: form.username, email: form.email, password: form.password };

    try {
      const response = await axios.post(url, payload);

      if (isLogin) {
        console.log("Login response:", response.data);
        const { token, userId } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("id", userId.toString());
        navigate("/");
        setIsLoggedIn(true);
      } else {
        alert("Registration successful. Please login.");
        setIsLogin(true);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "An error occurred.";
      alert(msg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-8 rounded-2xl  w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          {isLogin ? (
            <>
              <LogIn className="inline-block w-12 h-12 text-blue-600" />
              {" Login"}
            </>
          ) : (
            <>
              <UserPlus className="inline-block w-12 h-12 text-blue-600" />
              {" Register"} {" Login"}
            </>
          )}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none "
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none "
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none "
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-blue-500 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
