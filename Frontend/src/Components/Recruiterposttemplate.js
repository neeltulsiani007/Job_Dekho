import React, { useEffect , useState } from 'react'
import Announcement from './recruiterpostphotos/hiringblue.jpeg'
import Announcement1 from './recruiterpostphotos/hiring.jpeg'
import Announcement2 from './recruiterpostphotos/hiringlightblue.jpeg'
import Announcement3 from './recruiterpostphotos/hiringyellow.jpeg'
import Announcement4 from './recruiterpostphotos/hiringnow.jpeg'
import Announcement5 from './recruiterpostphotos/hiringorange.jpeg'
import Announcement6 from './recruiterpostphotos/jointeam.jpeg'
import moment from 'moment'
import {BiParty} from "react-icons/bi"
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { toast , ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom'


function Recruiterposttemplate({post,appliedpost}) {
  const[description,setDescription] = useState(false)
  const [text,setText] = useState("View Description")
  const [skills,setSkills] = useState([]);
  const [user,setUser] = useState({});
  const [applicants,setApplicants] = useState(post.numberofapplicants)
  const[appliedlist,setAppliedlist] = useState([appliedpost])
  const navigate = useNavigate();
  
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


  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {

     
    const getuserprofile = async()=>{
      await axiosPrivate.get("http://localhost:4000/getuser",
      {
       withCredentials:true
      }).then((response) => {
         console.log(response.data.recordset[0]);
         setUser(response.data.recordset[0]);
       }); 
   }

   getuserprofile();
      try{
     setSkills(post.skills.split(","));
    console.log(appliedpost)
    setAppliedlist(appliedpost.map(function (obj) {
      return obj.postid;
    }
    ));
  }catch(e)
  {
    console.log(e)
  // toast.error("Error loading page ! Try again later .",styles)
  }

  },[appliedpost,post.skills]);

   

  const handleApply = async() =>{

    console.log(user.verified)
     if(user.verified === "false")
     {
      console.log("not verified")
      toast.error("Verify E-mail in settings to apply.",styles)

     }
    
     else
     {

      const res = await axiosPrivate.post('http://localhost:4000/postapplicants', {
      postid:post.postid,
    }, 
    {
      withCredentials:true
    });
    if(res.data.liked)
    {
      setApplicants(applicants+1)

      setAppliedlist([...appliedpost,post.postid])
    }
    else
    {
      setApplicants(applicants-1)

      let newappliedpost = appliedlist.filter((num) => num !== post.postid);
      setAppliedlist([newappliedpost])
    }
  }
  }

  const images = [Announcement,Announcement1,Announcement2,Announcement3,Announcement4,Announcement5,Announcement6]
   
  return (
      <div class="bg-gray-100 p-4 flex items-center justify-center">
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
     <div class="bg-white border rounded-sm lg:w-1/2 md:w-2/3  xl:w-[45%] sm:w-4/5 shadow-xl">
    <div class="flex items-center px-4 py-3">
      {post.profilephoto?
      <img class="h-8 w-8 cursor-pointer rounded-full" 
      onClick={()=>{navigate(`/recruiterprofile/${post.number}`)}}
      src={`http://localhost:4000/uploads/${post.profilephoto}`}  
      alt=''
      />
      :
      <img class="h-8 w-8 rounded-full"
      src={`http://localhost:4000/uploads/defaultuser.png`}  
      alt=''
      />
      }
      <div class="ml-3 ">
      <span 
      onClick={()=>{navigate(`/recruiterprofile/${post.number}`)}}
      class="text-sm cursor-pointer font-semibold antialiased block font-sans  leading-tight">{post.username}</span>
      <span class="text-gray-600 text-xs font-sans block">{moment(post.postdate).format("DD-MM-YYYY")}</span>
      </div>
    </div>
    <div class="min-h-[61vh] h-auto items-center justify-center ">
        <img
        alt=''
        class="h-[33vh] w-full"
         src={images[post.imagenumber]}
     
        ></img>
    <div class="items-center justify-center  ">
    <div class="flex text-center items-center justify-center  text-2xl text-slate-700 font-sans font-semibold py-3">
        <BiParty
        class="mx-3" />
        <span class="text-center">{post.cname[0].toUpperCase() + post.cname.substring(1,post.cname.length)} is looking for Interns !</span>
        <BiParty
        class="mx-3" />
    </div>
    <div class="px-4 font-normal mt-2 text-xl flex gap-5">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-list-check my-1 " viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
</svg>
       <span class="-mx-3 my-[1px] font-sans">Skills required to be eligible :</span> 
       </div>
       <div class="text-lg -my-7 mb-1">
       <br />
        <ul class="list-disc px-8">
        {skills.map((x, i) =>
        <li key={i} class="font-sans text-cyan-950">{x}</li>
        )
        }
        </ul>
    </div>
    <div class=" flex gap-5 px-4 text-lg text-slate-700 font-Georgia font-semibold py-2 mt-1">
    <svg 
    
    xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar-check  " viewBox="0 0 16 16">
  <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
      </svg>
       <span class="-mx-2 -my-1 font-sans">
        Last date to apply is <span class="text-lg">{post.lastdatetoapply.substring(8,10) + "-"
         + post.lastdatetoapply.substring(5,7) + "-" + 
         post.lastdatetoapply.substring(0,4)}  .
         </span>
           </span>
           </div>
        <div class="flex gap-5 text-lg font-sans font-medium px-4 mb-3 pt-1 ">
        Click on the button below to apply for the internship
        <svg xmlns="http://www.w3.org/2000/svg"
        transform="rotate(180 0 0)" 
        width="20" height="20" fill="currentColor" class="bi bi-hand-index-thumb my-2 -mx-3 hidden sm:flex " viewBox="0 0 16 16">
        <path d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 0 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 1 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.118a.5.5 0 0 1-.447-.276l-1.232-2.465-2.512-4.185a.517.517 0 0 1 .809-.631l2.41 2.41A.5.5 0 0 0 6 9.5V1.75A.75.75 0 0 1 6.75 1zM8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v6.543L3.443 6.736A1.517 1.517 0 0 0 1.07 8.588l2.491 4.153 1.215 2.43A1.5 1.5 0 0 0 6.118 16h6.302a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5.114 5.114 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.632 2.632 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046l-.048.002zm2.094 2.025z"/>
      </svg>
        </div>
    </div>
    </div>
    <div class="text-center text-xl text-gray-100 bg-gray-500 font-serif  border-black">
        For complete details check description below
    </div> 
    <div class="flex items-center justify-between mx-4 mt-3 mb-2">
      <div class="flex gap-5 text-lg font-semibold font-sans">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" fill="currentColor" class="bi bi-file-person " viewBox="0 0 16 16">
  <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
  <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
</svg>
      {applicants===1?
      <span class="-mx-3">1 applicant</span>
      :
      <span class="-mx-3">{applicants} applicants</span>
      }
      </div>

      <div class="flex ">
    
        {!appliedlist.includes(post.postid)?
      <button 
        type="button" 
        onClick={handleApply}
        class=" hover:bg-blue-700 font-sans bg-blue-500 rounded-md text-lg text-white font-bold py-2 px-6 w-48 xl:w-56 outline-none  shadow-lg transform active:scale-75 transition-transform"
    >
   Apply
     
    </button>
    :
    <button 
        type="button" 
       
        onClick={handleApply}
        class="flex gap-2 bg-blue-900 rounded-md text-lg text-white font-bold py-2 px-6 w-48 xl:w-56 outline-none  shadow-lg transform active:scale-75 transition-transform"
    >
  <span class="xl:mx-10 mx-6 font-sans">Applied</span>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-square xl:my-1 xl:-mx-10 my-1 -mx-5" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
</svg>
    </button>
      }
      </div>
    </div>
    {!description?
    <div 
     onClick = {()=>{
      setDescription(true)
      setText("Hide Description")
     }}
    
    class="font-semibold text-base mx-4   mb-2 font-sans text-gray-400 ">
      <span class="cursor-pointer hover:underline hover:text-gray-500">
      {text}
      </span>
    </div>
    :
    <div 
    onClick = {()=>{
     setDescription(false)
     setText("View Description")
    }}
   
   class="font-semibold text-base mx-4  mb-2 font-sans text-gray-400  ">
      <span class="cursor-pointer hover:underline hover:text-gray-500">
      {text}
      </span>
   </div>
}
    {description?
    <p class="font-sans text-sm mx-4 mt-1 mb-4 font-Roboto text-gray-900 cursor-pointer">
    {post.cname} is hiring Interns ! 
      <br />
      Mode of internship : {post.mode}
   
      {post.mode==="Offline"?
      
       <span>
          <br />
         Address : {post.address + " , " + post.city + "-" + post.zipcode + " , " + post.state + " , " + post.country }
        </span>
        :
        <span></span>
      }
      <br />
      Stipend : {post.stipend + " INR"}
        <br />

        Last date to apply is {post.lastdatetoapply.substring(8,10) + "-"
         + post.lastdatetoapply.substring(5,7) + "-" + 
         post.lastdatetoapply.substring(0,4)}  .
        <br />
        {post.info}
        </p>
        :
        <p></p>
}
  </div>
</div>
    
  )
}

export default Recruiterposttemplate
