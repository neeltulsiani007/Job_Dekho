import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState , useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import moment from 'moment';

function MiniatureProfileTemplate({profile}) {

const navigate = useNavigate();
const[listexp,setListexp] = useState({});
const[listedu , setListedu] = useState({});
const[skills,setSkills] = useState({});
const[shortlist,setShortlist] = useState("Shortlist")
const axiosPrivate = useAxiosPrivate();


const handleshortlist = (e)=>{

  e.preventDefault();
  if(shortlist === "Shortlist"){
  setShortlist("Shortlisted")
  }
  else
  {
    setShortlist("Shortlist")
  }
}

useEffect(()=>{
const getuserexperience = async()=>{
await axiosPrivate.post(`http://localhost:4000/getprofileexperience/${profile.number}`,{number:profile.number},
{
 withCredentials:true
}).then((response) => {
   console.log(response.data.recordset);
    setListexp(response.data.recordset)
 }); 
}

const getuserskills =async()=>{
  await axiosPrivate.post(`http://localhost:4000/getuserskills/${profile.number}`,{number:profile.number},
{
 withCredentials:true
}).then((response) => {
   console.log(response.data.recordset);
    setSkills(response.data.recordset)
 }); 
}

const getusereducation = async()=>{
await axiosPrivate.post(`http://localhost:4000/getprofileeducation/${profile.number}`,{ number:profile.number},
{
 withCredentials:true
}).then((response) => {
   console.log(response.data.recordset);
    setListedu(response.data.recordset)
 }); 
}
getuserskills();
getusereducation();
getuserexperience();
},[profile,axiosPrivate]);


  return(
   
    <div className='flex h-[450px] w-5/6 mx-auto '>
      <div className='flex flex-col mt-4 box-border w-full h-[450px] border-2 border-black'>
      
        <div className='h-5/6'>
         <div className='flex  h-full'>
          <div className='w-1/4 border-r-2 border-b-2 border-black'>
           <div className='flex-row h-3/5 border-b-2 border-black'>
           <img  src={`http://localhost:4000/uploads/${profile?.profilephoto?profile?.profilephoto:"defaultuser.png"}`}
           className='h-full w-full object-cover'
           />
           </div>
           <div className='flex-row overflow-hidden h-2/5'>
            <div class="px-2 py-2 text-2xl h-1/4 font-sans flex text-gray-700 font-semibold">
            {profile.name}
            </div>
            <div className='px-4 h-1/4  w-full flex py-2 font-semibold font-sans text-base xl:text-xl '>
              Member Since : <span class=" px-1 text-lg">{moment(profile.joiningdate).format("DD-MM-YYYY")}</span>
            </div>
            <div class="px-4 hidden h-1/4 py-1 w-full lg:flex  xl:text-xl text-base font-sans  font-semibold">
            Age : {profile.age}  
            </div>
            {profile.gender?
            <div class="px-4 hidden h-1/4 w-full lg:flex  xl:text-xl text-base font-sans  font-semibold">
            Gender : {profile.gender}  
            </div>
            :
            <div></div>
            }

           </div>
          </div>
          <div className='w-1/4  border-r-2 border-b-2 border-black'>
            <div className='w-full pt-2 h-1/6 text-center '>
              Skills
            </div>
            <div className='h-5/6 pb-2 px-2 overflow-scroll'>
            <ul class="list-inside px-4   space-y-2">
                         
                         {skills.length
                         ?(
                         <li className=''>
                     {skills.map((x, i) =>
                     <div class="text-xl font-sans text-teal-900 pb-3 overflow-auto">
                         {x.skill}    
                         </div> )}
                      </li>
             ): <div class="text-2xl pb-2 font-serif text-gray-600 ">No previous experience . </div>
         }
                    </ul>  
            </div>
          </div>
          <div className='w-1/4  border-r-2 border-b-2 border-black'>
            <div className='w-full pt-2 h-1/6 text-center '>
              Experience
            </div>
            <div className='h-5/6 pb-2 px-2 overflow-scroll'>
              
            <ul class="list-disc    space-y-2">
                         
                         {listexp.length
                         ?(
                         <li className=''>
                     {listexp.map((x, i) =>
                     <div class="text-xl font-sans text-teal-900 pb-3 overflow-auto">
                         {x.experience}    
                         </div> )}
                      </li>
             ): <div class="text-2xl pb-2 font-serif text-gray-600 ">No previous experience . </div>
         }
                    </ul>  
            </div>
          </div>
          <div className='w-1/4   border-b-2 border-black'>
            <div className='w-full pt-2 h-1/6 text-center '>
             Education
            </div>
            <div className='h-5/6 pb-2 px-2 overflow-scroll'>
            <ul class="list-disc  space-y-2">
                         
                         {listedu.length
                         ?(
                         <li className=''>
                     {listedu.map((x, i) =>
                     <div class="text-xl font-sans text-teal-900 pb-3 overflow-auto">
                         {x.education}    
                         </div> )}
                      </li>
             ): <div class="text-2xl pb-2 font-serif text-gray-600 ">Education not specified . </div>
         }
                    </ul>  
            </div>
          </div>
         </div>
        </div>

        <div class="h-1/6 flex items-center justify-center">

          <div className='flex w-1/3  mx-2'>
           <button 
          onClick={()=>{navigate(`/internprofile/${profile.number}`)}}
           className='w-full py-1 border-2 font-serif  border-gray-400 hover:border-none rounded-lg hover:text-white hover:bg-blue-800'>
           Profile
           </button>
          </div>
          <div className='flex w-1/3  mx-2'>
          <button 
          onClick={handleshortlist}
          className='w-full py-1  font-serif border-2 border-gray-400 hover:border-none rounded-lg hover:text-white hover:bg-blue-800'>
           {shortlist}
           </button>
          </div>
          <div className='flex w-1/3  mx-2'>
          <button className='w-full font-serif py-1 border-2 border-gray-400 hover:border-none rounded-lg hover:text-white hover:bg-blue-800'>
           Contact
           </button>
          </div>
        </div>

        </div>
    </div>

  )
}

export default MiniatureProfileTemplate
