import React from 'react'
import { Navigate } from 'react-router-dom';
function Recruitment(){
    const[Gotohomepage,setGotohomepage] = React.useState(false);
   if(Gotohomepage)
   {
    return <Navigate to="/" />
   }
  return (
     <div id='recruitmentdiv'>  
        <form id="recruitsearch">
            <input type="search" id = "searchbox" placeholder = 'Search requirements here ...' />
        </form>
        <button id = "home" onClick={() => {setGotohomepage(true)}}>Home</button>
        </div>
    
      
     
  )
}

export default Recruitment
