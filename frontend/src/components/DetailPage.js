import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Chart from "react-apexcharts";


const DetailPage = ()=>{
   const location = useLocation();
   const dataset=location.state.data;
   const deviceId= location.state.data[0].DeviceId;
   const devicetype= location.state.data[0]['Device Type'];
   const unique= [...new Set(dataset.map(d=> d.location))];
   const data =[...new Array(unique.map(u => (dataset.filter(d => d.location === u )).length))];
   
    
   const options = { labels: unique };
   const series = [...data[0]];


    return (
       <div className='container mt-4'>
             <Navbar />
             <div  style={{margin:20}}>
                 <h2 className='title is-2'>{deviceId}</h2>
                 <h4 className='title is-4'>{devicetype}</h4>
             </div>
             <div className='columns box' style={{marginTop: 10}}>
               <div className='column'>
                  <table className='table is-bordered is-narrow'>
                     <thead>
                        <tr>
                          <th>TimeStamp</th>
                          <th>Location</th>
                        </tr>
                     </thead>
                     <tbody>
                        {dataset.map((d,i)=>(
                              <tr key={i}>
                                <td>{d.Timestamp}</td>
                                 <td>{d.location}</td>
                                 </tr>
                           ))}
                     </tbody>
                  </table>
               </div>
               <div className='column'>
                <div className='donut'>
               <Chart options={options} series={series} type="pie" width="380" />  
                </div>
               </div>
              

             </div>

       </div>
    );

}
export default DetailPage;