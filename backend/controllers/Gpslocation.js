import gpslocation from "../models/GPSModel.js";

const gpsdata = async(req,res)=>{
   try{
    const gpsdataset = await gpslocation.findAll({
        attributes:['DeviceId','DeviceType','timeStamps','location']
    });
    res.json(gpsdataset);
   }catch(error)
   {
    console.log(error);
   }
} 

export default gpsdata;
