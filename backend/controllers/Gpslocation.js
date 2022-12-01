import gpslocation from "../models/GPSModel.js";
import { Sequelize } from "sequelize";
const gpsdata = async(req,res)=>{
   try{
    const gpsdataset = await gpslocation.findAll({
        attributes:['DeviceId','Device Type',
        [
            Sequelize.fn
            (
              "DATE_FORMAT", 
              Sequelize.col("Timestamp"), 
              "%d-%m-%Y %H:%i:%s"
            ),
            "Timestamp",
          ],
        'location']
    });
    res.json(gpsdataset);
    }catch(error)
   {
    console.log(error);
   }
} 

export default gpsdata;
