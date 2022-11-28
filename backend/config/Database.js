import { Sequelize }  from "sequelize";

const db = new Sequelize(
    'gpsdashboad',
    'root',
    'Piyush@1999',
    {
        host:"localhost",
        dialect: "mysql"
    }
)
export default  db;