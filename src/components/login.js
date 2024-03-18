import { useEffect, useState } from "react";

function Login() {
 
  return (
  
<div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-200 py-6 sm:py-12">
  <div className="relative py-3 sm:w-1/3 mx-auto text-center">
    <span className="text-2xl font-bold ">Login to your account</span>
    <div className="mt-4 bg-white shadow-md rounded-lg text-left">
      <div className="h-2 bg-blue-700 rounded-t-md"></div>
      <h3 className="font-bold py-3 text-lg"><center>Generate your Report</center></h3>
      <div className="px-8 py-6 ">
        <label className="block font-semibold"> Username or Email </label>
        <input type="text" placeholder="Email" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"/>
        <label className="block mt-3 font-semibold"> Password </label>
        <input type="password" placeholder="Password" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"/>
          <div className="flex justify-between items-baseline">
            <button type="submit" className="mt-16 ml-28 bg-blue-700 text-white py-3 px-24 rounded-md hover:bg-blue-500 "><a href="{}">Login</a></button>
            {/* <br></br><a href="#" className="text-sm hover:underline">Forgot password?</a> */}
          </div>
      </div>
      
  </div>
</div>
  </div>
  );
}

export default Login;
