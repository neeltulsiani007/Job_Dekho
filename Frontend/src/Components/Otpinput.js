import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { ToastContainer , toast } from 'react-toastify';
function Otpinput(){
  
    const[otp1,setOtp1] = useState("")
    const[otp2,setOtp2] = useState("")
    const[otp3,setOtp3] = useState("")
    const[otp4,setOtp4] = useState("")
    const[otp5,setOtp5] = useState("")
    const[otp6,setOtp6] = useState("")
    const[otpfinal,setOtpfinal] = useState("");
    const[gobacktoform,setGobacktoform] = useState(false);
    const num1 = useRef();
    const num2 = useRef();
    const num3 = useRef();
    const num4 = useRef();
    const num5 = useRef();
    const num6 = useRef();
  // const handleChange = (e) =>{
    if(gobacktoform)
    {
      return <Navigate to="/" />
    }
  // }
  
  const showToastMessage = () => {
    console.log("success called");
    toast.success('OTP verified!', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
      }

  const showerrorMessage = () => {
    console.log("error toasted");
    toast.error('Incorrect OTP', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    }
   

  const handleSubmit = async(e)=> {

    e.preventDefault();
  
    console.log(otpfinal)
    const code = otpfinal;
    console.log(code);
    window.confirmationResult.confirm(code).then((result) => {
    const user = result.user;
    console.log(JSON.stringify(user));
    showToastMessage();
    setTimeout(() => {     
      setGobacktoform(true)
    }, 4000);
    }).catch((error)=>{
      alert("Incorrect OTP")
      console.log(error)
      showerrorMessage();
    });
  }

    return (
      <div  class="flex h-screen w-screen items-center justify-center bg-zinc-200 font-sans">
      <Form onSubmit={handleSubmit}>
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
      <p class = "text-center mb-7 font-semibold ">Enter OTP</p>
      <div class="box-content border-2 w-auto h-auto p-10 bg-zinc-200 shadow-2xl">
         <div class="flex-col space-x-7 space-y-8">       
          <input
            name="otp1"
            type="text"
            id="otp1"
            autoFocus={true}
            class="w-14 h-14 border-2 border-slate-900 text-center"
            autoComplete="off" 
            value={otp1}
            ref={num1}
            onChange={(e) =>{setOtp1(e.target.value);num2.current.focus()}}
            tabIndex="1" maxLength="1" 
          />
          <input
            id="otp2"
            name="otp2"
            class="w-14 h-14 border-2 border-slate-900 text-center"
            type="text"
            autoComplete="off"
            autoFocus={false}
            value={otp2}
            ref={num2}
            onChange={(e) =>{setOtp2(e.target.value);num3.current.focus()}}
            tabIndex="2" maxLength="1" 

          />
          <input

            name="otp3"
            class="w-14 h-14 border-2 border-slate-900 text-center"
            type="text"
            ref={num3}
            autoComplete="off"
            autoFocus={false}
            value={otp3}      
            onChange={(e) =>{setOtp3(e.target.value);num4.current.focus()}}
            tabIndex="3" maxLength="1" 

          />
          <input
            name="otp4"
            type="text"
            ref={num4}
            class="w-14 h-14 border-2 border-slate-900 text-center"
            autoComplete="off"
            autoFocus={false}
            value={otp4}
            onChange={(e) =>{setOtp4(e.target.value);num5.current.focus()}}
            tabIndex="4" maxLength="1"
          />

          <input
            name="otp5"
            type="text"
            ref={num5}
            autoComplete="off"
            autoFocus={false}
            class="w-14 h-14 border-2 border-slate-900 text-center"
            value={otp5}
            onChange={(e) =>{setOtp5(e.target.value);num6.current.focus()}}
            tabIndex="5" maxLength="1"
          />

        <input
            name="otp6"
            ref={num6}
            type="text"
            autoFocus={false}
            autoComplete="off"
            class="w-14 h-14 border-2 border-slate-900 text-center"
            value={otp6}
            onChange={(e) =>{setOtp6(e.target.value);setOtpfinal(otp1+otp2+otp3+otp4+otp5+e.target.value)}}
            tabIndex="6" maxLength="1"
          />
          
         <div>
         </div>
         <div class="flex  ">
        <button class="border-2 px-5
        border-cyan-700
        hover:text-white
        hover:bg-cyan-700 mx-auto
        
        cursor-pointer" 
        type="submit">
          Submit
        </button>
        </div>
        </div>
        </div>
      </Form>
         </div>
    );

  }



export default Otpinput;
