import React from 'react'
import { useEffect } from 'react';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon ,UserCircleIcon ,PowerIcon } from '@heroicons/react/24/outline'
import Logo from './jobdekho.ico.png'
import { Link } from 'react-router-dom'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useState} from 'react'
import {TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { styled } from "@mui/material/styles";


function Hire(){

    const [options,setOptions] = useState([]);
    const axiosPrivate= useAxiosPrivate()

    useEffect(() => {
       
        document.getElementById("gethiredbutton").style.backgroundColor = "rgb(17 24 39)"
        document.getElementById("gethiredbutton").style.color = "white"
        document.getElementById("homebutton").style.backgroundColor = ""
        document.getElementById("projectsbutton").style.color = "rgb(156 163 175)"
        document.getElementById("projectsbutton").style.backgroundColor = ""
        document.getElementById("postbutton").style.color = "rgb(156 163 175)"
        document.getElementById("postbutton").style.backgroundColor = ""
        document.getElementById("homebutton").style.color = "rgb(156 163 175)"

        const getData = async()=>{
            await  axiosPrivate.get(`http://localhost:4000/users`).then((response) => {
              for(let i = 0;i<response.data.recordset.length;i++){
           options = response.data.recordset.skills[i].split(',')
              }
              setOptions(options)
            });
           }

           getData();
      },[axiosPrivate,options]);

      const navigation = [
        { name: 'Home', href: 'http://localhost:3000/recruiterhome', current:true ,id:"homebutton" },
        { name: 'Hire', href: 'http://localhost:3000/hirewithapplicants', current:false ,id:"gethiredbutton"},
        { name: 'Applicants', href: 'http://localhost:3000/applicants', current:false ,id:"projectsbutton"},
        { name: 'Post', href: 'http://localhost:3000/recruiterpostform', current:false ,id:"postbutton"},
      ]



      const StyledAutocomplete = styled(Autocomplete)({
 
        "&.MuiAutocomplete-inputFocused": {
          borderRadius:"40px"
        },

        "& .MuiFormControl-root": {
        borderRadius:"40px"
        },
       "& .MuiOutlinedInput-root": {      
        borderRadius:"40px"
       },

        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
         
          transform: "translate(34px, 20px) scale(1);"
        },
       
        "& .MuiAutocomplete-inputRoot": {
          color: "#030303",
          '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
            
            paddingLeft: 18
          },

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: " #32325d"
          },
          
        }
      });
      

      function classNames(...classes) {

        return classes.filter(Boolean).join('')
      }
      
    
      
  return (
    <Disclosure as="nav" className="bg-gray-800 font-sans">
    {({ open }) => (
      <>
        <div className="mx-auto max-w-screen px-2 sm:px-6 lg:px-8">
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
              <div className='mx-6'>
              <StyledAutocomplete
              size={"small"}
              freeSolo
              autoComplete
              style={{ width: 300}}
              //  className=' px-10  xl:w-[700px] lg:flex lg:w-[400px] h-10 text-lg bg-white  xl:flex rounded-2xl'
            
              options={options?options:[{label:"Loading..." }]}
              renderInput={(params) => (
              <TextField {...params}
            //   onChange={getData}
              style={{background:"white"}}
               variant="outlined"
              placeholder="Search here ..."
              /> )}
              />
            </div>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                {/* <img
                  className="block h-12 w-auto lg:hidden"
                  src={Logo}
                  alt="Your Company"
                /> */}
                <img
                  className="hidden h-12 w-auto lg:block"
                  src={Logo}
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block my-8">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                       to={item.href}
                       id = {item.id}
                       className={classNames(
                         'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div class="my-auto mx-auto"  id="search" >
             
             
              <StyledAutocomplete
              size={"small"}     
              freeSolo
              className='hidden lg:flex xl:w-[700px] lg:w-[400px]'
              autoComplete
              //  style={{ width: 700}}
              //  className=' px-10  xl:w-[700px] lg:flex lg:w-[400px] h-10 text-lg bg-white  xl:flex rounded-2xl'
              autoHighlight
              options={options?options:[{label:"Loading..." }]}
              renderInput={(params) => (
              <TextField {...params}
         
               style={{background:"whitesmoke"}}
               variant="outlined"
              placeholder="Search here ..."
              /> )}
              />
           
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
                          to="/profilesetting"
                          className= 'flex gap-1 hover:bg-gray-100  px-4 py-2 text-sm font-semibold text-gray-700'
                
                        >  
                        <UserCircleIcon 
                        class="h-5 w-5"
                        />
                          <span class="flex gap-5  mx-1">  Profile </span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
      
                      {({ active }) => (
                        <Link
                          to="/profilesetting"
                          className= 'flex gap-1 hover:bg-gray-100  px-4 py-2 text-sm font-semibold text-gray-700'
                        >
                          <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-gear h-5 w-5" viewBox="0 0 16 16">
                          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                          </svg>
                         <span class="flex gap-5  mx-1"> Settings </span>
                       
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
                                   <span class="flex gap-5  mx-1 text-red-500 "> Sign out </span>
                       
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
  </Disclosure>
  )
}

export default Hire
