import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const  gpslocation = db.define('gpslocation', {
    DeviceId:{
        type: DataTypes.STRING
    },
     DeviceType: {
        type: DataTypes.STRING
    },
     timeStamps :{
        type: DataTypes.DATE
    },
    location: {
        type : DataTypes.STRING
    }
},{
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default gpslocation;

