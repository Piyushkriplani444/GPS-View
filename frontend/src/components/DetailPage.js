import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';



const DetailPage = ()=>{
   const location = useLocation();
    console.log(location)
    

    return (
       <div className='container mt-4'>
             <Navbar />

       </div>
    );

}
export default DetailPage;