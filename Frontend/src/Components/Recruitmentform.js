import React from 'react'
import { Navigate } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import { useState,useEffect } from 'react';
import { AiFillHome } from "react-icons/ai";
import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { ToastContainer , toast } from 'react-toastify';

function Recruitmentform()  {
  const[Gotohomepage,setGotohomepage] = useState(false);
  const[name,setName] = useState("")
  const[number,setNumber] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[gotoOtppage,setGotoOtppage] = useState(false);
  var app;

  useEffect(() => {
    if(!firebase.apps.length){
      console.log("here")
      app = firebase.initializeApp(firebaseConfig);
      }
      else
      {
       app =  firebase.app();
       console.log(firebase.apps.length)
        console.log("not here")
      }
   },[firebaseConfig]);

   var firebaseConfig = {
    apiKey: "AIzaSyB0jHNMjt5JhaiDMNY5zyVLemZ85IpsdxU",
    authDomain: "otp-function-f1bf6.firebaseapp.com",
    projectId: "otp-function-f1bf6",
    storageBucket: "otp-function-f1bf6.appspot.com",
    messagingSenderId: "158018589085",
    appId: "1:158018589085:web:9e919de6ca149332215f74"
  };
 var res;

  const configurecaptcha = () => 
  {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': (response) => {
     handleSubmit();
    } 
  });
}

  if(Gotohomepage)
  {
   return <Navigate to="/" />
  }

  if(gotoOtppage)
  {
    return <Navigate to="/otpinput"/>
  }

  const deleterecruiter = async()=>{

    res = await axios.post('http://localhost:4000/deleterecruiter', {
      number:number,
  });
      console.log(res)
  }

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

  const handleSubmit = async(e) =>{
     e.preventDefault();
     if(validate(name,email,number,password)){
      console.log("validated")
        res = await axios.post('http://localhost:4000/insertrecruiter', {
        name:name,
        number:number,
        email:email,
        password:password,
    })
    console.log(res)
   }
   if(res.data.success === false)
   {
    toast.error("User already exists",{styles})
   }
   else{
     configurecaptcha();
    const phoneNumber = "+91" + number;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
    window.confirmationResult = confirmationResult;
    console.log("Sent otp");
    setGotoOtppage(true)
  }).catch((error) => {
    console.log("Otp not sent")
    toast.error("Incorrect number",{styles})
    deleterecruiter();
  });
}
  }
  const validate = (name,email,number,password)=>{
     const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
     const regex2 = /^[0-9]{10}$/;
     var re = {
      capital: /(?=.*[A-Z])/,
      length: /(?=.{8,12}$)/,
      specialChar: /[ -\/:-@\[-\`{-~]/,
      digit: /(?=.*[0-9])/,
  };
     if(!name){
      toast.error("Name is required",{styles})
      return false
     }
     if(!number){
      toast.error("Number is required",{styles})
      return false
     }
     if(!email){
      toast.error("Email is required",{styles})
      return false
     }
     if(!password)
     {
      toast.error("Password is required",{styles})
      return false
     }
     if(email){
     if(!regex.test(email))
     {
      toast.error("Invalid Email",{styles})
      return false
     }
    }
     if(number > 0){
     if(!regex2.test(number))
     {
      toast.error("Invalid Number",{styles})
      return false
     }
    }
     if(!re.capital.test(password))
    {
       toast.error("Use atleast one capital letter",{styles})
       return false
    }
     if(!re.length.test(password))
    {
       toast.error("Length must be between 8 and 12",{styles})
       return false
    }
     if(!re.specialChar.test(password))
    {
        toast.error("Use atleast one special character",{styles})
        return false
    }
     if(!re.digit.test(password))
    {
        toast.error("Use atleast one digit",{styles})
        return false
    }
    return true
 
  }
  return (
    
      <div id = "recruitform1" class ="h-screen w-screen font-sans bg-gray-500">
        <div id = 'sign-in-button'></div>
          <AiFillHome  onClick={() => {setGotohomepage(true)}}
        class="cursor-pointer h-auto w-12 mx-10 py-4 "
        >
        </AiFillHome>
        <div class="py-24">
       <Form onSubmit={handleSubmit} >
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
       <div class="flex-row space-y-7
         box-content h-auto w-80
         mx-auto
          px-10 border-4 border-slate-900
          py-6 bg-zinc-200">
        <p id = "signup" class="text-center font-serif font-semibold">Registration</p>
        <div class="mx-7 my-4">
       <Form.Field>
        <input type="text" 
        placeholder='Name' 
        name='name' 
        autoFocus
        class="px-2 box-border border-2 border-cyan-700 text-lg w-64 h-10 "
        value={name}
        onChange={(e)=>{setName(e.target.value)}}/>
        </Form.Field>
        </div>
        <div class="mx-7 my-4">
        <Form.Field>
        <input type="text" 
        placeholder='Phone No.' 
        class="px-2 box-border border-2 border-cyan-700 text-lg w-64 h-10 "
        name='number' 
        value={number}
        onChange={(e)=>{setNumber(e.target.value)}}/>
        </Form.Field>
        </div>
        <div class="mx-7 my-4">
        <Form.Field>
        <input type="text"
         placeholder='E-mail'
          name='email' 
          class="px-2 box-border border-2 border-cyan-700 text-lg w-64 h-10 "
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}/>
        </Form.Field>
        </div>
        <div class="mx-7 my-4">
        <Form.Field>
        <input type="password"
         placeholder='Password'
          name='password' 
          class="px-2 box-border border-2 border-cyan-700 text-lg w-64 h-10 "
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}/>
        </Form.Field>
        </div>
       
        <div class="flex-1 content-center">
        <input type="submit" id = "subbutton"
        class="border-2 px-5 border-cyan-700 hover:text-white hover:bg-cyan-700 mx-24 cursor-pointer"
        ></input>
       </div>
        </div>
        </Form>
        </div>
       {/* <button id ="subbutton" onClick={()=>{console.log("Submit called")}}>Submit</button> */}
        {/* <Button id = "home" onClick={() => {setGotohomepage(true)}}>Home</Button> */}
    </div>
  )
}
export default Recruitmentform