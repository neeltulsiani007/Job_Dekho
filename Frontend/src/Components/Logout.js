import React, { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
 import useAxiosPrivate from '../hooks/useAxiosPrivate';


function Logout()
{
const axiosPrivate = useAxiosPrivate();
const navigate = useNavigate();
const [type,setType] = useState("");

useEffect(() => {

  const getusertype = async()=>{
   await axiosPrivate.get("http://localhost:4000/getusertype",
   {
    withCredentials:true
   }).then((response) => {
    
      if(response.data.type === "intern")
      {
       setType("intern");
      }
    else{
      setType("recruiter");
    }
    }); 
}
getusertype();
  },[axiosPrivate]);

const handleLogout =async()=>{

    const response = await axiosPrivate.get('/logout', { 
        withCredentials:true
    });
    console.log(response)
    navigate("/")
}

  return (
    <div  class ="flex py-28 h-screen w-screen items-center justify-center  bg-no-repeat bg-cover font-sans bg-zinc-200">
    <br/> 
    <div class="box-content sm:p-10 shadow-2xl lg:p-32  backdrop-blur-md bg-zinc-200">
    <h3 id="title" class = " text-center text-4xl font-bold">Are you sure you want to logout?<br></br>
    </h3>
    <div class="flex-col my-4 space-y-10 space-x-56 ">
     <button id = "recruitbutton"
     class=" text-sky-700 hover:bg-blue-800 hover:text-white w-40 h-14 font-serif text-2xl border-2 border-neutral-900"
     onClick={handleLogout}>Yes</button>
     {type==="intern"?
     <button id = "button_intern" 
     class=" text-sky-700  hover:bg-blue-800 hover:text-white w-40 h-14 font-serif  text-2xl border-2 border-neutral-900"
      onClick={() => {navigate('/internprofilesetting');}}>No</button>
      :
      <button id = "button_intern" 
      class=" text-sky-700  hover:bg-blue-800 hover:text-white w-40 h-14 font-serif  text-2xl border-2 border-neutral-900"
       onClick={() => {navigate('/profilesetting');}}>No</button>
  }
      </div>
    </div> 
    </div>
  )
}
 export default Logout