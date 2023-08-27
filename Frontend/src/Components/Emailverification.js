import React, {  useState,useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import { ToastContainer , toast } from 'react-toastify';

function Emailverification() {

    const [clicked,setClicked] = useState(false)
    const axiosPrivate = useAxiosPrivate();
    const [loading,setLoading] = useState(false);
    const auth = useAuth();
    const [user,setUser] = useState({});

    useEffect(() => {

    const getuserprofile = async()=>{
        await axiosPrivate.get("http://localhost:4000/getuserprofile",
        {
         withCredentials:true
        }).then((response) => {
         console.log("user")
           console.log(response.data.recordset[0]);
           setUser(response.data.recordset[0]);
         }); 
     }

     getuserprofile();

    },[axiosPrivate]);

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



    const handleClick = async(e)=>{
        e.preventDefault();
        setLoading(true)
        const res =  await axiosPrivate.post('http://localhost:4000/sendemail',{
          email:'neel'
     },{
         headers: { accessToken: auth.accessToken },
         withCredentials:true
     })
     console.log(res.data.message)
     if(res.data.success){
        setLoading(false)
        setClicked(true)
     }
     else
     {
      toast.error('Invalid Email',{styles});
     }
    }


  return (

    
    <section class="bg-gray-200 h-full">
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
      {user.verified ==="false"||!user.verified?
     <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-20 ">
      <div class="w-full p-6 bg-gray-100 rounded-lg shadow-xl
       md:mt-0 sm:max-w-lg  sm:p-8">
        <div class="md:flex hidden -mt-4 mb-2">
        <svg 
        class="mx-40"
        xmlns="http://www.w3.org/2000/svg" width="120" 
        height="100"
         viewBox="-13.2 -16.50405 114.4 99.0243">
            <path fill="#4285f4" d="M6 66.0162h14v-34l-20-15v43c0 3.315 2.685 6 6 6z"/><path fill="#34a853" d="M68 66.0162h14c3.315 0 6-2.685 6-6v-43l-20 15z"/><path fill="#fbbc04" d="M68 6.0162v26l20-15v-8c0-7.415-8.465-11.65-14.4-7.2z"/>
            <path fill="#ea4335" d="M20 32.0162v-26l24 18 24-18v26l-24 18z"/><path fill="#c5221f" d="M0 9.0162v8l20 15v-26l-5.6-4.2c-5.935-4.45-14.4-.215-14.4 7.2z"/>
            </svg>
            </div>
          <h2 class=" text-center mb-1 text-3xl font-bold
           font-sans
           leading-tight tracking-tight text-gray-900 md:text-3xl ">
              Email Verification
          </h2>
            {clicked?
            <div class="text-cyan-900 text-lg font-sans mt-4">
            A verfication link has been sent to your registered email address !
            </div>
            :
            <div class="text-gray-500 text-lg font-sans mt-4 text-center">
            Thank you for signing up with JobDekho !
            </div>  
            }
            {clicked?
             <div
             class="text-cyan-900 text-lg font-sans  ">
             Click on the link to verify your email address.
             </div>
             :
            <div
            class="text-gray-500 text-lg font-sans text-center">
            Click on the button below to verify your email address.
            </div>
            }
             
            {clicked?
            <div></div>
            :
          <div class="mt-4">
            {!loading?
          <button type="submit" 
            onClick={handleClick}
              class="w-full text-white bg-blue-700 hover:bg-[#002D74]
              focus:ring-4 focus:outline-none focus:ring-blue-300 
              font-medium rounded-lg text-lg px-5 py-2 text-center">Click here</button>
              :
              <button type="button"
        class=" w-full  flex gap-2 text-center text-white bg-blue-700 items-center px-5 py-2 text-sm font-semibold leading-6  transition duration-150 ease-in-out  rounded-md shadow cursor-not-allowed hover:bg-indigo-400"
        disabled="">
        <svg class="w-5 h-5 mx-40 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
        <span class="-mx-40 text-lg">Loading...</span>
       
    </button>
            }
          </div>
            }
      </div>
  </div>
  :
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-20 ">
      <div class="w-full p-6 bg-gray-100 rounded-lg shadow-xl
       md:mt-0 sm:max-w-lg  sm:p-8">
        <div class="md:flex hidden -mt-4 mb-2">
        <svg 
        class="mx-40"
        xmlns="http://www.w3.org/2000/svg" width="120" 
        height="100"
         viewBox="-13.2 -16.50405 114.4 99.0243">
            <path fill="#4285f4" d="M6 66.0162h14v-34l-20-15v43c0 3.315 2.685 6 6 6z"/><path fill="#34a853" d="M68 66.0162h14c3.315 0 6-2.685 6-6v-43l-20 15z"/><path fill="#fbbc04" d="M68 6.0162v26l20-15v-8c0-7.415-8.465-11.65-14.4-7.2z"/>
            <path fill="#ea4335" d="M20 32.0162v-26l24 18 24-18v26l-24 18z"/><path fill="#c5221f" d="M0 9.0162v8l20 15v-26l-5.6-4.2c-5.935-4.45-14.4-.215-14.4 7.2z"/>
            </svg>
            </div>
          <h2 class=" text-center mb-1 text-3xl font-bold
           font-sans
           leading-tight tracking-tight text-gray-900 md:text-3xl ">
              Email Verification
          </h2>
            {clicked?
            <div class="text-cyan-900 text-lg font-sans mt-4">
            A verfication link has been sent to your registered email address !
            </div>
            :
            <div class="text-gray-500 text-lg font-sans mt-4 text-center">
            Thank you for signing up with JobDekho !
            </div>  
            }
     
             <div
             class="text-cyan-900 text-lg font-sans text-center ">
             Your email has been verified !
             </div>
           
      </div>
  </div>
}
</section>


  )
}

export default Emailverification
