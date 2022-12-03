import axios from "axios";
import React,{ useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import "bootstrap/dist/css/bootstrap.css";
import DataPagination from "./DataPagination";
import Navbar from "./Navbar";
const Dashboard = ()=>{
    const [name,setName] =useState('');
    const [token,setToken] = useState('');
    const [expire,setExpire] = useState('');
    const [dataset, setDataSet] = useState([]);
    const [search,setSearch] = useState('');
    const [sortType,setSortType] = useState("Def");
    const [sortTypeB,setSortTypeB] = useState("Def");
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
            setName(decoded.name);
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
    const useThisData = dataset;
    const filterdata= useThisData.filter(data =>  data.DeviceId.toLowerCase().includes(search.toLowerCase()) ||
          data['Device Type'].toLowerCase().includes(search.toLowerCase())
    );
    if(sortType=== "Desc")
         {
            filterdata.sort((a,b)=>(a['Device Type']>b['Device Type']?-1:1));
         }
     if(sortType === "Asc")
     {
        filterdata.sort((a,b)=>(a['Device Type']<b['Device Type']?-1:1));
     }
     if(sortTypeB === "Desc")
     {
        filterdata.sort((a,b)=>(a['DeviceId']>b['DeviceId']?-1:1));
     }
     if(sortTypeB === "Asc")
      {
        filterdata.sort((a,b)=>(a['DeviceId']<b['DeviceId']?-1:1));
     }

    const numberofpage= ()=>{
        if(filterdata%5) 
            return (filterdata.length/5)+1; 
         else  
         return (filterdata.length/5); 

    } 


    
     return (
         <div className="container has-background-grey-light mt-4">
                 <Navbar />
         <div className="columns" style={{marginTop:50}}>
             <div className="column">
                 <h5 className="title is-5 is-centered">
                     WELCOME BACK : {name.toUpperCase()}</h5>
              </div>
              <div className="column">
                     <input 
               className="input is-rounded"
               type="text" 
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Search for Device Id/type" />
              </div>
          </div>
             <table className="table has-background-primary-light  is-bordered is-narrow is-fullwidth">
                <thead>
                    <tr>
                        <th>DeviceID  <p type="button" style={{fontSize : 10}} onClick={()=> {setSortType("Def"); setSortTypeB(sortTypeB==="Def"?"Asc":(sortTypeB==="Asc")?"Desc":"Asc")} } >{sortTypeB}</p> </th>
                        <th>Device Type <p type="button" style={{fontSize : 10}} onClick={()=>{setSortTypeB("Def"); setSortType(sortType==="Def"?"Asc":(sortType==="Asc")?"Desc":"Asc") }} >{sortType}</p> </th>
                        <th>Latest TimeStamp</th>
                        <th>Latest Location</th>
                        <th>Detail Page</th>
                    </tr>
                </thead>
                <tbody>
                    <DataPagination pageSize={5} pageCount={numberofpage()} currentPage={0} data={filterdata}/>
                </tbody>

             </table>
        </div>
     );
}
export default Dashboard;
   
                //   { {filterdata.map((gdata,index) => (
                //         <tr key={index}>
                //           <td>{gdata.DeviceId}</td>
                //           <td>{gdata.DeviceType}</td>
                //           <td>{gdata.timeStamps}</td>
                //           <td>{gdata.location}</td>
                //         </tr>))} }