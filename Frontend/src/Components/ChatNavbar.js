import { Fragment,useState } from 'react'
import React from 'react';
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon , UserCircleIcon , PowerIcon ,CameraIcon , VideoCameraIcon} from '@heroicons/react/24/outline'
import {
    Drawer,
    Button,
    Typography,
    IconButton,
  } from "@material-tailwind/react";
  import useAxiosPrivate from '../hooks/useAxiosPrivate';

import Logo from './jobdekho.ico.png'
import { Link } from 'react-router-dom'


function classNames(...classes) {


  return classes.filter(Boolean).join('')
}

export default function ChatNavbar(){

  const [openLeft, setOpenLeft] = React.useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const openDrawerLeft = () => setOpenLeft(true);
  const closeDrawerLeft = () => setOpenLeft(false);
  const axiosPrivate = useAxiosPrivate();

 
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


const navigation = [
  { name: 'Home', href: 'http://localhost:3000/home', current:true ,id:"homebutton" },
  { name: 'Get Hired', href: 'http://localhost:3000/gethiredwithpost', current:false ,id:"gethiredbutton"},
  { name: 'Projects', href: 'http://localhost:3000/users', current:false ,id:"projectsbutton"},
]
  return (

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
                    {/* {navigation.map((item) => (
                      <Link
                        key={item.name}
                         to={item.href}
                         id = {item.id}
                         className={classNames(
                          'text-gray-300 font-sans hover:bg-gray-700  hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))} */}
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
                <div class="my-auto mx-auto text-white font-sans text-lg font-bold "   >
               JobDekho
              </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

    
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
                          to="/internprofilesetting"
                          className= 'flex gap-1 hover:bg-gray-100  px-4 py-2 text-sm font-semibold text-gray-700'
                
                        >  
                        <UserCircleIcon 
                        class="h-5 w-5"
                        />
                          <span class="flex gap-5 font-sans  mx-1">  Profile </span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
      
                      {({ active }) => (
                        <Link
                        to="/internprofilesetting"
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

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-2 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  id={item.id}
                  className={classNames(
                    'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
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
                <div class="w-60 cursor-pointer border-[1px] border-zinc-100 flex h-14 text-lg bg-zinc-50 hover:bg-zinc-100 ">
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

  )
}

