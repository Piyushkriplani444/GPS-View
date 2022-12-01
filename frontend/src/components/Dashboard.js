import axios from "axios";
import React,{ useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import moment from "moment";
import "bootstrap/dist/css/bootstrap.css";
import DataPagination from "./DataPagination";
import Navbar from "./Navbar";
const Dashboard = ()=>{
    const [name,setName] =useState('');
    const [token,setToken] = useState('');
    const [expire,setExpire] = useState('');
    const [dataset, setDataSet] = useState([]);
    const [search,setSearch] = useState('');
    const history = useNavigate();
    
     useEffect(()=>{
        refreshToken();
        getdata();
     });

     const refreshToken = async()=>{
        try{ 
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);

            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name.toUpperCase());
            setExpire(decoded.exp);


        }catch(error)
        {
            if(error.response){
              history("/");
            }
        }
     }

     const axiosJWT = axios.create();

     axiosJWT.interceptors.request.use(async (config)=>{
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
     }, (error)=>{
        return Promise.reject(error);
     });
     const getdata = async ()=>{
        const response = await axiosJWT.get('http://localhost:5000/gpsdata', {
            headers :{
                Authorization : `Bearer ${token}`
            }
        });
        setDataSet(response.data);
    }
    const gpsdataset = dataset.filter(data => data.timeStamps= moment(data.timeStamps).format("YYYY-MM-DD hh:mm:ss "));
    const filterdata= gpsdataset.filter(data =>  data.DeviceId.toLowerCase().includes(search.toLowerCase()) ||
          data.DeviceType.toLowerCase().includes(search.toLowerCase())
    );
    const numberofpage= ()=>{
        if(filterdata%5) 
            return (filterdata.length/5)+1; 
         else  
         return (filterdata.length/5); 

    } 
    
     return (
         <div className="container is-black mt-4">
                 <Navbar />
         <div className="columns" style={{marginTop:50}}>
             <div className="column">
                 <h5 className="title is-5 is-centered">
                     WELCOME BACK : {name}</h5>
              </div>
              <div className="column">
                     <input 
               className="input is-rounded"
               type="text" 
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Search for Device Id/type" />
              </div>
          </div>
             <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>DeviceID </th>
                        <th>Device Type</th>
                        <th>Latest TimeStamp</th>
                        <th>Latest Location</th>
                    </tr>
                </thead>
                <tbody>
                  
                  <DataPagination pageSize={5} pageCount={numberofpage()} currentPage={0} data={filterdata}/>
                
                  {/* {filterdata.map((gdata,index) => (
                        <tr key={index}>
                          <td>{gdata.DeviceId}</td>
                          <td>{gdata.DeviceType}</td>
                          <td>{gdata.timeStamps}</td>
                          <td>{gdata.location}</td>
                        </tr>))} */}
                 </tbody>

             </table>
        </div>
     );
}
export default Dashboard;
