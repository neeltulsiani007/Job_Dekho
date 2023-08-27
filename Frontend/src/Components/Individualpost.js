import React, { useState } from 'react'
import moment from "moment";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';


function Individualpost(){  

    let { id } = useParams();

  const [post,setPost] = useState({})
  // const [likedposts,setLikedposts] = useState()
  const [likes,setLikes] = useState()

  const axiosPrivate = useAxiosPrivate();
  
  useEffect(() => {

    const getindividualpost = async()=>{
   await  axiosPrivate.get(`http://localhost:4000/post/${id}`).then((response) => {
      console.log(response.data.recordset[0]);
      setPost(response.data.recordset[0])
      setLikes(response.data.recordset[0].countlikes)
    });
   
}

getindividualpost();

  }, [axiosPrivate,id]);

  //  const handlelike = async() =>
  // {
  //   const decoded = jwt_decode(auth.accessToken)
  //   console.log(decoded.number)
  //   const res = await axiosPrivate.post('http://localhost:4000/postlikes', {
  //   postid:post.postid,
  //   number:decoded.number
  // }, 
  // {
  //   withCredentials:true
  // });
  // console.log(likedposts)
  // if(res.data.liked)
  // {
  //   setLikes(likes+1)
  //   setLikedposts(1)
  // }
  // else
  // {
  //   setLikes(likes-1)
  //  setLikedposts(0)
  // }
  // }

  return (
    <div class="bg-gray-100 p-4 flex items-center justify-center">
    <div class="bg-white border rounded-sm  w-3/4 shadow-lg">
      <div class="flex items-center px-4 py-3">
        <img class="h-8 w-8 rounded-full"
        src={`http://localhost:4000/uploads/${post.profilephoto}`} 
          alt="loading"/>
        <div class="ml-3 ">
          <span class="text-sm font-semibold antialiased block leading-tight">{post.username}</span>
          <span class="  text-gray-600 text-xs block">{moment(post.date).format("DD-MM-YYYY")}</span>
        </div>
      </div>
      <img
      class="h-[82vh] w-full cursor-pointer " 
       src={`http://localhost:4000/uploads/${post.imagedata}`}
       alt="loading"/>
      {likes === 1?
      <div class="font-semibold text-sm mx-4 mt-2 mb-2">{likes} like</div>
    :<div class="font-semibold text-sm mx-4 mt-2 mb-2">{likes} likes</div>
     }
      <div class = "text-base font-Roboto mx-4 mb-3 "><span class = "text-base text-black font-semibold font-sans mr-2">{post.username}</span>{post.caption}</div>
    </div>
  </div>
  )
}

export default Individualpost