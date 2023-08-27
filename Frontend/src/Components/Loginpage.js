import useAuth from '../hooks/useAuth'
import React from 'react'
import { Form } from 'semantic-ui-react'
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import 'firebase/compat/auth';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Loginpage(){
 

    const[Gotohomepage,setGotohomepage] = useState(false);
    const[showPassword,setShowPassword] = useState("password")
    const[Gotorecruitpage,setGotorecruitpage] = useState(false);
    const[number,setNumber] = useState("")
    const[password,setPassword] = useState("")

    const styles = {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    }

    const { setAuth } = useAuth();
    const navigate = useNavigate();

  if(Gotorecruitpage)
  {
    return <Navigate to="/home" />
  }
    if(Gotohomepage)
  {
   return <Navigate to="/title" />
  }


  const validate = (values) =>{
     if(!number)
     {
      toast.error("Number is required",{styles})
      return false
     }
     if(!password)
     {
      toast.error("Password is required",{styles})
      return false
     }
     return true
  }
  
    const onSignInSubmit = async(e) =>
    {
      e.preventDefault();
      if ((validate(number,password))){
        const res = await axios.post('http://localhost:4000/checkuserexists',
          {
            number:number,
            password:password
          },
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
        console.log(res.data);
        if (res.data.success === false){
         toast.error("Invalid Number or Password",{styles});
        } else {
          // localStorage.setItem("user", JSON.stringify(res.data.user));
          const accessToken = res?.data?.accessToken;
          setAuth({ number, password , accessToken });
          if(res.data.typeuser === "intern"){
          setGotorecruitpage(true)
          }
          else
          {
            navigate('/recruiterhome')
          }
        }
      } 
    }

    
    const handlepassword = ()=>{
      if(showPassword === "password")
      {
        setShowPassword('text')
        document.getElementById("eye").style.display = 'none'
        document.getElementById("hiddeneye").style.display = 'flex'
      }
      else
      {
        setShowPassword('password')
        document.getElementById("eye").style.display = 'flex'
        document.getElementById("hiddeneye").style.display = 'none'
      }
    }
   
  return (
      <div class=" bg-gray-500 font-sans">
       <div  
        class="bg-gray-500 text-gray-500 h-auto w-12 mx-12 py-2 focus:ring-2 focus:ring-inset focus:ring-white"
        >sr
        </div> 
        <div id = "loginpage1" class="min h-screen w-screen items-center justify-center flex bg-gray-500">
        <div class="md:py-20 py-16 flex max-w-3xl md:p-8 p-3 mb-32  items-center bg-zinc-200 shadow-lg shadow-slate-900">
        {/* <div id = 'sign-in-button'></div> */}
        <div class="md:w-1/2 px-8 md:px-6">
        <h2 class="font-bold font-sans text-3xl text-[#002D74] text-center md:flex">Login</h2>
        <Form id="loginform1" class="flex flex-col gap-2">
        <ToastContainer
      position="top-center"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
        <Form.Field>
        <input type = "text" 
        placeholder='Mobile No.'
        class="p-2 mt-8 rounded-xl border text-xl w-72 h-12"
        name='number'
        value={number}
        onChange={(e)=>{setNumber(e.target.value)}}></input>
        </Form.Field>
        <div class="relative">
        <Form.Field>
        
            <input type={showPassword}
            placeholder ="Password"
              class="p-2 mt-8 rounded-xl border text-xl w-72 h-12"
              name='password'
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}></input>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" onClick={handlepassword} id = "eye"
            fill="gray" class="bi bi-eye absolute cursor-pointer -bottom-0.5 right-3 -translate-y-1/2" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id ="hiddeneye" style ={{display:'none'}}
            onClick={handlepassword} fill="currentColor" class="bi bi-eye-slash absolute cursor-pointer -bottom-0.5 right-3 -translate-y-1/2" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg>
          </Form.Field>
          </div>
          <button id = "subbutton" 
          class="bg-[#002D74] 
          rounded-xl text-white 
          hover:scale-105 
          w-72
          font-semibold
          my-8 text-2xl
          h-12
          duration-300"
          onClick={onSignInSubmit}>Login</button>
            </Form>
            <div class=" grid grid-cols-3 items-center text-gray-400">
          <hr class="border-gray-400" />  
          <p class="text-center text-sm">OR</p>
          <hr class="border-gray-400" /> 
        </div>  
        <button class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
        <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
        </svg>
        Login with Google
      </button>
      <div class="mt-5 text-sm  py-2 text-[#002D74]">
        <p class="cursor-pointer">Forgot password?</p>
        <p class="text-md font-semibold text-black text-center my-3">Not a user? <span onClick={()=>{setGotohomepage(true)}} class="cursor-pointer hover:underline hover:text-slate-600">Sign up!</span></p>
      </div>
         </div>
       <div>
        <img src = {require('./login2.png')} alt='not loading'
        class="md:h-fit h-0"></img>
       </div>
       </div>
    </div>
    </div> 
  )
 
}
export default Loginpage
