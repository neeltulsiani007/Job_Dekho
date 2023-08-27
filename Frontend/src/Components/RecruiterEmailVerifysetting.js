import React, { useEffect, useState } from "react";
import {SlLock,SlUser,SlHome,SlLogout} from "react-icons/sl"
import { AiOutlineMail,AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import Emailverification from "./Emailverification";


function RecruiterEmailVerifysetting(){
  const menus = [
    { name: "Home", link: "/recruiterhome", icon: SlHome ,id:"home"},
    { name: "Profile", link: "/profilesetting", icon: SlUser ,id:"profile"},
    { name: "Change Password", link: "/recruiterchangepasswordsetting", icon: SlLock ,id:"changepassword"},
    { name: "Email Verification", link: "/recruiteremailverifysetting", icon: AiOutlineMail , id:"emailverify"},
    { name: "Logout", link: "/logout", icon: SlLogout , id:"logout"},
   
  ];
  const [open, setOpen] = useState(false);


 


  return (
    <div className="flex  ">
      <div
        className={`bg-gray-800 min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div >
        <div className="py-3 flex  justify-end">
          <AiOutlineMenu
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
           
            <Link
              to={menu?.link}
           
              id={menus?.id}
              className={` ${
                menu?.id==="emailverify" && "bg-gray-600"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 rounded-md hover:bg-gray-600 `}

            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    
      <div className=" text-xl w-full bg-gray-200 font-semibold">
       <Emailverification />
      </div>

    </div>
  );
};

export default RecruiterEmailVerifysetting;