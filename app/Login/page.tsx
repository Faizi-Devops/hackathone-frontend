"use client"
import { Field, Formik, useFormik } from "formik";
import { useState } from "react";
import Link from 'next/link'
import * as Yup from "yup";
import { useRouter } from 'next/navigation'

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [flag, setFlag] = useState(false);
  const router = useRouter()
 
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };
  const formik = useFormik({
    initialValues: {
      userEmail: "",
      userPassword: "",
    },
    validationSchema: Yup.object({
      userEmail: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),

      userPassword: Yup.string()
        .required("Password is required")
        
        
    }),
    onSubmit: async (values) => {
      const { userEmail, userPassword } = values;
      

      
      setFlag(true);
      try {
        const response = await axios.post("http://localhost:4000/user/login", {
          email: userEmail,
          password: userPassword,
        });

        if (response.data.status === "success") {
          toast.success(response.data.message);
          const { Token, UserName, email,userid } = response.data;
          localStorage.setItem("usertoken", Token);
          localStorage.setItem("name", UserName);
          localStorage.setItem("email", email);
          localStorage.setItem("id",userid)
          // Display success toast and navigate to Dashboard
          
          setFlag(false);
          router.push("/Dashboard")
          
        } else {
          // Display error toast for unsuccessful login
          console.log("else part");
          setFlag(false);

          toast.error(response.data.message);
        }
      } catch (error:any) {
        // Handle errors (e.g., display a generic error message)
        console.error(error);
       toast.error(error.response.data.message);
        setFlag(false);
      }
    },

    // Function to display toast notifications
  });

  return (
    <div className="flex justify-center items-center h-screen px-[1rem]">
      <ToastContainer />
      <div className="block max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center pb-2">
          Login
        </h5>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            id="first_name"
            className={`bg-gray-50 mt-3 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none dark:bg-gray-700 dark:text-white dark:focus:outline-none dark:placeholder-gray-400 ${
              formik.touched.userEmail && formik.errors.userEmail
                ? "border-red-500" // Apply red border only when there's an error
                : "border-gray-300 focus:border-gray-300" // Default and focus border colors
            }`}
            name="userEmail"
            value={formik.values.userEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email......."
          ></input>
          {formik.touched.userEmail && formik.errors.userEmail ? (
            <div className="text-red-500 text-xs">
              {formik.errors.userEmail}
            </div>
          ) : null}
          <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        id="userPassword"
        name="userPassword"
        value={formik.values.userPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`bg-gray-50 mt-3 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none dark:bg-gray-700 dark:text-white dark:focus:outline-none dark:placeholder-gray-400 ${
          formik.touched.userPassword && formik.errors.userPassword
            ? 'border-red-500'
            : 'border-gray-300 focus:border-gray-300'
        }`}
        placeholder="Password......."
      />
      <button
        type="button"
        className="absolute inset-y-0 right-2 flex items-center"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
          {formik.touched.userPassword && formik.errors.userPassword ? (
            <div className="text-red-500 text-xs">
              {formik.errors.userPassword}
            </div>
          ) : null}
          
            <div className="text-end text-sm pt-3 ">
              <span>
                <span className="hover:cursor-pointer"><Link href="/Register">Register</Link></span>
              </span>
            </div>
          
          <div className="text-center pt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              disabled={flag}
            >
              {flag ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;