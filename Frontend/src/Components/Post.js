import React, { useState , useRef  } from 'react'
import moment from "moment";
import { useEffect } from 'react';
import {FaHeart } from 'react-icons/fa';
import {FiHeart} from 'react-icons/fi';
import useAuth from '../hooks/useAuth'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import LazyLoad from 'react-lazyload';
import { useContext } from 'react';
import { MuteContext } from '../context/MuteProvider';

function Post({post,likedpost}){    
  

  const {auth} =  useAuth(); 
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null); 
  const navigate = useNavigate();
  const [likes,setLikes] = useState(post.countlikes)
  const photo = "defaultuser.png";
  const [likedposts,setLikedposts] = useState([likedpost])
  const axiosPrivate = useAxiosPrivate();
  const {muted,setMuted} = useContext(MuteContext)

  useEffect(() => {

    setLikedposts(likedpost.map(function (obj) {
      return obj.postid;
    }
    ));
  },[likedpost]);  
  
  useEffect(() => {
    console.log(muted)
    if(post.filetype === "video"){
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("first")
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "0px" ,
    threshold :0.8} 
    );
    console.log(isIntersecting);

    observer.observe(ref.current);
    return () => {
      console.log("finally third")
      console.log(ref.current)
      if(ref.current){
      console.log("here")
      console.log(ref.current.children[0].children[0].muted)
      if(!ref.current.children[0].children[0].muted)
      {
        console.log("setting false")
        setMuted(false)
      }
      else
      {
        console.log("setting true")
        setMuted(true)
      }
      ref.current.children[0].children[0].pause();
      } 
      observer.disconnect();
    }
    } 
  },[isIntersecting]);  

  useEffect(()=>{
    console.log("second")
    console.log(muted + " at 73")
    if (isIntersecting){
    ref.current.children[0].children[0].play();
    console.log("muted value is "+ muted)
    } 
    else{ 
      console.log("here")
      console.log(ref.current)
    }
  }, [isIntersecting,muted]);

   const handlelike = async()=>
  {
    const decoded = jwt_decode(auth.accessToken)
    console.log(decoded.number)
    const res = await axiosPrivate.post('http://localhost:4000/postlikes', {
    postid:post.postid,
    number:decoded.number
  }, 
  {
    withCredentials:true
  });
  if(res.data.liked)
  {
    setLikes(likes+1)
    setLikedposts([...likedposts,post.postid])
  }
  else
  {
    setLikes(likes-1)
    let newlikedpost = likedposts.filter((num) => num !== post.postid);
    setLikedposts([newlikedpost])
  }
  }


  return (

    <div class="bg-gray-100 p-4 flex items-center justify-center">
           <link
  rel="stylesheet"
  href="https://video-react.github.io/assets/video-react.css"
/>
    <div class="bg-white border rounded-sm lg:w-1/2 md:w-2/3 xl:w-1/2 w-full shadow-lg">
      <div class="flex items-center px-4 py-3"
      >
        {post.profilephoto?
        <img class="h-8 w-8 rounded-full cursor-pointer"
        onClick={()=>{navigate(`/internprofile/${post.usernumber}`)}}
        src={`http://localhost:4000/uploads/${post.profilephoto}`}  
         alt="loading ..."/>
         :
         <img class="h-8 w-8 rounded-full"
        src={`http://localhost:4000/uploads/${photo}`}  
         alt="loading ..."/>
        }
        <div class="ml-3 ">
          <span
          onClick={()=>{navigate(`/internprofile/${post.usernumber}`)}}
          class="text-sm cursor-pointer font-semibold antialiased font-sans block leading-tight">{post.username}</span>
          <span class="text-gray-600 text-xs font-sans block">{moment(post.date).format("DD-MM-YYYY")}</span>
        </div>
      </div>

      {post.filetype==="photo"?
      <div className='min-h-[73vh]  w-full'
      >
      <LazyLoad>
      <img
     className = "video-container" 
      class="object-cover h-[73vh] w-full" 
      src={`http://localhost:4000/uploads/${post.imagedata}`} 
      alt="loading"
      onClick={()=>{navigate(`/post/${post.postid}`)}}
      />
      </LazyLoad>
      </div>
      :
      <div className='min-h-[73vh] w-full'
      ref={ref}
      >
   
      <LazyLoad>
       <video
       muted = {muted}
       className = "video-container" 
    class='object-cover h-[73vh] w-full'
    controls 
    src={`http://localhost:4000/videos/${post.imagedata}`} 
    >

      </video>
      </LazyLoad>
      </div>
      }
      
  
      <div class="flex items-center justify-between mx-4 mt-3 mb-2">
        <div class="flex gap-5">
        
       {likedposts.includes(post.postid)?
        <FaHeart color='red'
        size="1.7rem"
          class='cursor-pointer'
        id='liked' onClick={handlelike}
        />
        :
        <FiHeart
        strokeWidth={1.2}
       size="1.7rem"
        class='cursor-pointer '
        onClick={handlelike}
        id="unliked"
        />
       }
          <svg fill="#262626" 
          height="24"
          onClick={()=>{navigate(`/comments/${post.postid}`)}}
          class="cursor-pointer"
           viewBox="0 0 48 48" width="24">
            <path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd">
            </path></svg>
        </div> 
      </div>
     
      {likes === 1?
      <div class="font-semibold font-sans text-sm mx-4 mt-2 mb-2">{likes} like</div>
      :<div class="font-semibold font-sans text-sm mx-4 mt-2 mb-2">{likes} likes</div>
      }
      <div class = "text-base font-sans mx-4 -mb-1  "><span class = "text-base text-black font-semibold font-sans mr-2">{post.username}</span>{post.caption}</div>
      { 
      post.countcomments?
      <div className='mb-2'>
        <span
        onClick={()=>{navigate(`/comments/${post.postid}`)}}
        class="text-base  mx-4 text-gray-400 cursor-pointer hover:text-gray-500 font-sans ">View all {post.countcomments } comments</span>
      </div>
      :
      <div className='mb-3'></div>
}
    </div>
  </div>
  )
}

export default Post