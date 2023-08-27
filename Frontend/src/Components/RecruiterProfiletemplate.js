import React, { useEffect, useState , useRef } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TextField } from '@mui/material'
import { indigo } from '@mui/material/colors';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';


function RecruiterProfiletemplate(){

 const[user,setUser] = useState({})
 const[loading,setLoading] = useState(true);
 const axiosPrivate = useAxiosPrivate();
 const [bioplaceholder , setBioplaceholder] = useState("No Bio ...");
 const [companyplaceholder,setCompanyplaceholder] = useState("Company Name : NA");
 const {number} = useParams();
 const[update , setUpdate] = useState(true)

  
 

 

  useEffect(() => {

  const getuserprofile = async()=>{
   await axiosPrivate.get(`http://localhost:4000/getrecruiterbynumber/${number}`,
   {
    withCredentials:true
   }).then((response) => {
      console.log(response.data.recordset[0]);
      setUser(response.data.recordset[0]);
    }); 
}
  getuserprofile();
  },[axiosPrivate,number]);


  return (
    <section class="bg-gray-200 h-full font-sans">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen  lg:py-4 ">
     <div class="lg:w-2/3 w-full  bg-gray-100 rounded-2xl border-4 border-gray-50 shrink-0 shadow-xl
      md:mt-0   sm:p-8">
         <h2 class="mb-1 text-xl font-bold
         text-center
         font-sans
          leading-tight tracking-tight text-gray-900 md:text-2xl ">
             Profile
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
              
                <LazyLoadImage 
                effect='blur'
                 src={`http://localhost:4000/uploads/${user?.profilephoto?user?.profilephoto:"defaultuser.png"}`} 
                 className="h-36 w-36 cursor-pointer border-2 border-gray-100 hover:border-gray-600  rounded-full shadow-lg" alt="loading ..." /> 

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
            </div>

            <div className="textbox flex flex-col items-center gap-6">

              <div className="name flex w-full gap-10">
          
                <input 
                className="bg-white placeholder-black  border-0 px-5 py-3  w-3/4 shadow-sm text-lg focus:outline-none" type="text"
               disabled = {update}
                placeholder={"Name : "+ user.name} />              
            
             
       
                <input 
                className="bg-white placeholder-black border-0 px-5 py-3  w-3/4 shadow-sm text-lg focus:outline-none" type="text"
               disabled = {update}
               placeholder={"E-mail : "+ user.email}/>
               
              </div>

              <div className="name flex w-full gap-10">
                
                <input   
                className="bg-white placeholder-black border-0 px-5 py-3  w-3/4 shadow-sm text-lg focus:outline-none" type="text"
                 disabled = {update}
                 placeholder={"Contact No. : "+ user.number} />
               
     
              <input
                className="bg-white  placeholder-black border-0 px-5 py-3  w-3/4 shadow-sm text-lg focus:outline-none" type="text" 
                 disabled = {update}
                 placeholder={companyplaceholder}  />
              </div>

              <div className="name flex w-full gap-10">
          
              <input 
                className="bg-white placeholder-black border-0 px-5 py-3  w-3/4 shadow-sm text-lg focus:outline-none" type="text" 
               disabled = {update}
               placeholder={"Member Since : "+user?.doj?.substring(0,10)} />
               

                <input 
                className="bg-white placeholder-black border-0 px-5 py-3  w-3/4 shadow-sm text-lg focus:outline-none" 
                type="text" 
                disabled = {update}
                placeholder={"Applicants : "+user.applicants} />
               
              </div> 
            
              <textarea  
              className="bg-white  placeholder-black border-0 px-5 w-3/4 shadow-sm pb-16 text-lg focus:outline-none h-28"
              type="text"
              style={{resize:"none"}}
              disabled = {update}
              placeholder={bioplaceholder} />
  
              <div className="name flex w-full gap-10 ">
              {/* <button
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
                   type='submit'>Update</button>      */}
           </div>
          </div>
        </form>
      </div>
    </div>
   </section>
  )
}

export default RecruiterProfiletemplate 
