import React, { useState , useContext } from 'react'
import NavbarIntern from './NavbarIntern';
import { useEffect } from 'react';
import Post from './Post';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { MuteContext } from '../context/MuteProvider';
import { useRef } from 'react';
import {Oval} from 'react-loader-spinner'



function Home()  {

     const [post,setPost] = useState([]);
     const [likedpost,setLikedpost] = useState([]);
     const axiosPrivate = useAxiosPrivate();  
     const[user,setUser] = useState({})
     const ref = useRef(null);
     const [isloading,setIsloading ] = useState(false)
     const[started,setStarted] = useState(false)
     const [isIntersecting, setIsIntersecting] = useState(false);
     const {muted,setMuted} = useContext(MuteContext)
     const [page,setPage] = useState(0);

    //  useEffect(()=>{
         
    //     console.log("here once")
    //     getpostdatafirsttime();
        
    //   }, []);

    //  const getpostdata = async () => {
    //     setStarted(false)
    //     console.log("inside getpostdata")
    //     setIsloading(true)
    //     console.log(page)
    //     try {
    //        await axiosPrivate.get(`/getpostsbyoffset/${page}`, {
    //             withCredentials:true
    //         }).then(response=> {
    //             console.log("here",(response.data.recordset));
    //         // isMounted && 
    //         setPost(prev => [...prev, ...response.data.recordset])  
    //         console.log(response.data.hasMore)
    //     })
    //     setPage(prevPage => prevPage + 1);

    //     } catch (err) {
    //         console.error(err);
    //     }finally{
    //         setIsloading(false)
    //     }
    //     setStarted(true)
    // }
   
    // const getpostdatafirsttime = async () => {
    //     console.log("inside getpostdatafirstime")
    //     setIsloading(true)
    //     console.log(page)
    //     try {
    //        await axiosPrivate.get(`/getpostsbyoffset/${0}`, {
    //             withCredentials:true
    //         }).then(response=> {
    //             console.log("here",(response.data.recordset));
    //         // isMounted && 
    //         setPost(response.data.recordset)  
    //     })
    //     setPage(prevPage => prevPage + 1);
    //         // console.log("here",(response.data.recordset));
    //         // isMounted && 
    //         // setPost(response.data.recordset.reverse());
    //     } catch (err) {
    //         console.error(err);
    //     }finally{
    //         setIsloading(false)
    //     }
    //     setStarted(true)
    // }
    
    useEffect(() => {
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
                isMounted && setUser(response.data.recordset[0]) ;
            } catch (err){
                console.error(err);
            }
        }

    
      const getpostdata = async () => {
       
        console.log("inside getpostdata")
        setIsloading(true)
        console.log(page)
        try {
           await axiosPrivate.get(`/getpost`, {
                withCredentials:true
            }).then(response=> {
                console.log("here",(response.data.recordset));
            // isMounted && 
            setPost(response.data.recordset.reverse())  
        
        })
        } catch (err) {
            console.error(err);
        }finally{
            setIsloading(false)
        }
    }
       

        const getlikedpostdata = async() =>{

            try {        
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

        getpostdata();
        getuserdata();
        getlikedpostdata();
       

        document.getElementById("homebutton").style.backgroundColor = "rgb(17 24 39)"
        document.getElementById("homebutton").style.color = "white"
        document.getElementById("gethiredbutton").style.backgroundColor = ""
        document.getElementById("projectsbutton").style.color = "rgb(156 163 175)"
        document.getElementById("projectsbutton").style.backgroundColor = ""
        document.getElementById("postbutton").style.color = "rgb(156 163 175)"
        document.getElementById("postbutton").style.backgroundColor = ""
        document.getElementById("gethiredbutton").style.color = "rgb(156 163 175)"
        return () => {
          isMounted = false;
          controller.abort();
      }
      },[axiosPrivate]);

        
//   useEffect(() => {

//     if(started){
  
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         console.log("homepage")
//         setIsIntersecting(entry.isIntersecting);
//         console.log("intersecting is "+entry.isIntersecting)
//         if(entry.isIntersecting)
//         {
//         getpostdata();
//         }
//       },
//       { rootMargin: "0px" ,
//     threshold:1} 
//     );
//     console.log(isIntersecting);

//     observer.observe(ref.current);
//     return () => {
//       observer.disconnect();
//     }
//         }
//   },[isIntersecting,started]);  



    

  return (
    <div>
       
      <NavbarIntern />
      {post?.length
                ?(
                    <ul>
                        {post.map((x, i) =>
                        <Post  post = {x} likedpost = {likedpost}  user = {user}/>)}
                    </ul>
                ): <p></p>
            }
       {isloading && <div>
            <Oval
                height="80" 
                width="80" 
                radius="9"
                color="black" 
                 wrapperStyle={{
                 marginLeft:"45%",
                }}
              />
              </div>
            }
             <div
             ref={ref}
             ></div>
    </div>
   
  )
}

export default Home

