import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import NavbarIntern from "./NavbarIntern";
import {BiParty} from "react-icons/bi"


const Userdata = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        document.getElementById("gethiredbutton").style.backgroundColor = ""
        document.getElementById("gethiredbutton").style.color = ""
        document.getElementById("homebutton").style.backgroundColor = ""
        document.getElementById("projectsbutton").style.color = "white"
        document.getElementById("projectsbutton").style.backgroundColor = "rgb(17 24 39)"
        document.getElementById("postbutton").style.color = "rgb(156 163 175)"
        document.getElementById("postbutton").style.backgroundColor = ""
        document.getElementById("homebutton").style.color = "rgb(156 163 175)"
     

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (

        <div>
            <NavbarIntern />
            <div class=" w-screen h-screen bg-gray-50 ">
            <div class= "flex w-full h-full pt-10 justify-center">
                <div className="grid grid-rows-3 h-1/5 w-3/4 border-2  bg-white shadow-lg hover:shadow-xl border-gray-50">
                <div className="row-span-1 flex items-center justify-center w-full font-sans ">
                    <BiParty
                    className="mx-2 text-cyan-900" />
                LensKart has accepted your application
                <BiParty
                className="mx-2 text-cyan-900" />
                </div>
                <div className="row-span-1 flex items-center justify-center w-full ">
                Click on the accept butt
                </div>
                <div className="row-span-1 flex items-end justify-end w-full ">
                <button
               
                class="bg-blue-500 font-sans  hover:bg-blue-700 text-white text-base font-bold py-2 px-6 rounded mr-2 mb-2">Accept</button>

                </div>
                </div>

            </div>
            </div>
        </div>
    );
};

export default Userdata;