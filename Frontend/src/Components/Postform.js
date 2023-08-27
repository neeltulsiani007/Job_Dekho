import React, { useState } from 'react'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import NavbarIntern from './NavbarIntern'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { toast , ToastContainer} from 'react-toastify';
import {ref, uploadBytes , getDownloadURL, getStorage} from "firebase/storage";
import firebase from 'firebase/compat/app';
import { getApp } from "firebase/app";
import {v4} from "uuid"
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Fragment } from 'react';
import { ThreeDots } from 'react-loader-spinner';

function Postform() {
  
  const[photo,setPhoto] = useState("")
    const [caption,setCaption] = useState("")
    const[loading,setLoading] = useState(true);
    const[imageupload,setImageupload] = useState(null);
   const axiosPrivate = useAxiosPrivate();
   var firebaseConfig = {
    apiKey: "AIzaSyB0jHNMjt5JhaiDMNY5zyVLemZ85IpsdxU",
    authDomain: "otp-function-f1bf6.firebaseapp.com",
    projectId: "otp-function-f1bf6",
    storageBucket: "otp-function-f1bf6.appspot.com",
    messagingSenderId: "158018589085",
    appId: "1:158018589085:web:9e919de6ca149332215f74"
  };


  if (!firebase.apps.length) {
    console.log("in profile firebase1")
   firebase.initializeApp({firebaseConfig});
  }
   else{
    console.log(firebase.apps.length)
      firebase.app(); 
      console.log("in profile firebase2")   
   }
   const firebaseApp = getApp();
   const storage = getStorage(firebaseApp, "gs://otp-function-f1bf6.appspot.com");

  const navigate = useNavigate();
  useEffect(() => {
    document.getElementById("homebutton").style.backgroundColor = ""
    document.getElementById("homebutton").style.color = "rgb(156 163 175)"
    document.getElementById("gethiredbutton").style.backgroundColor = ""
    document.getElementById("projectsbutton").style.color = "rgb(156 163 175)"
    document.getElementById("projectsbutton").style.backgroundColor = ""
    document.getElementById("postbutton").style.color = "white"
    document.getElementById("postbutton").style.backgroundColor = "rgb(17 24 39)"
    document.getElementById("gethiredbutton").style.color = "rgb(156 163 175)"
    
    const getUsers = async () => {
      try {
          const response = await axiosPrivate.get('/users', {
              withCredentials:true
          });
          console.log(response)
        }catch(e){console.log(e)}
  }
      getUsers();
  },[axiosPrivate]);



    const handleChange = async(e)=>
    {
    
      setLoading(false)
      console.log(e.target.files[0])
      if(e.target.files[0].name.split('.').pop() === 'mp4')
      {
        toast.error("Invalid Image")
      }
      else{
        console.log("inside setphoto")
      setPhoto(e.target.files[0])
      if(e.target.files[0]){
      const imageRef = ref(storage,`images/${e.target.files[0].name + v4()}`);
      await uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
         getDownloadURL(snapshot.ref).then((url) => {
         setImageupload(url);
         setLoading(true)
         });
       });
      }

    }
    
    }
 

    const handleCancel = (e)=>{
      e.preventDefault();
      setImageupload(null);
    }

   const handleSubmit = async(e)=>{
     e.preventDefault();
    if(!photo){
      toast.error("File is required")
    }
    else{
    console.log(photo)
     const config = {
        headers:{
            "Content-Type":"multipart/form-data",
            withCredentials:true
        }
     }
     const res = await axiosPrivate.post('http://localhost:4000/internpost',{
        photo:photo,
        caption:caption,
     },config);
  console.log(res)
     if(res.data.success === false)
     {
      toast.error("Post Failed ! Try again ")
     }
     else
     {
      navigate("/home")
     }
    }
    
   }
   
  return (
    <div class="font-sans">   
        <NavbarIntern />
       <div class="flex flex-col items-center justify-center my-20">
       <ToastContainer 
         position='top-center'
         autoClose = '1500'
         />
<div class="heading text-center font-bold text-3xl m-5 text-gray-800 font-sans">New Post</div>

  <div class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
    <textarea 
    value={caption}
    onChange={(e)=>{setCaption(e.target.value)}}
    style={{resize:"none"}}
    class="description text-xl sec p-3 h20 border border-gray-300 outline-none" 
     placeholder="Enter caption here ...">
     </textarea>
     
     {!loading?
                    <div class="h-80 w-full    rounded-full mx-auto items-center justify-center pt-24 ">
                    <Fragment>
                                <div class="text-2xl font-semibold   text-center ">Loading ...</div>
               <ThreeDots
                height="80" 
                width="80" 
                radius="9"
                color="gray" 
                ariaLabel="three-dots-loading"
                 wrapperStyle={{
                 marginLeft:"43%",
                 marginBottom:"10px"
                }}
              />
                </Fragment>
                </div>
                :
     <div>
     {!imageupload?
      <div class="flex items-center justify-center w-full h-80 mt-4">
                <label class="flex cursor-pointer flex-col w-full h-80 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div class="flex flex-col items-center justify-center pt-7 ">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-20 h-20 mt-16 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clip-rule="evenodd" />
                        </svg>
                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Select a photo</p>
                    </div>
                    <input type="file" class="opacity-0"  onChange={handleChange} />
                </label>
            </div>
            :
          <div class="flex h-80 mt-4">
            <LazyLoadImage
            effect='blur'
            src={imageupload}
            class="flex cursor-pointer w-[700px]  h-80 border-2 rounded-md border-dashed object-cover "
            >
            </LazyLoadImage>
            </div>
     
    }
   </div>
}
    
    
    <div class="icons flex text-gray-500 m-1 items-end justify-end">
 
  
   
   <div class="buttons flex -mb-4">
      <div class="btn border border-gray-300 p-1 px-4 w-24 text-center text-xl my-3 h-10 font-semibold cursor-pointer hover:text-black hover:bg-gray-100 text-gray-500 ml-auto  "
      onClick={handleCancel}
      >Cancel</div>
      <div class="btn border border-blue-500 p-1 px-4 w-24 text-center text-xl my-3 h-10  font-semibold cursor-pointer text-white hover:bg-blue-700 ml-2 bg-blue-500" 
      onClick={handleSubmit}
      >Post</div>
    </div>
    </div>
  </div>
  </div>
  </div>
  )
}

export default Postform
