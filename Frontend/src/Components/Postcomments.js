import React, { useState } from 'react'
import moment from "moment";
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth'
import jwt_decode from "jwt-decode";


import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Postcomments(){  
  let { id } = useParams();
  const {auth} =  useAuth();
  const photo = "defaultuser.png"
  const[newcomment,setNewcomment] = useState("")
  const[comments,setComments] = useState(["comments,now"])
  const [user,setUser] = useState({})
  const axiosPrivate = useAxiosPrivate();
  

  useEffect(() => {
   
      const getuserdata = async() =>{

        await  axiosPrivate.get(`http://localhost:4000/getuser`).then((response) => {
          console.log(response.data.recordset[0]);
          setUser(response.data.recordset[0])

        }); 

      }


//     const getindividualpost = async()=>{
//    await  axiosPrivate.get(`http://localhost:4000/post/${id}`).then((response) => {
//       console.log(response.data.recordset[0]);
//       setPost(response.data.recordset[0])
//       setLikes(response.data.recordset[0].countlikes)
//     }); 
// }
const getcomments= async()=>{
    await  axiosPrivate.get(`http://localhost:4000/comments/${id}`).then((response) => {
       console.log(response.data.recordset);
       setComments(response.data.recordset.reverse())
     }); 
 }
getuserdata();
getcomments();

  },[axiosPrivate,id]);

   

  const addcomment =async()=>{
    console.log("inside addcomment")
    await  axiosPrivate.post(`http://localhost:4000/addcomments/${id}`,{
       comment:newcomment,
    },{
        headers: { accessToken: auth.accessToken },
        withCredentials:true
    })
     ; 
     const decoded = jwt_decode(auth.accessToken);
     const date = new Date();
     const commentoadd = {
        username : decoded.name ,
        comment:newcomment,
        date:date,
        profilephoto:user.profilephoto
    }
    console.log(commentoadd)
     setComments([ commentoadd,...comments ])
     setNewcomment("")
  }

  return (
<div class="bg-gray-200 min-h-screen  py-8 lg:py-16 flex-col font-sans">
  <div class="max-w-2xl mx-auto px-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 ">Comments</h2>
    </div>
    <form class="mb-6">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea id="comment" rows="6"
              value={newcomment}
              onChange={(e)=>{setNewcomment(e.target.value)}}
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                placeholder="Write a comment..." required></textarea>
        </div>
        <button type="button"
        onClick={addcomment}
           class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg bg-gray-700  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-800">
            Post comment
        </button>
    </form>
                    {comments.map((x, i) =>
         <div class="p-6 mb-6 text-base bg-white rounded-lg ">
        <div class="flex justify-between items-center mb-2">
            <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-gray-900 font-sans font-semibold">
                  {x.profilephoto?
                  <img
                        class="mr-2 w-6 h-6 rounded-full"
                        src={`http://localhost:4000/uploads/${x.profilephoto}`}
                        alt="loading ..." />
                        :
                        <img
                        class="mr-2 w-6 h-6 rounded-full"
                        src={`http://localhost:4000/uploads/${photo}`}
                        alt="loading ..." />
                  }
                        {x.username}</p>
                <p class="text-sm text-gray-600 ">{moment(x.commentdate).format("DD-MM-YYYY")}</p>
            </div>
          
        </div>
        <p class="text-gray-500 ">{x.comment}</p>
       </div>)
       }
        </div>
   

</div>
  )
}

export default Postcomments