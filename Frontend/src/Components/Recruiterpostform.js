import React, { useState } from 'react'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import NavbarRecruiter from './NavbarRecruiter'
import { useEffect } from 'react'
import { toast , ToastContainer} from 'react-toastify';
import DatePicker from "react-datepicker";
import { Country, State, City }  from 'country-state-city';
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuid } from 'uuid';
import { Navigate } from 'react-router-dom';


function Recruiterpostform() {
  const [mode,setMode] = useState("Online")
  const [name , setName] = useState("")
  const [stipend,setStipend] = useState("");
  const [skills,setSkills] = useState("");
  const [address,setAddress] =  useState("");
  const [city,setCity] = useState("")
  const [country,setCountry] = useState('');
  const [state,setState] = useState('');
  const [zipcode,setZipcode] = useState("");
  const [lastdate,setLastdate] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [statedisabled,setStatedisabled] = useState(true)
  const [isocode,setIsocode] = useState("");
  const [citydisabled,setCitydisabled] = useState(true)
  const [countries,setCountries] = useState([])
  const [states,setStates] = useState([])
  const [cities,setCities] = useState([])
  const [gotohome,setGotohome] = useState(false);
  const [info,setInfo] = useState("");

const uid = uuid();

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


  useEffect(()=>{
     
    document.getElementById("homebutton").style.backgroundColor = ""
    document.getElementById("homebutton").style.color = "rgb(156 163 175)"
    document.getElementById("gethiredbutton").style.backgroundColor = ""
    document.getElementById("projectsbutton").style.color = "rgb(156 163 175)"
    document.getElementById("projectsbutton").style.backgroundColor = ""
    document.getElementById("postbutton").style.color = "white"
    document.getElementById("postbutton").style.backgroundColor = "rgb(17 24 39)"
    document.getElementById("gethiredbutton").style.color = "rgb(156 163 175)"

    setCountries(Country.getAllCountries());

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

  const handleCountry = (e)=>{
    setCountry(e.target.value)
    console.log(e.target.value) 
    for (let i=0; i < countries.length; i++) {
      if (countries[i].name === e.target.value){
          setIsocode(countries[i].isoCode)
          setStates(State.getStatesOfCountry(countries[i].isoCode))
          break;
      }
  }
    setStatedisabled(false)
  }

  if(gotohome)
  {
    return <Navigate to />
  }
   
  const handlesubmit = async(e)=>{
    e.preventDefault();
    
    console.log(name,info,mode,stipend,skills,address,city,country,state,zipcode,lastdate)
    console.log(typeof(lastdate))
    const regex2 = /^[0-9\b]+$/;
    if(!name)
    {
      toast.error('Enter Name', {
       styles
        });
    }
  
    else if(!stipend)
    {
      toast.error('Enter Stipend', {
       styles
        });
    }
    else if(!regex2.test(stipend))
    {
      toast.error('Stipend should be a number', {
        styles
         });
    }

    else if(!skills)
    {
      toast.error('Enter Skills', {
       styles
        });
    }
    else if(!lastdate)
    {
      toast.error('Enter last date to apply', {
       styles
        });
    }
    
     else if(mode === "Offline" && !address )
    {
      toast.error('Enter Address', {
       styles
        });
    }
    else if(mode === "Offline" && !country){
      toast.error('Enter Country', {
        styles
         });
    }
    else if(mode === "Offline" && !state){
      toast.error('Enter State', {
        styles
         });
    }
    else if(mode === "Offline" && !city){
      toast.error('Enter City', {
        styles
         });
    }
    else if(mode === "Offline" &&  !zipcode){
      toast.error('Enter Zipcode', {
        styles
         });
    }
    
    
    else{
   console.log("inside axios")
    await axiosPrivate.post('http://localhost:4000/recruiterpost',{
      uid:uid,
      name:name,
      info:info,
      mode:mode,
      stipend:stipend,
      skills:skills,
      address:address,
      city:city,
      country:country,
      state:state,
      zipcode:zipcode,
      lastdate:lastdate
    },{
      withCredentials:true
    })
    toast.success("Post Successful",{
      styles
    })
    
  }
  }

   const handleState = (e)=>{
    setState(e.target.value)
    for (let i=0; i < states.length; i++) {
      if (states[i].name === e.target.value){
          setCities(City.getCitiesOfState(isocode,states[i].isoCode))
          break;
      }
  }
    setCitydisabled(false)
   }

   const handleCity = (e)=>{
    setCity(e.target.value)
    
   }


   
  return (
    <div class="min-h-screen bg-gray-100 font-sans">
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
        <NavbarRecruiter />
        <div
        id='box'
        class=" p-6 py-8 md:bg-gray-100 flex items-center justify-center ">
        <div 
          class = {`container ${mode==="Offline" && "-my-9  "}  ${mode==="Online" && "-my-10"}  max-w-screen-lg mx-auto`}
        >
        <div>
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-12 mb-12">
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div class="text-black">
            <p class="font-bold text-2xl  font-serif ">Internship Details</p>
            <p class ="pt-2  text-gray-400">Please fill out all the fields.</p>
          </div>
          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-3 text-sm grid-cols-1 md:grid-cols-5">
              <div class="md:col-span-5">
                <label class="text-slate-600 font-semibold"
                for="full_name">Company Name / Startup Name</label>
                <input autoFocus
                 onChange={(e)=>{setName(e.target.value)}}
                 type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={name} />
              </div>

             

              <div class="md:col-span-5">
                <label class="text-slate-600 font-semibold"
                 for="email">Mode of Internship  </label>
               
                <select
                 class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                 onChange={(e)=>{setMode(e.target.value)}}
                 value={mode}
                 id="modes" name="modes">
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                </select>
              </div>

            

               {mode==="Online"?
              <div class="md:col-span-2 hidden">
                <label for="country">Country / Region</label>
                <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input name="country" id="country" placeholder="" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />         
                </div>
              </div>
              :
              <div class="md:col-span-2 ">
              <label 
              class="text-slate-600 font-semibold"
              for="country">Country / Region</label>
             
               <select
               onChange={handleCountry}
               class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
               > 
              <option value="⬇️ Select a country ⬇️"> </option>
              {countries.map((countries) => <option value={countries.value}>{countries.name}</option>)}
              </select>

            </div>
              }
  
              {mode==="Online"?
              <div class="md:col-span-2 hidden">
                <label for="state">State / Province</label>
                <div class="h-10 bg-gray-50 flex border border-gray-600 rounded items-center mt-1">
                <input name="state" 
                disabled = {true}
                id="state" placeholder="" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                </div>
              </div>
              :
              <div class="md:col-span-2 ">
                <label
                class="text-slate-600 font-semibold"
                for="state">State / Province</label>
               <select
               disabled={statedisabled}
               
                onChange={handleState}
               class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
               > 
              <option value="⬇️ select a state ⬇️"> </option>
            
      {states.map((states) => <option value={states.value}>{states.name}</option>)}
      
    </select>
              </div>
              }
           

             {mode==="Online"?
              <div class="md:col-span-1 hidden ">
              <label for="zipcode">Zipcode </label>
              <input type="text" name="zipcode" id="zipcode" class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
              </div>
              :
              <div class="md:col-span-1  ">
              <label
              class="text-slate-600 font-semibold"
              for="zipcode">Zipcode </label>
              <input 
              value={zipcode}
              onChange={(e)=>{setZipcode(e.target.value)}}
              type="text" name="zipcode" id="zipcode" class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
              </div>
              }
             
               {mode==="Online"?
              <div class="md:col-span-2 hidden">
                <label
                 for="city">City</label>
                <input type="text" name="city" id="city" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
              </div>
              :
              <div class="md:col-span-2 ">
              <label 
              class="text-slate-600 font-semibold"
              for="city">City</label>
              <select
              disabled={citydisabled}
               onChange={handleCity}
               class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
               > 
              <option value="⬇️ Select a city ⬇️"> </option>
              {cities.map((cities) => <option value={cities.value}>{cities.name}</option>)}
              </select>

            </div>
            }
              {mode==="Online"?
              <div class="md:col-span-3 hidden">
                <label  
                for="address">Address / Street</label>
                <input type="text" 
                value={address}
                 class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="" />
              </div>
              :
              <div class="md:col-span-3">
                <label
                class="text-slate-600 font-semibold"
                for="address">Address / Street</label>
                <input
                value={address}
                onChange={(e)=>{setAddress(e.target.value)}}
                type="text"  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="" />
              </div>
            }

              <div class="md:col-span-5">
                <label class="text-slate-600 font-semibold"
                 for="email">Skills Required</label>
                <textarea 
                value={skills}
                onChange={(e)=>{setSkills(e.target.value)}}
               class="h-20 border py-2 rounded px-4  w-full bg-gray-50" 
                placeholder="Enter skills required ... ">
                </textarea>
              </div>
              
              <div class="md:col-span-3">
                <label class="text-slate-600 font-semibold"
                 for="stipend">Stipend</label>
                <input
                value={stipend}
                onChange={(e)=>{setStipend(e.target.value)}}
                type="text" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                 placeholder="0 for unpaid internship" />
              </div>

              <div class="react-datepicker-wrapper md:col-span-2">
                <label class="text-slate-600 font-semibold"
                for="date"> Last date to apply </label>
               
                <DatePicker
                dateFormat='dd/MM/yyyy'
                className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                selected={lastdate} onChange={(date) => setLastdate(date)}
                minDate={new Date()}
                showMonthDropdown
                monthDropdownItemNumber={12}
                
                // showTimeInput
                />
                {/* <input type="text" 
                onChange={(e)=>{setLastdate(e.target.value)}}
                 class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={lastdate}
                 placeholder="" /> */}
              </div>

              <div class="md:col-span-5">
                <label class="text-slate-600 font-semibold"
                 for="email">Extra Information (optional)</label>
                <textarea 
                value={info}
                style={{resize:"none"}}
                onChange={(e)=>{setInfo(e.target.value)}}
               class="h-20 border py-2 rounded px-4  w-full bg-gray-50" 
                placeholder="Enter extra information ...">
                </textarea>
              </div>
      
              <div class="md:col-span-5 text-right">
                <div class="inline-flex items-end mt-3 ">
                <button
                onClick={handlesubmit}
                class="bg-blue-500 hover:bg-blue-700 text-white text-base font-bold py-2 px-6 rounded">Create Post</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
  )
}

export default Recruiterpostform
