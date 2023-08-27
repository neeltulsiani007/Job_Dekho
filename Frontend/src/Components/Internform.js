import React from 'react'
import { Navigate } from 'react-router-dom';
import { Form} from 'semantic-ui-react';
import { useState , useEffect} from 'react';
import  axios from 'axios';
import { AiFillHome } from "react-icons/ai";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { ToastContainer , toast } from 'react-toastify';
import { getApp } from 'firebase/app';



function Internform(){
  const[name,setName] = useState("");
  const [age,setAge] = useState("");
  const [number,setNumber] = useState("");
  const [city,setCity] = useState("");
  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(false);
  const [skills,setSkills] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState("password");
  const[gotoOtppage,setGotoOtppage] = useState(false);
  const[Gotohomepage,setGotohomepage] = useState(false);
 var res;


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

 useEffect(() => {

   

  var firebaseConfig = {
    apiKey: "AIzaSyB0jHNMjt5JhaiDMNY5zyVLemZ85IpsdxU",
    authDomain: "otp-function-f1bf6.firebaseapp.com",
    projectId: "otp-function-f1bf6",
    storageBucket: "otp-function-f1bf6.appspot.com",
    messagingSenderId: "158018589085",
    appId: "1:158018589085:web:9e919de6ca149332215f74"
  };

  if(!firebase.apps.length){
    console.log("here")
    firebase.initializeApp(firebaseConfig);
    }
    else
    { 
      firebase.app().delete().then(function() {
        firebase.initializeApp(firebaseConfig);
      });
     console.log(firebase.apps.length)
      console.log("not here")
    }
    
 },[]);




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

  const handleSubmit = async (e) =>{
     e.preventDefault();
      setLoading(true)
    if(validate(name,age,skills,number,city,email,password)){
  
    res = await axios.post('http://localhost:4000/insertintern', {
      name:name,
      age:age,
      number:number,
      city:city,
      email:email,
      password:password,
      skills:skills
  });
      console.log(res.data.user)
    if(res.data.success === false)
    {
      setLoading(false)
      toast.error("User already exists",{
        styles
      })
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
    deleteintern();
  });
}
    }
    else
    {
      setLoading(false)
    }
  }
   
    const deleteintern = async()=>{

      res = await axios.post('http://localhost:4000/deleteintern', {
        number:number?.number,
    });
        console.log(res)
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
   
   

  const validate = (name,age,skills,number,city,email,password)=>{
 
     const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
     const regex2 = /^[0-9]{10}$/;
     var re = {
      capital: /(?=.*[A-Z])/,
      length: /(?=.{8,12}$)/,
      specialChar: /[ -/:-@[-`{-~]/,
      digit: /(?=.*[0-9])/,
  };

     if(!name){
      toast.error('Name is required',{styles});
      return false
     }
     else if(!number){
      toast.error('Number is required',{styles});
      return false
     }
     else if(!age){
      toast.error('Age is required',{styles});
      return false
     }
     else if(!city){
      toast.error('City is required',{styles});
      return false
     }
     else if(!email){
      toast.error('Email is required',{styles});
      return false
     }
     else if(!password)
     {
      toast.error('Password is required',{styles});
      return false
     }
     else if(email){
     if(!regex.test(email))
     {
      toast.error('Invalid Email',{styles});
      return false
     }
    }
     else if(number){
     if(!regex2.test(number))
     {
      toast.error('Invalid Number',{styles});
      return false
     }
    }
   
  if(!re.capital.test(password))
  {
     toast.error("Use atleast one capital letter in password",{styles})
     return false
  }
   if(!re.length.test(password))
  {
     toast.error("Length of password must be between 8 and 12",{styles})
     return false
  }
   if(!re.specialChar.test(password))
  {
      toast.error("Use atleast one special character in password",{styles})
      return false
  }
   if(!re.digit.test(password))
  {
      toast.error("Use atleast one digit in password",{styles})
      return false
  }
     return true
    
  }
  return (
       <div class="font-sans  h-screen w-screen py-4 bg-gray-500" id="internform" >  
       <div id = 'sign-in-button'></div>
        <AiFillHome  onClick={() => {setGotohomepage(true)}}
        class="cursor-pointer h-auto w-12 mx-12 "
        >
        </AiFillHome>   
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
         shadow-sm
         border-4 border-slate-900
         shadow-slate-900
          px-10 
          py-6 bg-zinc-200">
       <p id = "signup"
        class="text-center font-semibold font-serif"
        >Registration</p>
        <div class= "my-4 mx-7">
       <Form.Field>
        <input type="text" 
        placeholder='Name' 
        autoFocus
        class="px-2 box-border border-2 border-cyan-700 text-lg w-64 h-10  "
        name='name' 
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}/>
  
        </Form.Field>
        </div>
       <div class="my-4 mx-7">
        <Form.Field>
        <input type="text" 
        placeholder='Phone no.' 
        name='number' 
        class="px-2 border-2 box-border border-cyan-700  text-lg w-64 h-10"
        value={number}
        onChange={(e)=>{setNumber(e.target.value)}}/>

        </Form.Field>
        </div>
        <div class=" my-4 mx-7">
        <Form.Field>
        <input type="number" 
        placeholder='Age' 
        name='age' 
        value={age}
        class="px-2 border-2 box-border border-cyan-700 text-lg w-64 h-10"
        onChange={(e) => {
          setAge(e.target.value)
        }}/>
   
        </Form.Field>
        </div>
        <div class="mx-7 my-4">
        <Form.Field>
        <input type="text"
         placeholder='City'
          name='city'
          class="px-2 border-2 border-cyan-700 text-lg w-64 h-10"
           value={city}
           onChange={(e)=>{setCity(e.target.value)}}/>
        
        </Form.Field>
        </div>
        <div class=" my-4 mx-7">
        <Form.Field>
        <input type="text"
         placeholder='E-mail'
         name='email' 
        class="px-2 border-2 border-cyan-700 box-border text-lg w-64 h-10"
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}/>

        </Form.Field>
        </div>
        <div class="mx-7 my-4 ">
        <Form.Field>
        <input type={showPassword}
         placeholder='Password'
        name='password' 
        class="px-2 border-2 box-border border-cyan-700 text-lg w-64 h-10"
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}/>
        <svg xmlns="http://www.w3.org/2000/svg"  id = "eye" onClick={handlepassword}
          fill="gray" class="bi bi-eye w-6 h-6 ml-56 absolute -my-8 cursor-pointer" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg"  id ="hiddeneye" style ={{display:'none'}}
            onClick={handlepassword} fill="currentColor" class="bi bi-eye-slash w-6 h-6 ml-56 absolute -my-8 cursor-pointer" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg>
        </Form.Field>
        </div>
        <div class=" my-4 mx-7 ">
        <Form.Field>
        <textarea
         id = "skillset"
          placeholder ="Enter skills"
          name='skills'
          class="px-2 pb-8 h-24 border-2 box-border border-cyan-700 text-lg w-64 "
          value={skills}
          onChange={(e)=>{setSkills(e.target.value)}}/>
      
        </Form.Field>
        </div>
        <div class="flex-1 content-center ">
          {!loading?
        <input type="submit" id = "subbutton"
        class="border-2 px-5 py-2 w-32  text-center border-cyan-700 font-semibold text-xl hover:text-white hover:bg-cyan-700 mx-24 cursor-pointer"
        >
        </input>
        :
        <button type="button"   
        class="mx-20 py-2 flex items-center  border-cyan-700 hover:text-white text-xl hover:bg-cyan-700 px-5  font-semibold leading-6 text-cyan-700 transition duration-150 ease-in-out border-2  rounded-md shadow cursor-not-allowed"
        >
        <svg class="w-5 h-5 mr-3 -ml-1 text-cyan-700 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
        Loading...
    </button>
          }
       </div>
       </div>
        </Form>

    </div>
  )
}
export default Internform
