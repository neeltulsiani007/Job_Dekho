import React, { useState , useEffect,Fragment , useRef} from 'react'
import {BsEmojiSmile} from 'react-icons/bs'
import { MdOutlineAttachFile} from 'react-icons/md'
import {MdSend} from 'react-icons/md'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {HiOutlineMicrophone} from 'react-icons/hi'
import Logo from './jobdekho.ico.png'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import io from "socket.io-client";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon , UserCircleIcon , PowerIcon ,CameraIcon , VideoCameraIcon} from '@heroicons/react/24/outline'
import {
    Drawer,
    IconButton,
  } from "@material-tailwind/react";
  import { Link } from 'react-router-dom'
import { Modal } from '@mui/material'
import moment from 'moment'



function Chatting() {

  const [openLeft, setOpenLeft] = React.useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const openDrawerLeft = () => setOpenLeft(true);
  const closeDrawerLeft = () => setOpenLeft(false);
  const[message,setMessage] = useState("");
  const [chatid,setChatid] = useState("");
  const[user,setUser] = useState({});
  const[messages,setMessages] = useState({});
  const[selectedchat , setSelectedchat] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const [socket, setSocket] = useState(null)
  const[receiver,setReceiver] = useState({});
  const [conversations,setConversations] = useState([]);
  const [emojipicker , setEmojipicker] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const messageEl = useRef(null)
  
    
  useEffect(() => {

    const getuserprofile = async()=>{
        await axiosPrivate.get("http://localhost:4000/getuserprofile",
        {
         withCredentials:true
        }).then((response) => {
      
           console.log(response.data.recordset[0]);
           setUser(response.data.recordset[0]);
         }); 
     }
     const getconversations = async()=>{

      await axiosPrivate.get(`http://localhost:4000/getconversations`,
      {
       withCredentials:true
      }).then((response) => {

         console.log(response.data.recordset);
         setConversations(response.data.recordset);
       }); 
     }
     getuserprofile();
     getconversations();
    
    },[axiosPrivate]);

   
   useEffect(()=>{
    setSocket(io('http://localhost:4000'))
    
   },[])
  
      useEffect(() => {
        if(Object.keys(user).length === 0)
        {
          return
        }
        const handler = (data) => {
        setMessages((prev) => [...prev, {user: data.user,message:data.message , time:data.date }]);
        };
        console.log(user?user:"no user")
        socket?.emit('addUser', user?.number);
        console.log("reached 1")
        socket?.on('getUsers', users => {
        console.log('activeUsers :>> ', users);
        })
        socket.on('getMessage', handler);
      
        return () =>
        {
          console.log("inside return of useeffect ")
        socket.off('getMessage', handler)
        socket.disconnect();
        };
     
      }, [socket,user])



      useEffect(() => {
        if(Object.keys(messages).length === 0)
        {
          return
        }
        
        if (messageEl){
          console.log(messageEl)
          // if(!message){
          //   console.log("here first")
          //   messageEl?.current.lastChild?.scrollIntoView({ behavior: 'smooth' });
          // }
          messageEl.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }
        // if(!message && messageEl){
        //   console.log("here first")
        //   messageEl?.current.lastChild?.scrollIntoView({ behavior: 'smooth' });
        // }
        // else
        // {
        //     console.log("in else of scroll")
        //     messageEl?.current?.scrollIntoView({ behavior: 'smooth' });
        // }
      }, [messages])

    

      function classNames(...classes) {
        return classes.filter(Boolean).join('')
      }

      const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setMessage(message + emoji);
      };

      const getconversations = async()=>{

        await axiosPrivate.get(`http://localhost:4000/getconversations`,
        {
         withCredentials:true
        }).then((response) => {
  
           console.log(response.data.recordset);
           setConversations(response.data.recordset);
           setChatid(response.data.recordset[0].chatid)
         }); 
       }


  const handleFilter = async(event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    console.log("here")
    console.log(searchWord)
    const response = await axiosPrivate.post('/getinternsbystring',
    {search:searchWord},
    {
        withCredentials:true
    });
    console.log(response.data.recordset)

    var newFilter = response.data.recordset
   
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  
  };

  const handleProfileclick = ()=>{
    if(receiver?.skills)
    {
      navigate(`/internprofile/${receiver?.number}`)
    }
    else
    {
      navigate(`/recruiterprofile/${receiver?.number}`)
    }
  }

  const handleGohome = ()=>{
    socket.disconnect()
    if(user.skills)
    {
      navigate('/home')
    }
    else{
      navigate('/recruiterhome')
    }
  }

      const sendmessage = async(e)=>
      {
        if(e.key === 'Enter' && !message)
        {
          e.preventDefault();
          return
        }

        console.log(messages)
        console.log(message)
        console.log(user)
        console.log(receiver)
        e.preventDefault();

        var date = moment(new Date()).format('MMMM Do YYYY, h:mm a');

     
      
       await axiosPrivate.post(`http://localhost:4000/sendmessage`,
       {
        conversationId:chatid,
        senderId : user.number,
        receiverId : receiver.number,
        message : message
       },
       {
        withCredentials:true
       }).then(() => {
          console.log("Message sent");
          setMessage("")
        });

        socket?.emit('sendMessage', {
          senderId: user?.number,
          receiverId: receiver?.number,
          message,
          date,
          conversationId: chatid
        });

        if(chatid === "new")
        {
          getconversations()
         
        }

      }

    

    const fetchMessages = async(cid,receiver) =>{

      console.log(cid,receiver)
      setReceiver(receiver)
      setChatid(cid)
      setSelectedchat(receiver)
      

      await axiosPrivate.get(`http://localhost:4000/getmessagesbychatid/${cid}?senderId=${user?.number}&&receiverId=${receiver?.number}`,
        {
         withCredentials:true
        }).then((response) => {
  
           console.log(response.data);
           setMessages(response.data);
         }); 

     
         
    }

  return (
  <div className=' bg-white '>


    <div className=' w-full '>
    <div>
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-screen px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
             
                <div className="hidden sm:ml-6 sm:block my-8">
                  <div className="flex space-x-4">
                 
                      <Menu as="div" className="relative ">
                  <div >
                
                    <Menu.Button  id="searchbutton" 
                    onClick={openDrawerLeft}
                    className= 'font-sans  bg-white  flex gap-1 rounded-md border-2 border-black  px-4 py-2 text-base font-medium  text-gray-800'>
                      <span className="sr-only">Open drawer</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                      class="bi bi-search w-4 h-4  mr-1 mt-1" 
                      viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                     Search
                    </Menu.Button>
                  </div>       
                </Menu>
                    
                  </div>
                </div>
                <div
                onClick={handleGohome}
                class="my-auto mx-auto text-white font-sans text-lg font-bold cursor-pointer "   >
               JobDekho
              </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

    
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                    
                      <img
                      className="h-10 w-10 rounded-full"
                      src={Logo}    
                      alt=""
                    />
                   
                    </Menu.Button>
                  </div>
                  <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                        to={`${user?.skills?"/internprofilesetting":"/profilesetting"}`}
                          className= 'flex gap-1 hover:bg-gray-100  px-4 py-2 text-sm font-semibold text-gray-700'
                
                        >  
                        <UserCircleIcon 
                        class="h-5 w-5"
                        />
                          <span class="flex gap-5 font-sans  mx-1">Profile</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                        to={`${user?.skills?"/internprofilesetting":"/profilesetting"}`}
                          className= 'flex gap-1 hover:bg-gray-100  px-4 py-2 text-sm font-semibold text-gray-700'
                        >
                          <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-gear h-5 w-5" viewBox="0 0 16 16">
                          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                          </svg>
                         <span class="flex gap-5 font-sans mx-1"> Settings </span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/logout"
                          className= ' hover:bg-red-500/10 flex gap-1 hover:bg-gray-100  px-4 py-2 text-sm font-semibold text-gray-700'
                        >
                            <PowerIcon
                            class="h-5 w-5 text-red-500"
                            strokeWidth={2}     
                            />
                                   <span class="flex gap-5 font-sans mx-1 text-red-500 "> Sign out </span>
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
                </Menu>
              </div>
            </div>
          </div>

        </>
      )}
    
      {/* <div className="flex flex-wrap gap-4">
     <Button onClick={openDrawerLeft}>Open Drawer Left</Button>
      </div> */}
    

    </Disclosure>
    <div class="">
      <Drawer
        placement="left"
        open={openLeft}
        
        onClose={closeDrawerLeft}
        className="p-4 w-72 "
      >
        <div class="w-full h-12 justify-end items-end flex">
          <IconButton
            variant="text"
            className=''
            color="blue-gray"
            onClick={closeDrawerLeft}
          >
            <XMarkIcon strokeWidth={2} className="h-7 w-7 " />
          </IconButton>
          </div>
        <div className="mb-6 flex items-center justify-between">
          
            <div class="mt-4 ">
            <div className="search items-center justify-center  mx-1 ">
      <div className="searchInputs flex w-60 border-2  ">
        <input
        className="w-54 font-serif  focus:border-none border-none"
          type="text" 
          placeholder={"Search User"}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon  ">
          {filteredData.length === 0 ? (
            <SearchIcon
            className="text-gray-400 mx-3 mb-[2px]"
         
            />
          ) : (
            <CloseIcon 
            className="text-gray-400 cursor-pointer mx-3 mb-[2px]"
            id="clearBtn"
             onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult w-60  bg-zinc-50 ">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
                <div 
                onClick={()=>{fetchMessages('new',value);closeDrawerLeft()}}
                class={`w-60  border-[1px] border-zinc-100 ${value.number===user.number?"hidden pointer-events-none":"flex cursor-pointer"} h-14 text-lg bg-zinc-50 hover:bg-zinc-100 `}>
                {/* <p class="w-60 border-[1px] h-12 text-lg font-sans hover:bg-zinc-200 border-zinc-100">{value.name}</p> */}
                <div className='w-1/4 flex items-start h-full my-2 justify-start ml-3'>
                    <img
                    className='rounded-full h-10 w-10  '
                     src={`http://localhost:4000/uploads/${value?.profilephoto?value?.profilephoto:"defaultuser.png"}`} 
                    />
                    </div>
                    <div className='w-3/4 flex items-center mx-1 justify-start  text-lg font-sans'>
                        {value.name.substring(0,1).toUpperCase() + value.name.substring(1,value.name.length)}
                     </div>
                </div>
             
            );
             
          })}
        </div>
      )}
    </div>
        </div>
        </div>
      </Drawer>
    </div>
    </div>
    </div>
    <div class="w-full flex h-[750px] px-4 mx-0 lg:mx-12 pt-6   ">
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <div className='absolute top-[303px] left-1/3'>
       <Picker data = {data} onEmojiSelect={addEmoji}
       />
       </div>  
        </Modal>
    <div className='w-1/3 bg-[#f8f8f8] overflow-y-scroll h-full border-[1px] border-[#c4c4c4] hidden lg:block '>

        <div class="w-full flex h-[12%] font-normal font-sans text-xl text-left pl-5">

        <div className=' flex w-full pt-8 text-[#464646] font-medium'>
        <h4> Conversations ({conversations?.length}) </h4>
            </div>
          
            <div className=' flex w-1/6  justify-end pt-5'>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor"
             class="bi bi-three-dots-vertical w-6 h-6 mr-2 mb-2" 
            viewBox="0 0 16 16">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
            </div>
            </div>
  
            
            <div className='w-full h-[88%] overflow-scroll'>

            <ul className='  '>
                         
                         {conversations.length
                         ?(
                         <li>
                     {conversations.map((x,i) =>
                       <div class={`w-full mx-auto  border-b-[1px] ${selectedchat.number===x.user?.number?"bg-[#ebebeb]":"bg-[#f8f8f8]"} ${i==0 &&'border-t-[1px] '}  border-[#c4c4c4]   cursor-pointer hover:bg-[#ebebeb] h-24 `}
                       onClick={() => fetchMessages(x.chatid, x.user)}
                       >
                       <div class="flex w-full h-full   justify-between ">
                           <div className='flex w-1/6 items-center '>    
                        <img
                     
                       src={`http://localhost:4000/uploads/${x.user?.profilephoto?x.user?.profilephoto:"defaultuser.png"}`} 
                        className='rounded-full h-12 w-12 mx-4 flex'
                        />
                        </div>
                        <div className='w-5/6 h-full flex flex-col'>
                         <div class={`w-full h-1/2  flex flex-row text-[#464646] font-sans ${!x.latestmessage?  'text-xl ' : 'text-lg' } `}>
                           <div className='px-1 pt-5  font-semibold flex w-2/3 h-full'>
                      {x.user.name}
                           </div>
                           <div class="justify-end pr-4 pt-3  flex w-1/3 h-full font-semibold text-[#464646]  text-[13px]">
                          {x.latestdate?x.latestdate.split(',')[1]:""}
                         </div>
                         </div>
                         <div className='w-full h-1/2  text-[14px] font-sans text-[#989898] pl-1 pr-3 '>
                         <p>{x.latestmessage?(x.latestmessage.length>90?(x.latestmessage.substring(0,95)+" ..."):x.latestmessage):""}</p>
                         {/* <p>lorem ipsum dcvkfndcjsuv ikdvnsi divhdich dvndsixh divhduch</p> */}
                         </div>
                         </div> 
                       </div>
                     </div>
                          )}
                      </li>
             ):
              <div class="text-lg pb-2 text-gray-600 font-sans pl-7 pr-3  ">
                No Conversations .
                
                 Search for users and create a new conversation. 
                </div>
         }  
                    </ul> 
                    </div>
   </div>


   
   <div className=' w-[100%] border-l-[1px] lg:border-l-[0px]  lg:w-3/5 flex flex-col  h-full border-r-[1px] border-t-[1px] border-b-[1px] bg-gray-50 border-[#c4c4c4]'>

    <div className='h-[8%] flex border-b-2 border-gray-200 bg-white'>

    <div className='w-[7%] pl-3  flex h-full'>
    <img 

       onClick={handleProfileclick}
    className={`h-10 my-auto w-10 cursor-pointer  rounded-full border-none ${!receiver.name?"hidden":"flex"} `}
    src={`http://localhost:4000/uploads/${receiver?.profilephoto?receiver?.profilephoto:"defaultuser.png"}`} 
    />
  </div>

  <div className='w-[86%] h-full flex justify-start text-[19px] py-3 pl-2 text-[#464646] font-sans font-semibold'>
  {receiver.name}
  </div>

  <div className='w-[7%] h-full items-center flex  '>
    <BsThreeDotsVertical 
    class={`text-gray-700 ml-3 cursor-pointer ${!receiver.name?"hidden":"flex"}`}
    />
  </div>


</div>
        {/* start */}
    {messages.length
                         ?(
                          <div class="h-[82%] overflow-scroll "
                          ref={messageEl}
                          >
                          {messages.map((x,i) =>

           <div class={`${i===0?"pt-7":"pt-2"} ${x.user.number !== user.number?"flex w-full ml-3 space-x-3 max-w-xs":"flex w-full  mr-3 space-x-3 max-w-xs ml-auto  justify-end"}`}>
              <div class="flex-shrink-0 h-10 w-10 rounded-full ">
               <img
                src={`http://localhost:4000/uploads/${x.user?.profilephoto?x.user?.profilephoto:"defaultuser.png"}`}
                className={`w-full h-full rounded-full ${x.user.number === user.number && "hidden"}`}
               />
              </div>
              <div>
                <div class={` ${x.user.number === user.number?"bg-blue-600 text-white p-3 -mb-2 rounded-l-lg rounded-br-lg " :"bg-gray-300  p-3 -mb-2  rounded-r-lg rounded-bl-lg" }  `}>
                  <p class="text-sm font-sans ">{x.message}</p>
                </div>
                <span class="text-xs  text-gray-500 leading-none font-sans">{x.time?(x.time.split(',')[1] ) :""}</span>
              </div> 

            </div> 
          )}
          </div>
     
             ):
            
             <div class={`h-[82%] w-full font-serif text-2xl font-medium items-center justify-center  ${!receiver.name?"bg-gray-800":"bg-gray-50"}  flex`}>
                <div class={`${receiver.name?"flex ":"hidden"}`}>No Messages</div>
              <div class={`h-full ${!receiver.name?"flex flex-row":"hidden"} -space-x-14 w-full items-center justify-center  text-white `}>
              <div className='h-full w-1/2 flex items-center justify-center'>
               <img src={Logo} 
               className='mx-auto  w-96 h-96    '
               />
               </div>
               <div class="h-full  w-1/2    flex flex-col justify-center ">
               <div className=' '> No Conversation Selected .</div>
                <div className=''>Select an User to open a Conversation . </div>
                </div>
                </div>
            
             </div>

    }
             
    

    <div className={`h-[10%] bg-white w-full  ${receiver.name?"flex":"hidden"}  items-center border-gray-200 border-t-2`}>
      

      <div className='flex w-full h-full' >
       <div className='h-full w-[8%] ml-3 flex items-center justify-center space-x-2'>

         <BsEmojiSmile 
         onClick={handleOpen}
         className='h-6 w-6 text-gray-500 cursor-pointer  '
         />
         <MdOutlineAttachFile
               className='h-6 w-6 mr-1  text-gray-500 cursor-pointer'
         />
       </div>
  
      
       <div className='h-full w-[82%] flex ml-1  py-3'>

        <textarea 
        className='h-full  w-full text-sm placeholder:text-xs  border-gray-300  placeholder-gray-400  font-sans '
        style={{resize:"none"}}
        onKeyDown={(e)=>{e.key==="Enter"?sendmessage(e):console.log("Not enter")}}
        value={message}
        onChange={(e)=>{setMessage(e.target.value)}}
        placeholder='Type message here ...'
        />

       </div>
       <div className='h-full w-[6%] flex items-center ml-4 mr-1'>
        <button className='rounded-full h-10 w-10 bg-blue-600  '>
          <MdSend 
          onClick={sendmessage}
          className={`h-6 w-6 text-white ml-[9px] ${!message && "hidden"}`}
          />
          <HiOutlineMicrophone
           className={`h-6 w-6 text-white ml-[8px] ${message && "hidden"}`}
          />
        </button>
       </div>
      </div>
       
    </div>
   </div>
   </div>
   
   </div>
  )
}

export default Chatting
