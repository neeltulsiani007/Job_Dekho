import React, { useState } from 'react'
import Gethired from './Gethired'
import Recruiterposttemplate from './Recruiterposttemplate'
import { useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';


function Gethiredwithpost() {

    const[appliedpost,setAppliedpost] = useState({});
   const[post,setPost] = useState({});
   const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        
        let isMounted = true;
        const controller = new AbortController();   
        
        
        const getappliedpostdata = async() =>{
      

            try {
               
           
                const res = await axiosPrivate.get('/updateapplicants',
               {
                 
                    signal: controller.signal,
                    withCredentials:true
                }
                );
                console.log((res.data.recordset));
                isMounted && setAppliedpost(res.data.recordset)
            } catch (err) {
            console.log('error');
            }
        }

        const getpostdata = async () => {
            try {
                const response = await axiosPrivate.get('/getrecruiterpost', {
                    signal: controller.signal,
                    withCredentials:true
                });
                console.log((response.data.recordset));
                isMounted && setPost(response.data.recordset.reverse());
            } catch (err) {
                console.error(err);
            }
        }
    
       getappliedpostdata();
       getpostdata();
    
        return () => {
          isMounted = false;
          controller.abort();
      }
      },[axiosPrivate]);



  return (
    <div >
      <Gethired />
     {post?.length
               ?(
                   <ul>
                       {post.map((x, i) =>
                       <Recruiterposttemplate  post = {x} appliedpost = {appliedpost}/>)}
                   </ul>
               ): <p></p>
           }
        
    </div>
  )
}

export default Gethiredwithpost
