import React, { Fragment } from 'react'
import { useState,useEffect } from 'react'
import {RxCross2} from 'react-icons/rx'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { ToastContainer, toast } from 'react-toastify';
import firebase from 'firebase/compat/app';
import { getApp } from "firebase/app";
import {v4} from "uuid"
import {ref, uploadBytes , getDownloadURL, getStorage} from "firebase/storage";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import moment from 'moment'
import {ThreeDots} from 'react-loader-spinner'


function InternProfiletemplate() {


  const [showinfo,setShowinfo] = useState(false)
  const [showinfotext,setShowinfotext] = useState("Show Full Information")
  const[editclick,setEditclick] = useState(false)
  const [formdisable,setFormdisable] = useState(true);
  const [showbiotick,setShowbiotick] = useState(false);
  const [showuploadtick,setShowuploadtick] = useState(false)
  const [loading,setLoading] = useState(true);
  const [bioedit,setBioedit] = useState(false);
  const[addexperience , setAddexperience] = useState(false);
  const [addeducation,setAddeducation] = useState(false);
  const [experience,setExperience] = useState("");
  const [education,setEducation] = useState("");
  const [photo,setPhoto] = useState("");
  const [display,setDisplay] = useState("");
  const [imageupload,setImageupload] = useState("");
  const[email,setEmail] = useState("");
  const [bio,setBio] = useState("");
  const[age,setAge] = useState("");
  const[state,setState] = useState("");
  const[city,setCity] = useState("");
  const[zipcode,setZipcode] = useState("");
  const[nop,setNop] = useState("");
  const[peers,setPeers] = useState("");
  const[skills,setSkills] = useState("");
  const[username,setUsername] = useState("");
  const[dob,setDob] = useState("");
  const[country,setCountry] = useState("");
  const[gender,setGender] = useState("");
  const[contact,setContact] = useState("");
  const [user,setUser] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [update,setUpdate] = useState(true);
  const [listexp,setListexp] = useState({});
  const [listedu,setListedu] = useState({});



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

    setLoading(false);
const getuserprofile = async()=>{
   await axiosPrivate.get("http://localhost:4000/getuserprofile",
   {
    withCredentials:true
   }).then((response) =>{
      console.log(response.data.recordset[0]);
      setUser(response.data.recordset[0]);
      setUsername(response.data.recordset[0].name);
      setContact(response.data.recordset[0].number);
      setSkills(response.data.recordset[0].skills)
      setCity(response.data.recordset[0].city)
      setEmail(response.data.recordset[0].email)
      setAge(response.data.recordset[0].age)
      setCountry(response.data.recordset[0].country)
      setState(response.data.recordset[0].state)
      setGender(response.data.recordset[0].gender)
      setZipcode(response.data.recordset[0].zipcode)
      setDob(response.data.recordset[0].dob)
      setBio(response.data.recordset[0].bio)
    }); 
}
const getuserexperience = async()=>{
    await axiosPrivate.get("http://localhost:4000/getinternexperience",
    {
     withCredentials:true
    }).then((response) => {
       console.log(response.data.recordset);
        setListexp(response.data.recordset)
     }); 
 }

 const getusereducation = async()=>{
    await axiosPrivate.get("http://localhost:4000/getinterneducation",
    {
     withCredentials:true
    }).then((response) => {
       console.log(response.data.recordset);
        setListedu(response.data.recordset)
     }); 
 }

getuserprofile();
getuserexperience();
getusereducation();
setLoading(true);
  },[axiosPrivate]);


   const handleclick = ()=>{


    if(showinfotext === "Update")
    {
      
    }
      else if(showinfotext === "Show Full Information")
      {
        setShowinfotext("Show Less Information");
        setShowinfo(true)
      }
      else
      {
        setShowinfotext("Show Full Information");
        setShowinfo(false)
      }
   }

   const handleEditprofileclick = ()=>{
    setShowinfo(true)
    setEditclick(true)
    setUpdate(false)
    setFormdisable(false)
   }

   const handleFileChange = async(e)=>{

        setLoading(false)
        setShowuploadtick(true)
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
        setLoading(true);
      }

   const handleFileSubmit = async()=>{
    const config = {
        headers:{
            "Content-Type":"multipart/form-data",
            withCredentials:true
        }
     }
     const response =  await axiosPrivate.post("http://localhost:4000/updateinternphoto",{
    photo : photo
    },config)
    if(response.data.success === true)
    {
      toast.success(' Profile Photo updated!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setShowuploadtick(false)
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
   }

   const handleBiosubmit = async()=>{
     
    const config = {
        headers:{ 
            'Content-Type': 'application/x-www-form-urlencoded',
            withCredentials:true
        }
     }
     const response =  await axiosPrivate.post("http://localhost:4000/postbio",{
       bio:bio
        },config)
      user.Bio = bio;
      setBio(bio);
      setBioedit(false)
   }


   const handleExperience = ()=>{
    setAddexperience(true)
    console.log(listexp)
   }

   const handleEducation = ()=>{
    setAddeducation(true)
   }

   const handleExperiencesubmit = async()=>{
    
    console.log(experience)

    const config = {
        headers:{ 
            'Content-Type': 'application/x-www-form-urlencoded',
            withCredentials:true
        }
     }
    if(experience){
    const response =  await axiosPrivate.post("http://localhost:4000/postexperience",{
   experience:experience

   },config)


   const obj = {usernumber:contact , experience:experience}
   listexp.push(obj);
   setAddexperience(false)
   setExperience("");
    }
    else
    {
        toast.error('Enter Experience', {
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
   }

   const handleEducationsubmit = async()=>{
    
    console.log(education)

    const config = {
        headers:{ 
            'Content-Type': 'application/x-www-form-urlencoded',
            withCredentials:true
        }
     }
    if(education){
    const response =  await axiosPrivate.post("http://localhost:4000/posteducation",{
   education:education,

   },config)

   const obj = {usernumber:contact , education:education}
   listedu.push(obj);
   setAddeducation(false)
   setEducation("");
    }
    else
    {
        toast.error('Enter Education History',{
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
   }
 
   const handleBioedit = ()=>{
    setShowbiotick(true);
    setBioedit(true)
   
   }

   const handleCancel = ()=>{
    setEditclick(false)
    setShowinfotext("Show Full Information");
    setShowinfo(false)
    setFormdisable(true)
    setUpdate(true)
   }

  

   const handleUpdate = async()=>{
     
    const config = {
        headers:{ 
            'Content-Type': 'application/x-www-form-urlencoded',
            withCredentials:true
        }
     }
    console.log(gender,username,skills,dob)
    console.log(username?username:user.name)
    console.log(age?age:user.age)
    const response =  await axiosPrivate.post("http://localhost:4000/updateinternprofile",{

        name:username?username:user.name,
        age:age?age:user.age,
        city:city?city:user.city,
        skills:skills?skills:user.skills,
        country:country?country:user.country,
        gender:gender?gender:user.gender,
        zipcode:zipcode?zipcode:user.zipcode,
        state:state?state:user.state,
        dob:dob?dob:user.dob,
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

       setEditclick(false)
       setShowinfotext("Show Full Information");
       setShowinfo(false)
       user.name = username?username:user.name;
       user.age = age?age:user.age;
       user.skills = skills?skills:user.skills;
       user.email = email?email:user.email;
       user.city = city?city:user.city;
       user.country = country?country:user.country;
       user.state = state?state:user.state;
       user.gender = gender?gender:user.gender;
       user.zipcode = zipcode?zipcode:user.zipcode;
       user.dob = dob?dob:user.dob;
       setUpdate(true) 
   }


  return (
    <div> 
         
        <div class={`container flex-1 h-screen  mx-auto overflow-auto  p-5 sm:-my-4 my-5`}>
        <div class="md:flex no-wrap md:-mx-2 ">
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
 
            <div class="w-full md:w-3/12 md:mx-2 font-sans">
                <div class="bg-white p-2 border-t-4 border-cyan-700">
                    <div class="image overflow-hidden">

                    
                    {!loading?
                    <div class="h-72 w-full mx-auto items-center justify-center pt-20">
                    <Fragment>
                                <div class="text-2xl text-center ">Loading ...</div>
                          <ThreeDots
                height="80" 
                width="80" 
                radius="9"
                color="blue" 
                ariaLabel="three-dots-loading"
                 wrapperStyle={{
                 marginLeft:"33%"
                }}
               
              />
                </Fragment>
                </div>
                    :
                 <div class="mx-[1px]">
                {imageupload?
                <LazyLoadImage
                effect='blur'
                src={imageupload}    
                class="h-72 md:w-72  w-[600px]  mx-auto" alt="" /> 
                :
                <LazyLoadImage
                effect='blur'
                 src={`http://localhost:4000/uploads/${user?.profilephoto?user?.profilephoto:"defaultuser.png"}`} 
                 class="h-72 md:w-72 w-[600px] mx-auto"  alt="" /> 
               }
               </div>
                 }  
           

                        {/* <img 
                        src={`http://localhost:4000/uploads/${user?.profilephoto?user?.profilephoto:"defaultuser.png"}`} 
                            alt="" /> */}
                    </div>
                    <div className='flex '>
                    <span class="text-blue-900 shadow-sm px-2 font-bold text-xl leading-8 my-1">
                        {user?.name}
                    </span>
                    <div className='flex ml-auto'>
                     
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                    onClick={handleFileSubmit}
                      class={`${!showuploadtick && "hidden" } bi bi-check-lg h-6 w-6 my-2 mx-2 cursor-pointer` }
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg>

                     <label htmlFor="filePicker" >

                     <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor"
                       class={`${showuploadtick && "hidden" } bi bi-cloud-arrow-up h-6 w-6 my-2 mx-2 cursor-pointer` }
                       viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                        </svg>
                    </label>

                     <input id="filePicker" style={{display:"none"}} type={"file"} onChange={handleFileChange}></input>
                  
                        <svg
                        onClick={handleBioedit}
                        xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 my-2 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        </div>
                        </div>
                        <div class="flex gap-1">
                            {bioedit?
                    <textarea
                    value={bio}
                    onChange={(e)=>{setBio(e.target.value)}}
                     class = {`${!bioedit && "placeholder-black"} border-none h-10 resize-none w-48 ml-auto mr-11`}
                    placeholder={user.bio? user.bio : "Enter Bio here ..."}
                    disabled={!bioedit}
                    >
                    </textarea>
                    :
                    <div class="text-base mx-2 my-2">{user.Bio?user.Bio:"Enter Bio here ..."}</div>
                    }
                      <svg xmlns="http://www.w3.org/2000/svg" w fill="currentColor" 
                      onClick={()=>{setBioedit(false)}}
                      class={`${!bioedit && "hidden" } bi bi-x-lg h-5 w-5  my-[10px] -mx-1  text-black cursor-pointer` }
                       viewBox="0 0 16 16">
                        
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" 
                    onClick={handleBiosubmit}
                      class={`${!bioedit && "hidden" } bi bi-check-lg h-6 w-7 my-2 mx-2  text-black cursor-pointer` }
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg>
                        </div>
                    <ul
                        class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li class="flex items-center py-3">
                            <span class="text-xl font-semibold">Status</span>
                            <span class="ml-auto"><span
                                    class="bg-green-500 py-1 px-3 rounded text-white text-base">Active</span></span>
                        </li>
                        <li class="flex items-center py-3">
                            <span class="font-semibold text-xl">Member since :</span>
                            <span class="ml-auto text-lg text-black">{moment(user.joiningdate).format("DD-MM-YYYY")}</span>
                        </li>
                    </ul>
                </div>
                <div class="my-4"></div>
           
                <div class="bg-white p-3 hover:shadow">
                    <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                        <span class="text-cyan-700">
                            <svg class="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </span>
                        <span>Similar Profiles</span>
                    </div>
                    <div class="grid grid-cols-3">
                        <div class="text-center my-2">
                            <img class="h-16 w-16 rounded-full mx-auto"
                                src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                                alt=""  />
                            <a href="#" class="text-main-color text-lg ">user</a>
                        </div>
                        <div class="text-center my-2">
                            <img class="h-16 w-16 rounded-full mx-auto"
                                src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                                alt=""  />
                            <a href="#" class="text-main-color text-lg ">user</a>
                        </div>
                        <div class="text-center my-2">
                            <img class="h-16 w-16 rounded-full mx-auto"
                                src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                                alt=""  />
                            <a href="#" class="text-main-color text-lg ">user</a>
                        </div>

                      
                    </div>
                </div>
                </div>
   
            <div class="w-full md:w-9/12  md:mx-2  h-64">

              <div class="bg-white p-3 shadow-sm rounded-sm font-sans">
                    <div class="flex items-center  font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg class="h-5 mx-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span class="tracking-wide text-xl font-semibold -mx-1">About</span>
                        <div 
                        class="ml-auto"
                        > 
                        <button
                        onClick={handleEditprofileclick}
                        class="flex p-2.5 bg-blue-800 rounded-xl hover:rounded-3xl hover:bg-blue-950 transition-all duration-300 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        </button>
                        </div>
                    </div>
                    <div class="text-gray-700 mt-2">
                        <div class="grid md:grid-cols-2 text-sm">
                            <div class="grid grid-cols-2">
                                <label class="px-4 py-3 font-semibold"> Name</label>
                                <div >
                                {update?
                                <input 
                                class={` ${!editclick && "placeholder:text-black"} bg-white    px-4 py-2 border-none text-sm`}
                            disabled = {update}
                                placeholder={user.name} />
                                :
                                <input 
                                class={`${!editclick && "placeholder:text-black"}  px-4 py-2 border-none text-sm`}
                                disabled = {update}
                                onChange={(e)=>{setUsername(e.target.value)}}
                                placeholder={user.name?user.name:"Name"} />
                                }
                                    </div>
                            </div>
                            <div class="grid grid-cols-2">
                                <label class="px-4 py-3 font-semibold">Country</label>
                                <div >
                                {update?
                                <input 
                                class={` ${!editclick && "placeholder:text-black"} bg-white xl:w-52 lg:w-36  px-4 py-2 border-none text-sm`}
                            disabled = {update}
                                placeholder={user.country} />
                                :
                                <input 
                                class={` ${!editclick && "placeholder:text-black"} xl:w-52 lg:w-36  px-4 py-2 border-none text-sm`}
                            disabled = {update}
                            onChange={(e)=>{setCountry(e.target.value)}}
                            placeholder={user.country?user.country:"Country :"} />
                                }
                                    </div>
                            </div>
                            <div class="grid grid-cols-2 ">
                                <label class="px-4 py-3 font-semibold">Gender</label>
                                <div >
                                {update?
                                <input 
                                class={` ${!editclick && "placeholder:text-black"} bg-white    px-4 py-2 border-none text-sm`}
                            disabled = {update}
                            placeholder={user.gender} />
                                :
                                <input 
                                class={` ${!editclick && "placeholder:text-black"}  px-4 py-2 border-none text-sm`}
                            disabled = {update}
                            onChange={(e)=>{setGender(e.target.value)}}
                            placeholder={user.gender} />
                                }
                              
                        </div>
                            </div>
                            <div class="grid grid-cols-2">
                                <label class="px-4 py-3 font-semibold">Contact No.</label>
                                <div >
                                {update?
                                <input 
                                class={` ${!editclick && "placeholder:text-black"} bg-white xl:w-52 lg:w-36  px-4 py-2 border-none text-sm`}
                            disabled = {update}
                                placeholder={user.number} />
                                :
                                <input 
                                class={` ${!editclick && "placeholder:text-black"} bg-white xl:w-52 lg:w-36  px-4 py-2 border-none text-sm`}
                            disabled = {!update}
                            onChange={(e)=>{setContact(e.target.value)}}
                            placeholder={user.number?user.number:"Contact No:"} />
                                }

                                    </div>
                            </div>
                            <div class="grid grid-cols-2  ">
                                <label class="px-4 py-3 font-semibold">Email</label>
                                <div >
                                {update?
                                <input 
                                class={` ${!editclick && "placeholder:text-black"}  bg-white -mx-20 w-[300px]  px-4 py-2 border-none text-sm`}
                                disabled = {update}
                                placeholder={user.email} />
                                :
                                <input 
                                class={` ${!editclick && "placeholder:text-black"} bg-white -mx-20 w-[300px] px-4 py-2 border-none text-sm`}
                            disabled = {!update}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            placeholder={user.email?user.email:"Email"} />
                                }
                                    </div>
                            </div>
                            <div class="grid grid-cols-2">
                                <label class="px-4 py-3 font-semibold">Date of Birth</label>
                                <div>
                                {update?
                                <input 
                                class={` ${!editclick && "placeholder:text-black"} bg-white xl:w-52 lg:w-36  px-4 py-2 border-none text-sm`}
                            disabled = {update}
                                placeholder={user.dob} />
                                :
                                <input 
                                class={` ${!editclick && "placeholder:text-black"} xl:w-52 lg:w-36  px-4 py-2 border-none text-sm`}
                            disabled = {update}
                            onChange={(e)=>{setDob(e.target.value)}}
                            placeholder={user?.dob} />
                                }
                                    </div>
                            </div>
                            {showinfo?
                            <div class="grid grid-cols-2">
                            <label class="px-4 py-3 font-semibold">Age</label>
                            <div>
                            {update?
                                <input 
                                class={` ${!editclick && "placeholder:text-black"} bg-white   px-4 py-2 border-none text-sm`}
                            disabled = {update}
                                placeholder={user.age} />
                                :
                                <input 
                                class={` ${!editclick && "placeholder:text-black"}  px-4 py-2 border-none text-sm`}
                            disabled = {update}
                            onChange={(e)=>{setAge(e.target.value)}}
                            placeholder={user?.age} />
                                }
                                </div>
                        </div>
                            :
                            <div></div>
                            }
                            {showinfo?
                            <div class="grid grid-cols-2">
                            <label class="px-4 py-3 font-semibold">State</label>
                            <div>
                            {update?
                                <input 
                                class={` ${!editclick && "placeholder:text-black"}  xl:w-52 lg:w-36  bg-white   px-4 py-2 border-none text-sm`}
                            disabled = {update}
                                placeholder={user.state} />
                                :
                                <input 
                                class={` ${!editclick && "placeholder:text-black"}  xl:w-52 lg:w-36  px-4 py-2 border-none text-sm`}
                            disabled = {update}
                            onChange={(e)=>{setState(e.target.value)}}
                            placeholder={user?.state} />
                                }
                       
                                </div>
                        </div>
                            :
                            <div></div>
                            }
                               {showinfo?
                             <div class="grid grid-cols-2">
                             <label class="px-4 py-3 font-semibold">City</label>
                             <div>
                             {update?
                                <input 
                                class={` ${!editclick && "placeholder:text-black"} bg-white   px-4 py-2 border-none text-sm`}
                            disabled = {update}
                                placeholder={user.city} />
                                :
                                <input 
                                class={` ${!editclick && "placeholder:text-black"}  px-4 py-2 border-none text-sm`}
                            disabled = {update}
                            onChange={(e)=>{setCity(e.target.value)}}
                            placeholder={user?.city} />
                                }
                               

                                 </div>
                         </div>
                            :
                            <div></div>
                            }
                             
                             {showinfo?
                             <div class="grid grid-cols-2">
                             <label class="px-4 py-3 font-semibold">Zipcode</label>
                             <div>
                             {update?
                                <input 
                                class={`placeholder:text-black xl:w-52 lg:w-36  bg-white   px-4 py-2 border-none text-sm`}
                            disabled = {update}
                                placeholder={user.zipcode} />
                                :
                                <input 
                                class={` ${!editclick && "placeholder:text-black"}  xl:w-52 lg:w-36   px-4 py-2 border-none text-sm`}
                            disabled = {update}
                            onChange={(e)=>{setZipcode(e.target.value)}}
                            placeholder={user?.zipcode} />
                                }
                           
                                 </div>
                         </div>
                            :
                            <div></div>
                            }
                             {showinfo?
                           <div class="grid grid-cols-2">
                           <label class="px-4 py-3 font-semibold">Number of Posts</label>
                           <div>
                           {update?
                                <input 
                                class={` ${!editclick && "placeholder:text-black"} bg-white   px-4 py-2 border-none text-sm`}
                            disabled = {update}
                                placeholder={user.numberofposts} />
                                :
                                <input 
                                class={` ${!editclick && "placeholder:text-black"} bg-white  px-4 py-2 border-none text-sm`}
                            disabled = {!update}
                    
                            placeholder={user?.numberofposts} />
                                }

                               </div>
                       </div>
                            :
                            <div></div>
                            }
                             {showinfo?
                              <div class="grid grid-cols-2 ">
                              <label class="px-4 py-3 font-semibold">Peers</label>
                              <div>
                                 <input type="text" 
                                 disabled = {true}
                                 onChange={(e)=>{setPeers(e.target.value)}}
                                 value={peers}
                                 class={` ${!editclick && "placeholder:text-black"} xl:w-52 lg:w-36  px-4 py-2 border-none text-sm`}
                                 placeholder="0" />
                                  </div>
                          </div>
                            :
                            <div></div>
                            }
                              </div>
                             {showinfo?
                             <div class="w-auto text-gray-700 mt-1">
                             <label class="px-4 py-3 text-sm font-semibold ">Skills</label>
                             {update?
                                <input  
                                class={` ${!editclick && "placeholder:text-black"} xl:mx-40 lg:mx-10 bg-white md:w-[450px] w-[330px] px-4  border-none text-sm`}
                            disabled = {update}
                                placeholder={user.skills} />
                                :
                                <input 
                                class={` ${!editclick && "placeholder:text-black"} xl:mx-40 lg:mx-10 bg-white md:w-[450px] w-[330px] px-4  border-none text-sm`}
                            disabled = {update}
                            onChange={(e)=>{setSkills(e.target.value)}}
                            placeholder={user?.skills} />
                                }
                       
                         </div>
                            :
                            <div></div>
                            }
            
                      
                    </div>
                     
                    {editclick?
                    
                      <div class="grid grid-cols-2 mt-3">
                        <div>
                      <button
                      onClick={handleUpdate}
                      class="bg-transparent
                       hover:bg-blue-800
                       w-full
                       text-xl
                        text-blue-900 font-semibold
                         hover:text-white py-1 px-4 
                         border border-blue-800 
                         hover:border-transparent rounded"
                      >Update
                      </button>
                      </div>
                      <div>
                      <button
                      onClick={handleCancel}
                       class="bg-transparent
                        hover:bg-blue-800
                        w-full
                        text-xl
                         text-blue-900 font-semibold
                          hover:text-white py-1 px-4 border
                           border-blue-800 hover:border-transparent
                            rounded"
                       >
                        Cancel
                        </button>
                      </div>
                      </div>
                      :
                       <div></div>

                    }

                     {!showinfo?
                    <button
                       onClick={handleclick}
                       class={`${editclick && "hidden"} block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4`}
                       >
                            {showinfotext}
                        </button>
                        :
                        <button
                       onClick={handleclick}
                       class={`${editclick && "hidden"} block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4`}
                       >
                       {showinfotext}
                        </button>
                    }
                </div>
      

                <div class="my-4"></div>

         
                <div class={`bg-white ${(addexperience || addeducation)&&"max-h-[275px]"} max-h-[248px]  p-3 shadow-sm rounded-sm font-sans`}>

                    <div class="grid grid-cols-2">
                        <div>
                            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span clas="text-green-500">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </span>
                                <span class="tracking-wide">Experience</span>
                            </div>
                            <ul class="list-inside max-h-28 overflow-y-scroll space-y-2">
                             
                            {listexp.length
                            ?(
                            <li>
                        {listexp.map((x, i) =>
                        <div class="text-lg text-teal-900 pb-3 overflow-auto">
                            {x.experience}    
                            </div> )}
                         </li>
                ): <div class="text-lg pb-2 text-gray-600 ">No previous experience . </div>
            }
                           
                           </ul>

                           
                         {addexperience?
                         <div class="my-2 ">
                         <input type = "text" 
                           class="h-10 w-80"
                           value={experience}
                           onChange={(e) => {setExperience(e.target.value)}}
                           placeholder='Enter experience ...'
                         />
                         </div>
                         :
                         <span></span>
                         }
                            

                            {addexperience?
                            <button 
                            onClick={handleExperiencesubmit}
                            class="cursor-pointer bg-blue-900 rounded-full w-10 h-10 ">
                           <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="h-6 w-6 my-[2px] mx-2 text-white" viewBox="0 0 16 16">
                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                            </svg>
                            </button>
                            :
                            <button 
                            onClick={handleExperience}
                            class="cursor-pointer bg-blue-900 rounded-full w-7 h-7 mt-4 ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 my-[2px] mx-[2.5px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        </button>
                        }
                           {addexperience?
                         <button 
                         onClick={()=>{setAddexperience(false)}}
                         class="cursor-pointer bg-blue-900 rounded-full w-10 h-10 mx-2">
                    <RxCross2
                    class="my-[2px] text-white mx-2 h-6 w-6"
                    />
                     </button>
                     :
                     <p></p>
                     
                    }
                </div>
                        <div>
                            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span clas="text-green-500">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path fill="#fff"
                                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                    </svg>
                                </span>
                                <span class="tracking-wide">Education</span>
                            </div>

                            <ul class="list-inside max-h-28  overflow-scroll space-y-2">
                            {listedu.length
                            ?(
                            <li>
                        {listedu.map((x, i) =>
                        <div class="text-lg text-teal-900 pb-3 overflow-auto">
                            {x.education}    
                            </div>)}
                         </li>
                            ): <div class="text-lg pb-2 text-gray-600 "> Education not specified. </div>
                        }   
                               </ul>

                            {addeducation?
                         <div class="my-2 ">
                         <input type = "text" 
                           class="h-10 w-80"
                           value={education}
                           onChange={(e) => {setEducation(e.target.value)}}
                           placeholder='Enter education ...'
                         />
                         </div>
                         :
                         <span></span>
                         }
                            
                            {addeducation?
                            <button 
                            onClick={handleEducationsubmit}
                            class="cursor-pointer bg-blue-900 rounded-full w-10 h-10 ">
                           <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="h-6 w-6 my-[2px] mx-2 text-white" viewBox="0 0 16 16">
                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                            </svg>
                            </button>
                            :
                            <button 
                            onClick={handleEducation}
                            class="cursor-pointer bg-blue-900 rounded-full w-7 h-7 mt-4 ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 my-[2px] mx-[2.5px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        </button>
                        }
                        {addeducation?
                         <button 
                         onClick={()=>{setAddeducation(false)}}
                         class="cursor-pointer bg-blue-900 rounded-full w-10 h-10 mx-2">
                    <RxCross2
                    class="my-[2px] text-white mx-2 h-6 w-6"
                    />
                     </button>
                     :
                     <p></p>
                    }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  )
}

export default InternProfiletemplate


    

