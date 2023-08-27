import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useParams } from 'react-router-dom';
import moment from 'moment'

function Internprofile() {

 let { number } = useParams();
 const [user,setUser] = useState("");
 const [showinfo,setShowinfo] = useState(false)
 const [showinfotext,setShowinfotext] = useState("Show Full Information")
 const [listexp,setListexp] = useState({});
 const [listedu,setListedu] = useState({});
 const axiosPrivate = useAxiosPrivate();


 const update = true;
  useEffect(() => {
    const getuserprofile = async()=>{
   console.log(number)
   await axiosPrivate.post("http://localhost:4000/internprofile",{
   number:number
   },
   {
    withCredentials:true
   }).then((response) => {
      console.log(response.data.recordset[0]);
      setUser(response.data.recordset[0]);
    }); 
}
const getuserexperience = async()=>{
  await axiosPrivate.post(`http://localhost:4000/getprofileexperience/${number}`,{number:number},
  {
   withCredentials:true
  }).then((response) => {
     console.log(response.data.recordset);
      setListexp(response.data.recordset)
   }); 
}

const getusereducation = async()=>{
  await axiosPrivate.post(`http://localhost:4000/getprofileeducation/${number}`,{ number:number},
  {
   withCredentials:true
  }).then((response) => {
     console.log(response.data.recordset);

      setListedu(response.data.recordset)
   }); 
}

getuserprofile();
getusereducation();
getuserexperience();
  },[number,axiosPrivate]);

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


  return (
    <div class="w-full min-h-screen bg-gray-200 font-sans"> 
         
    <div class={`container flex-1 h-screen mx-auto overflow-auto  p-5  `}>
    <div class="md:flex no-wrap md:-mx-2 ">
        <div class="w-full md:w-3/12 md:mx-2">
            <div class="bg-white p-2 border-t-4 border-cyan-700">
                <div class="image overflow-hidden">
       
            <LazyLoadImage
            effect='blur'
             src={`http://localhost:4000/uploads/${user?.profilephoto?user?.profilephoto:"defaultuser.png"}`} 
             class="h-72 md:w-72 w-[600px] mx-auto"  alt="" /> 
                </div>

                <div className='flex '>
                <span class="text-blue-900 shadow-sm px-2 font-bold text-xl leading-8 my-1">
                    {user?.name}
                </span>
                <div className='flex ml-auto'>
              
        
                    </div>
                    </div>
                    <div class="flex gap-1">
               
                <div class="text-base mx-2 my-2">{user.Bio?user.Bio:"No Bio "}</div>
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
        
            <div class="bg-white p-3 shadow-sm rounded-sm">
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
                   
                    </div>
                </div>
                <div class="text-gray-700 mt-2">
                    <div class="grid md:grid-cols-2 text-sm">
                        <div class="grid grid-cols-2">
                            <label class="px-4 py-3 font-semibold"> Name</label>
                            <div >
                           
                            <input 
                            class={`placeholder:text-black bg-white  px-4 py-2 border-none text-sm`}
                            disabled = {true}
                           value={user.name?user.name:"Name "} />
                          
                                </div>
                        </div>
                        <div class="grid grid-cols-2">
                            <label class="px-4 py-3 font-semibold">Country</label>
                            <div >
                           
                            <input 
                            class={` placeholder:text-black bg-white xl:w-52 lg:w-36  px-4 py-2 border-none text-sm`}
                        disabled = {true}
                        placeholder={user.country?user.country:"Country "} />
                                </div>
                        </div>
                        <div class="grid grid-cols-2 ">
                            <label class="px-4 py-3 font-semibold">Gender</label>
                            <div >
                        
                            <input 
                            class={`placeholder:text-black bg-white  px-4 py-2 border-none text-sm`}
                        disabled = {true}
                        placeholder={user.gender?user.gender:"Gender "} />                
                    </div>
                        </div>
                        <div class="grid grid-cols-2">
                            <label class="px-4 py-3 font-semibold">Contact No.</label>
                            <div >
                          
                            <input 
                            class={`placeholder:text-black bg-white xl:w-52 lg:w-36  px-4 py-2 border-none text-sm`}
                        disabled = {true}
                        placeholder={user.number?user.number:"Contact No :"} />
                 

                                </div>
                        </div>
                        <div class="grid grid-cols-2  ">
                            <label class="px-4 py-3 font-semibold">Email</label>
                            <div >
                         
                            <input 
                            class={`  placeholder:text-black bg-white -mx-20 w-[300px] px-4 py-2 border-none text-sm`}
                        disabled = {true}              
                        placeholder={user.email?user.email:"Email"} />
                            
                                </div>
                        </div>
                        <div class="grid grid-cols-2">
                            <label class="px-4 py-3 font-semibold">Date of Birth</label>
                            <div>
                        
                            <input 
                            class={` placeholder:text-black bg-white xl:w-52 lg:w-36  px-4 py-2 border-none text-sm`}
                        disabled = {true}
                        placeholder={user.dob?user.dob:" "} />
                        
                                </div>
                        </div>
                        {showinfo?
                        <div class="grid grid-cols-2">
                        <label class="px-4 py-3 font-semibold">Age</label>
                        <div>
                      
                            <input 
                            class={` placeholder:text-black bg-white  px-4 py-2 border-none text-sm`}
                        disabled = {true}
                        placeholder={user?.age} />
                            
                            </div>
                    </div>
                        :
                        <div></div>
                        }
                        {showinfo?
                        <div class="grid grid-cols-2">
                        <label class="px-4 py-3 font-semibold">State</label>
                        <div>
                       
                            <input 
                            class={` placeholder:text-black bg-white  xl:w-52 lg:w-36  px-4 py-2 border-none text-sm`}
                        disabled = {true}

                        placeholder={user?.state} />
                            
                   
                            </div>
                    </div>
                        :
                        <div></div>
                        }
                           {showinfo?
                         <div class="grid grid-cols-2">
                         <label class="px-4 py-3 font-semibold">City</label>
                         <div>
                      
                            <input 
                            class={` placeholder:text-black bg-white  px-4 py-2 border-none text-sm`}
                        disabled = {true}
                        placeholder={user?.city} />
                             </div>
                     </div>
                        :
                        <div></div>
                        }
                         
                         {showinfo?
                         <div class="grid grid-cols-2">
                         <label class="px-4 py-3 font-semibold">Zipcode</label>
                         <div>
                        
                            <input 
                            class={` placeholder:text-black bg-white  xl:w-52 lg:w-36   px-4 py-2 border-none text-sm`}
                        disabled = {true}
                        placeholder={user?.zipcode} />
                            
                       
                             </div>
                     </div>
                        :
                        <div></div>
                        }
                         {showinfo?
                       <div class="grid grid-cols-2">
                       <label class="px-4 py-3 font-semibold">Number of Posts</label>
                       <div>
                       
                            <input 
                            class={` placeholder:text-black bg-white  px-4 py-2 border-none text-sm`}
                        disabled = {true}
                        placeholder={user?.numberofposts} />
                            

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
                             value="0"
                             class={` placeholder:text-black bg-white xl:w-52 lg:w-36  px-4 py-2 border-none text-sm`}
                             placeholder="0" />
                              </div>
                      </div>
                        :
                        <div></div>
                        }
                          </div>
                         {showinfo?
                         <div class="w-auto text-gray-700 ">
                         <label class="px-4 pb-1 text-sm font-semibold ">Skills</label>
                      
                            <input 
                            class={` placeholder:text-black xl:mx-36  lg:mx-10 bg-white md:w-[450px] w-[330px] px-4 pb-1  border-none text-sm`}
                        disabled = {true}
                        placeholder={user?.skills} />  
                     </div>
                        :
                        <div></div>
                        }
        
                  
                </div>
                 
                
                 

                 {!showinfo?
                <button
                   onClick={handleclick}
                   class={` block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4`}
                   >
                        {showinfotext}
                    </button>
                    :
                    <button
                   onClick={handleclick}
                   class={` block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4`}
                   >
                   {showinfotext}
                    </button>
                }
            </div>
  
            <div class="my-4"></div>
            <div class="bg-white p-3 shadow-sm rounded-sm">

                <div class="grid grid-cols-2">
                    <div>
                        <div class="flex  items-center space-x-2 font-semibold text-gray-900  leading-8 mb-3">
                            <span clas="text-green-500">
                                <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </span>
                            <span class="tracking-wide">Experience</span>
                        </div>
                      
                        <ul class="list-inside  space-y-2">
                         
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

                        <ul class="overflow-auto space-y-2">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
  )
}

export default Internprofile
