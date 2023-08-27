import React, { useState } from 'react'
import NavbarIntern from './NavbarIntern'
import { useEffect } from 'react';
import { toast , ToastContainer} from 'react-toastify';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import {ref, uploadBytes , getDownloadURL, getStorage} from "firebase/storage";
import firebase from 'firebase/compat/app';
import { getApp } from "firebase/app";
import {v4} from "uuid"
import { Fragment } from 'react';
import { ThreeDots } from 'react-loader-spinner';

function Videoform(){

    const [video,setVideo] = useState("");
    const [uploaded , setUploaded] = useState(false)
    const [caption , setCaption ] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const [loading,setLoading] = useState(false)
    const [videoupload,setVideoupload] = useState(false)
    const navigate = useNavigate();

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
  

    useEffect(() => {
     
        document.getElementById("homebutton").style.backgroundColor = ""
        document.getElementById("homebutton").style.color = "rgb(156 163 175)"
        document.getElementById("gethiredbutton").style.backgroundColor = ""
        document.getElementById("projectsbutton").style.color = "rgb(156 163 175)"
        document.getElementById("projectsbutton").style.backgroundColor = ""
        document.getElementById("postbutton").style.color = "white"
        document.getElementById("postbutton").style.backgroundColor = "rgb(17 24 39)"
        document.getElementById("gethiredbutton").style.color = "rgb(156 163 175)"
      },[]);


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

   const handleFilechange = async(e)=>{
    setUploaded(true);
    setLoading(false)

    console.log(e.target.files[0])
    if(e.target.files[0].name.split('.').pop() !== 'mp4')
    {
      toast.error("Invalid Video")
      setUploaded(false);
    }
    else{
    setVideo(e.target.files[0])
    if (e.target.files[0].size > 10e6) {
        toast.error("Please upload a file smaller than 10 mb",styles);
        setVideo("");
      }
      else 
      {

        const imageRef = ref(storage,`videos/${e.target.files[0].name + v4()}`);
        await uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
           getDownloadURL(snapshot.ref).then((url) => {
           setVideoupload(url);
           setLoading(true)
           });
         });
      }
    }
   }

   const handleUpload = async(e)=>
   {
    console.log(video)
    e.preventDefault();
    if(!video){
        toast.error("File is required",styles)
      }
      else{
      console.log(video)
       const config = {
          headers:{
              "Content-Type":"multipart/form-data",
              withCredentials:true
          }
       }
       const res = await axiosPrivate.post('http://localhost:4000/internvideo',{
          video:video?video:video,
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
     <div className='relative h-screen font-sans' >
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
    <NavbarIntern />
      <div class=" flex justify-center items-center py-8 px-4 sm:px-6 lg:px-8">

	<div class="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
		<div class="text-center">
			<h2 class="mt-5 text-3xl font-bold text-gray-900">
			New Post!
			</h2>
			<p class="mt-2 text-sm text-gray-400">Upload Video.</p>
		</div>
        <form class="mt-8 space-y-3"  method="POST">
                    <div class="grid grid-cols-1 space-y-2">
                        <label class="text-sm font-bold text-gray-500 tracking-wide">Caption</label>
                            <input class="text-base p-2 border
                             border-gray-300 rounded-lg focus:outline-none
                              focus:border-indigo-500" type="text" 
                              value={caption}
                              onChange={(e)=>{setCaption(e.target.value)}}
                              placeholder="Enter Caption here ..." />
                    </div>
                    <div class="grid grid-cols-1 space-y-2">
                                    <label class="text-sm font-bold text-gray-500 tracking-wide">Attach Video</label>
                        <div class="flex items-center  justify-center w-full">
                          {!uploaded?
                            <label class=" flex cursor-pointer flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                <div class={`h-full w-full text-center flex ${!uploaded && "flex-col"}  justify-center items-center `}>

                                    {!uploaded?
                            <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-10 h-10 text-blue-400
                            group-hover:text-blue-600" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                      :
                                      <div></div>
                                        }
                                    {!uploaded?
                                    <div class="flex flex-auto  w-2/5 mx-auto -mt-10">
                                    <img class="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                                    <span class="text-sm px-3 text-gray-500">No files selected</span>
                                    </div>
                                    :
                                    <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-6">
                                      
                                      <Fragment>
                        <ThreeDots
                        height="80" 
                        width="80" 
                        radius="9"
                        color="gray" 
                        ariaLabel="three-dots-loading"
                          wrapperStyle={{
                            marginTop:"70px",
                          marginLeft:"40%",
                          marginBottom:"10px"
                        }}
                      />
                        </Fragment>
                                
                                    </div>
                                    }
                                      <p class={`pointer-none text-gray-500 text-lg ${uploaded && "hidden"} `}><span class="text-lg">Drag and drop files here <br /> or <span id="" class="  text-lg">select a file</span> </span>from your computer</p>
                                    {/* {!uploaded?
                                    <p class="pointer-none text-gray-500 text-lg "><span class="text-lg">Drag and drop files here <br /> or <span id="" class="  text-lg">select a file</span> </span>from your computer</p>
                                    :
                                    <p class="pointer-none  text-lg text-black "><span class="text-lg  ">File has been selected <br /> <span id="" class=" text-lg font-semibold">Click on Upload</span> </span>to Post </p>
                                } */}
                                    </div>
                                <input type="file" name='video' class="hidden" onChange={handleFilechange} />
                            </label>
                            :
                            <div class={`flex cursor-pointer flex-col rounded-lg  ${!loading && "border-dashed border-4"} w-full h-60  group text-center`}>
                            {!loading?
                             <Fragment>
                        <ThreeDots
                        height="80" 
                        width="80" 
                        radius="9"
                        color="gray" 
                        ariaLabel="three-dots-loading"
                          wrapperStyle={{
                            marginTop:"70px",
                          marginLeft:"40%",
                          marginBottom:"10px"
                        }}
                      />
                        </Fragment>
                        :
                        <video 
                        src={videoupload}
                        class = "object-cover  min-w-full min-h-full"
                        >
                        </video>
                            
                            }
                            </div>
                              }
                        </div>
                    </div>
                            <p class="text-sm text-gray-300">
                                <span>File type: mp4 (size less than 10 mb)</span>
                            </p>
                    <div>
                        <button type="submit"
                        onClick={handleUpload}
                         class="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-1 rounded-full tracking-wide
                          font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                        Upload
                    </button>
                    </div>
        </form>
	</div>
</div>
</div>
  )
}

export default Videoform
