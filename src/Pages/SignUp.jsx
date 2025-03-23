import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [counterName, setCounterName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "fullName") setFullName(value);
    else if (name === "counterName") setCounterName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userInfo) => {
        userInfo.user.displayName = fullName;
        userInfo.user.counterName = counterName;
        toast.success("Account created successfully!");
        navigate("/bookingpage");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="signUpPage h-screen w-full bg-cover bg-center flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Agent Sign Up
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your full name"
              value={fullName}
              onChange={handleInput}
              required
            />
          </div>
          <div>
            <label
              htmlFor="counterName"
              className="block text-sm font-medium text-gray-700"
            >
              Counter Name
            </label>
            <input
              type="text"
              id="counterName"
              name="counterName"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your counter name"
              value={counterName}
              onChange={handleInput}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
              value={email}
              onChange={handleInput}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
              value={password}
              onChange={handleInput}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <span className="text-blue-600 hover:underline" onClick={() => navigate('/')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
