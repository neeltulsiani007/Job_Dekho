import React, { useEffect, useState , useRef } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ToastContainer, toast } from 'react-toastify';
import {ref, uploadBytes , getDownloadURL, getStorage} from "firebase/storage";
import firebase from 'firebase/compat/app';
import { getApp } from "firebase/app";
import {v4} from "uuid"
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TextField } from '@mui/material'
import { indigo } from '@mui/material/colors';
import { Fragment } from 'react';
import { ThreeDots } from 'react-loader-spinner';


function Profile(){

 const[user,setUser] = useState({})
 const [name,setName] = useState("");
 const[loading,setLoading] = useState(true);
 const [companyname,setCompanyname] = useState("");
 const [email,setEmail] = useState("");
 const [extrainfo,setExtrainfo] = useState("");
 const[applicants,setApplicants] = useState("");
 const [dateofjoin , setDateofjoin] = useState("");
 const[imageupload,setImageupload] = useState(null);
 const [profile,setProfile] = useState("");
 const[photo,setPhoto] = useState("defaultuser.png")
 const [display,setDisplay] = useState("defaultuser.png");
 const axiosPrivate = useAxiosPrivate();
 const [bioplaceholder , setBioplaceholder] = useState("Enter Bio here ...");
 const [companyplaceholder,setCompanyplaceholder] = useState("Enter Company name ...");

 const[update , setUpdate] = useState(true)
 const color = indigo[900];
  
  const here = useRef();

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

  const getuserprofile = async()=>{
   await axiosPrivate.get("http://localhost:4000/getuserprofile",
   {
    withCredentials:true
   }).then((response) => {
      console.log(response.data.recordset[0]);
      setUser(response.data.recordset[0]);
      setName(response.data.recordset[0].name)
      if(response.data.recordset[0].profilephoto)
      {
        setPhoto(response.data.recordset[0].profilephoto)
        setDisplay(response.data.recordset[0].profilephoto)
        setProfile(response.data.recordset[0].profilephoto)
      }
      if(response.data.recordset[0].companyname)
      {
        setCompanyplaceholder("Company Name : "+response.data.recordset[0].companyname)
      }
      if(response.data.recordset[0].bio)
      {
        setBioplaceholder("Bio : "+response.data.recordset[0].bio)
      }
      
    }); 
}
  getuserprofile();
  },[axiosPrivate]);


  const validate = (email)=>{
 
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if(email){
    if(!regex.test(email))
    {
     toast.error('Invalid Email');
     return false
    }
    }
    return true
 }


  const handlechange = async(e) =>{
    
    setLoading(false)
    console.log(storage)
    console.log(e.target.files[0])
    setPhoto(e.target.files[0])
    console.log(e.target.files[0].name)
    setDisplay(e.target.files[0].name)
    setImageupload(e.target.files[0])
    const imageRef = ref(storage,`images/${e.target.files[0].name + v4()}`);
   await uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
      setImageupload(url);
    
      });
    });
    setLoading(true)
  }


  const handleEdit = ()=>
  {
    setUpdate(false)
  }

  const handleUpdate = async(e)=>{
     
    e.preventDefault();
    const config = {
      headers:{
          "Content-Type":"multipart/form-data",
          withCredentials:true
      }
   }
    
    const response =  await axiosPrivate.post("http://localhost:4000/updateuserprofile",{

        name:name?name:user.name,
        companyname:companyname?companyname:user.companyname,
        number:user.number,
        email:user.email,
        bio:extrainfo?extrainfo:user.bio,
        photo:photo?photo:user.profilephoto
       },config)
       if(response.data.success === true)
       {
         toast.success(' Profile updated!', {
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
       else
       {
         toast.error('Update failed ! Try again', {
           position: "top-center",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "colored",
           });
       }
       
       user.name = name?name:user.name;
       user.bio = extrainfo?extrainfo:user.bio;
       user.email = email?email:user.email;
       user.companyname = companyname?companyname:user.companyname;
       setCompanyplaceholder("Company Name : " +companyname)
       setBioplaceholder("Bio : "+user.bio)
       setUpdate(true) 
   }

  return (
    <section class="bg-gray-200 h-full ">
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
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen  lg:py-4 ">
     <div class="lg:w-2/3 w-full  bg-gray-100 rounded-2xl border-4 border-gray-50 shrink-0 shadow-xl
      md:mt-0   sm:p-8">
         <h2 class="mb-1 text-xl font-bold
         text-center
         font-sans
          leading-tight tracking-tight text-gray-900 md:text-2xl ">
             My Profile
         </h2>
        <form className='py-1' id="formprofile" >
            <div className='flex justify-center py-4'>
                <label htmlFor="profilephoto">  
                 
                {!loading?
                    <div class="h-36 w-36     rounded-full mx-auto items-center justify-center pt-4 ">
                    <Fragment>
                                <div class="text-2xl text-center ">Loading ...</div>
               <ThreeDots
                height="80" 
                width="80" 
                radius="9"
                color="blue" 
                ariaLabel="three-dots-loading"
                 wrapperStyle={{
                 marginLeft:"20%",
                 marginBottom:"10px"
                }}
              />
                </Fragment>
                </div>
                    :
                 <div>
                {imageupload?
                  <LazyLoadImage 
                src={imageupload}    
                effect='blur'
                className="h-36 w-36 cursor-pointer border-2 border-gray-100 hover:border-gray-600  rounded-full shadow-lg" alt="loading ..." /> 
                :
                <LazyLoadImage 
                effect='blur'
                 src={`http://localhost:4000/uploads/${user?.profilephoto?user?.profilephoto:"defaultuser.png"}`} 
                 className="h-36 w-36 cursor-pointer border-2 border-gray-100 hover:border-gray-600  rounded-full shadow-lg" alt="loading ..." /> 
               }
               </div>
                 } 
                 </label>
                {/* {imageupload?
                <LazyLoadImage 
                src={imageupload}
                effect='blur'
                className="h-36 w-36   cursor-pointer border-2 border-gray-100 hover:border-gray-600  rounded-full shadow-lg" alt="loading ..." /> 
                :
                <LazyLoadImage
                 src={`http://localhost:4000/uploads/${display}`} 
                 effect='blur'
                className="h-36 w-36  cursor-pointer border-2 border-gray-100 hover:border-gray-600  rounded-full shadow-lg" alt="loading ..." /> 
               }
                </label> 
                <input  id="profilephoto" 
                disabled={update}
                type={"file"} style={{display:'none'}} onChange={handlechange} /> */}
                 <input  id="profilephoto" 
                disabled={update}
                type={"file"} style={{display:'none'}} onChange={handlechange} />
            </div>

            <div className="textbox flex flex-col items-center gap-6">

              <div className="name flex w-full gap-10">
                {update?
                <input 
                className="bg-white placeholder-black  border-0 px-5 py-3  w-3/4 shadow-sm text-lg focus:outline-none" type="text"
               disabled = {update}
                placeholder={"Name : "+ user.name} />              
                :
                <TextField
                onChange={(e)=>{setName(e.target.value)}}  
                variant='filled'
                focused
                sx={{width:"75%",
               }}
               inputProps={{ sx: { 
                backgroundColor:"white" ,
              } }}  
               
                disabled = {update}
                type="text"  label="Name"  />
                }

                {update?
                <input 
                className="bg-white placeholder-black border-0 px-5 py-3  w-3/4 shadow-sm text-lg focus:outline-none" type="text"
               disabled = {update}
               placeholder={"E-mail : "+ user.email}/>
                :
                <input 
                className="bg-white placeholder-gray-600 border-0 px-5 py-3  w-3/4 shadow-sm text-lg focus:outline-none" type="text"
               disabled = {!update}
               onChange={(e)=>{setEmail(e.target.value)}}
               placeholder={"E-mail : "+ user.email} />
                }
              </div>

              <div className="name flex w-full gap-10">
                { update?
                <input   
                className="bg-white placeholder-black border-0 px-5 py-3  w-3/4 shadow-sm text-lg focus:outline-none" type="text"
                 disabled = {update}
                 placeholder={"Contact No. : "+ user.number} />
                 :
                 <input   
                className="bg-white placeholder-gray-600 border-0 px-5 py-3  w-3/4 shadow-sm text-lg focus:outline-none" type="text"
                 disabled = {!update}
       
                placeholder={"Contact No. : "+ user.number} />
                }
               {update?
              <input
                className="bg-white  placeholder-black border-0 px-5 py-3  w-3/4 shadow-sm text-lg focus:outline-none" type="text" 
                 disabled = {update}
                 placeholder={companyplaceholder}  />
                :
                <TextField
                onChange={(e)=>{setCompanyname(e.target.value)}}  
                variant='filled'
                focused
                sx={{width:"75%",
               }}
               inputProps={{ sx: { 
                backgroundColor:"white" ,
              } }}  
               
                disabled = {update}
                type="text"  label="Company Name"  />
               }
              </div>

              <div className="name flex w-full gap-10">
              {
                update?
              <input 
                className="bg-white placeholder-black border-0 px-5 py-3  w-3/4 shadow-sm text-lg focus:outline-none" type="text" 
               disabled = {update}
               placeholder={"Member Since : "+user.dateofjoin} />
                :
                <input 
                className="bg-white placeholder-gray-600 border-0 px-5 py-3 w-3/4 shadow-sm text-lg focus:outline-none" type="text" 
               disabled = {!update}
               onChange={(e)=>{setDateofjoin(e.target.value)}}
                placeholder={"Member Since : "+user.dateofjoin} />
               }

                {update?
                <input 
                className="bg-white placeholder-black border-0 px-5 py-3  w-3/4 shadow-sm text-lg focus:outline-none" 
                type="text" 
                disabled = {update}
                placeholder={"Applicants : "+user.numberofapplicants} />
                :
                <input 
                className="bg-white placeholder-gray-600 border-0 px-5 py-3  w-3/4 shadow-sm text-lg focus:outline-none" 
                type="text" 
                disabled = {!update}
                placeholder={"Applicants : "+user.numberofapplicants} />
                }
              </div> 
              {update?
              <textarea  
              className="bg-white  placeholder-black border-0 px-5 w-3/4 shadow-sm pb-16 text-lg focus:outline-none h-28"
              type="text"
              style={{resize:"none"}}
              disabled = {update}
              placeholder={bioplaceholder} />
              :
              <TextField
              onChange={(e)=>{setExtrainfo(e.target.value)}}  
              variant='filled'
              focused
              multiline
              sx={{width:"75%",
              ".css-85zwa9-MuiInputBase-root-MuiFilledInput-root.Mui-focused":{
              backgroundColor:"white",
              }
             }}
            
             inputProps={{ sx: { 
              backgroundColor:"white" ,
              paddingBottom : 7,
               }}}  
             
              disabled = {update}
              type="text"  label="Bio" />
              }

              <div className="name flex w-full gap-10 ">
              <button
              onClick={handleEdit}
                class="w-full text-white bg-blue-700 hover:bg-[#002D74]
                   focus:ring-4 focus:outline-none focus:ring-blue-300 
                   font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type='button'>Edit</button>  
                  <button
                   onClick={handleUpdate}
                  disabled={update}
                  class="w-full text-white bg-blue-700 hover:bg-[#002D74]
                   focus:ring-4 focus:outline-none focus:ring-blue-300 
                   font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                   type='submit'>Update</button>     
           </div>
          </div>
        </form>
      </div>
    </div>
   </section>
  )
}

export default Profile
