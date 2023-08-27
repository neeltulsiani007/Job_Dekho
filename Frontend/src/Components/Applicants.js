import React, { useState } from 'react'
import NavbarRecruiter from './NavbarRecruiter'
import { useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import MiniatureApplicantsTemplate from './MiniatureApplicantsTemplate';

function Applicants() {

    const axiosPrivate = useAxiosPrivate();
    const[applicants,setApplicants] = useState({});

    useEffect(() => {

       
        document.getElementById("gethiredbutton").style.backgroundColor = ""
        document.getElementById("gethiredbutton").style.color = "rgb(156 163 175)"
        document.getElementById("homebutton").style.backgroundColor = ""
        document.getElementById("projectsbutton").style.color = "white"
        document.getElementById("projectsbutton").style.backgroundColor = "rgb(17 24 39)"
        document.getElementById("postbutton").style.color = "rgb(156 163 175)"
        document.getElementById("postbutton").style.backgroundColor = ""
        document.getElementById("homebutton").style.color = "rgb(156 163 175)"



        const getapplicantsdata = async() =>{
            try {
                const response = await axiosPrivate.get('/getapplicants', {
                    withCredentials:true
                });
                console.log("here",(response.data.recordset));
                setApplicants(response.data.recordset);
            } catch (err){
                console.error(err);
            }
        }

        getapplicantsdata();
      },[axiosPrivate]);

  return (
    <div class="min-h-screen">
      <NavbarRecruiter />
      <div>
      {applicants?.length
                ?(
                    <ul>
                        {applicants.map((x, i) =>
                       <li className='py-8'>
                        <MiniatureApplicantsTemplate applicants={x} />
                       </li>
                        )}
                    </ul>
                ): <p></p>
            }
      </div>
    </div>
  )
}

export default Applicants
