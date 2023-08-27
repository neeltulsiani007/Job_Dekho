import React, { useState } from 'react'
import Hire from './Hire'
import { useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import MiniatureProfileTemplate from './MiniatureProfileTemplate';

function HirewithApplicants() {

    const axiosPrivate = useAxiosPrivate();
    const [intern,setIntern] = useState({});
   
    useEffect(() => {
        
        let isMounted = true;
        const controller = new AbortController();   
        console.log("object")


        const getinternsdata = async() =>{
            try {
                const response = await axiosPrivate.get('/getallinterns', {
                    signal: controller.signal,
                    withCredentials:true
                });
                console.log("here",(response.data.recordset));
                isMounted && setIntern(response.data.recordset) ;
            } catch (err){
                console.error(err);
            }
        }
    

     

        getinternsdata();

        return () => {
          isMounted = false;
          controller.abort();
      }
      },[axiosPrivate]);

  return (
    <div className=' '>
      <Hire />
      {intern?.length
                ?(
                    <ul>
                        {intern.map((x, i) =>
                        <li className='py-8'>  <MiniatureProfileTemplate profile={x}  /></li>
                      
                        )}
                    </ul>
                ): <p></p>
            }
    </div>
  )
}

export default HirewithApplicants
