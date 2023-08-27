import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { ToastContainer , toast } from 'react-toastify';


function RecruiterChangePassword() {

   const[oldpassword,setOldpassword] = useState("");
   const[newpassword,setNewpassword] = useState("");
   const[confirmnewpassword,setConfirmnewpassword] = useState("");
   const[checkeduser,setCheckeduser] = useState(false);
   const {auth} = useAuth();
   const axiosPrivate = useAxiosPrivate();
   const navigate = useNavigate();


  const handleSubmit = async(e)=>{
    e.preventDefault();
    var re = {
        capital: /(?=.*[A-Z])/,
        length: /(?=.{8,12}$)/,
        specialChar: /[ -/:-@[-`{-~]/,
        digit: /(?=.*[0-9])/,
    };
    if(!oldpassword)
    {
        toast.error("Old Password is required")
    }
    if(!newpassword)
    {
        toast.error("New Password is required")
    }
    if(!confirmnewpassword)
    {
        toast.error("Confirm Password is required")
    }
    if(!re.capital.test(newpassword))
    {
       toast.error("Use atleast one capital letter")
    }
    else if(!re.length.test(newpassword))
    {
       toast.error("Length must be between 8 and 12")
    }
    else if(!re.specialChar.test(newpassword))
    {
        toast.error("Use atleast one special character")
    }
    else if(!re.digit.test(newpassword))
    {
        toast.error("Use atleast one digit")
    }
    else if(newpassword !== confirmnewpassword)
    {
       toast.error("Password does not match Confirm Password")
    }
    else if(!checkeduser)
    {
       toast.error("Accept terms and conditions to proceed")
    }
    else
    {
      const res =  await  axiosPrivate.post('http://localhost:4000/changepassword',{
        
       oldpassword:oldpassword,
       newpassword:newpassword,
       confirmnewpassword:confirmnewpassword
    },{
        headers: { accessToken: auth.accessToken },
        withCredentials:true
    })

      if(res.data.success === false)
      {
        toast.error("Incorrect Password")
      }
      else
      {
        toast.success("Password has been reset")
        setTimeout(() => {
            navigate("/")
        }, 3000);
       
      }

    }

  }


  return (
    <section class="bg-gray-200 h-full font-sans">
     <div class="flex flex-col items-center font-sans justify-center px-6 py-8 mx-auto md:h-screen lg:py-4 ">
      <div class="w-full p-6 bg-gray-100 rounded-lg shadow-lg
       md:mt-0 sm:max-w-md  sm:p-8">
          <h2 class="mb-1 text-xl font-bold
           leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Change Password
          </h2>
          <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" >
          <ToastContainer 
         position='top-center'
         autoClose = '1500'
         />
          <div>
                  <label for="oldpassword" class="block mb-2 text-sm font-medium text-gray-900
                  ">Old Password</label>
                  <input type="password" name="oldpassword" id="oldpassword"
                  value={oldpassword}
                  onChange={(e)=>{setOldpassword(e.target.value)}}
                   placeholder="••••••••" class="bg-gray-50 border border-gray-300
                   text-gray-900 sm:text-sm 
                   rounded-lg focus:ring-primary-600 
                   focus:border-primary-600 block w-full 
                   p-2.5  " required="">
                  </input>
              </div>
              <div>
                  <label for="newpassword" class="block mb-2 text-sm font-medium text-gray-900
                  ">New Password</label>
                  <input type="password" name="newpassword" id="newpassword"
                   value={newpassword}
                   onChange={(e)=>{setNewpassword(e.target.value)}}
                   placeholder="••••••••" class="bg-gray-50 border border-gray-300
                   text-gray-900 sm:text-sm 
                   rounded-lg focus:ring-primary-600 
                   focus:border-primary-600 block w-full 
                   p-2.5  " required="">
                  </input>
              </div>
              <div>
                  <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 ">Confirm New Password</label>
                  <input type="password" name="confirm-password" id="confirm-password" 
                   value={confirmnewpassword}
                   onChange={(e)=>{setConfirmnewpassword(e.target.value)}}
                  placeholder="••••••••" class="bg-gray-50 border border-gray-300
                   text-gray-900 sm:text-sm 
                   rounded-lg focus:ring-primary-600 focus:border-primary-600 
                   block w-full p-2.5 " required="">
                  </input>
              </div>
              <div class="flex items-start">
                  <div class="flex items-center h-5">

                    <input id="newsletter" aria-describedby="newsletter" type="checkbox"
                    value={checkeduser}
                    onChange={(e)=>{setCheckeduser(!checkeduser)}}
                    class="w-4 h-4 border
                      border-gray-300 rounded bg-gray-50 focus:ring-3
                       focus:ring-primary-300" required="">
                    </input>
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="newsletter" class="font-light text-gray-500  ">I accept the <span class="font-medium text-primary-600
                     hover:underline  " >Terms and Conditions</span></label>
                  </div>
              </div>
              <button type="submit" 
              onClick={handleSubmit}
              class="w-full text-white bg-blue-700 hover:bg-[#002D74]
              focus:ring-4 focus:outline-none focus:ring-blue-300 
              font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset passwod</button>
          </form>
      </div>
  </div>
</section>
  )
}

export default RecruiterChangePassword
