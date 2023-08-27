import React, { useState } from 'react'
import { useEffect } from 'react';
import Post from './Post';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import NavbarRecruiter from "./NavbarRecruiter"

function Recruiterhome()  {

     const [post,setPost] = useState([]);
     const [likedpost,setLikedpost] = useState([]);
     const axiosPrivate = useAxiosPrivate();  
     const[user,setUser] = useState({})


    useEffect(() =>{
        
        let isMounted = true;
        const controller = new AbortController();   
        console.log("object")
        const getuserdata = async() =>{
            try {
                const response = await axiosPrivate.get('/getuser', {
                    signal: controller.signal,
                    withCredentials:true
                });
                console.log("here",(response.data.recordset[0]));
                isMounted && setUser(response.data.recordset[0]) 
            } catch (err){
                console.error(err);
            }
        }
        
        const getpostdata = async() => {
            try {
                const response = await axiosPrivate.get('/getpost', {
                    signal: controller.signal,
                    withCredentials:true
                });
                console.log("here",(response.data.recordset));
                isMounted && setPost(response.data.recordset.reverse());
            } catch (err) {
                console.error(err);
            }
        }

        const getlikedpostdata = async() =>{
      

            try {
                //  decoded = jwt_decode(auth.accessToken)
           
                const res = await axiosPrivate.get('/updatelikes',
               {
                    signal: controller.signal,
                    withCredentials:true
                }
                );
                console.log("here",(res.data.recordset));
                isMounted && setLikedpost(res.data.recordset)
            } catch (err) {
            console.log('error');
            }
        }

        getuserdata();
        getlikedpostdata();
        getpostdata();
        document.getElementById("projectsbutton").style.backgroundColor = ""
        document.getElementById("projectsbutton").style.color = "rgb(156 163 175)"
        document.getElementById("homebutton").style.backgroundColor = "rgb(17 24 39)"
        document.getElementById("homebutton").style.color = "white"
        document.getElementById("gethiredbutton").style.backgroundColor = ""
        document.getElementById("postbutton").style.color = "rgb(156 163 175)"
        document.getElementById("postbutton").style.backgroundColor = ""
        document.getElementById("gethiredbutton").style.color = "rgb(156 163 175)"
        return () => {
          isMounted = false;
          controller.abort();
      }
      },[axiosPrivate]);

  return (
    <div>
       
      <NavbarRecruiter />
     
      
      {post?.length
                ?(
                    <ul>
                        {post.map((x, i) =>
                        <Post  post = {x} likedpost = {likedpost}  user = {user}/>)}
                    </ul>
                ): <p></p>
            }
    </div>
  )
}

export default Recruiterhome

