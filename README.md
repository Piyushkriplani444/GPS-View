# GPS-View

To run the code, please clone the repository

Move to backend directory and install required package
```
cd backend
npm install
```
Move to frontend directory and install required package
```
cd frontend 
npm install
```
### Create Database Server

To run this code you need a sql database server(like mysql)

You can download mysql from this website : https://dev.mysql.com/downloads/installer/

After installing and running mysql create database

```
create database gpsdashboad;

```
If you want you can have your own name in database but you have to change database name in backend/config/Database.js

## Important changes in backend/config/Database.js

```
import { Sequelize }  from "sequelize";

const db = new Sequelize(
    'gpsdashboad',  //Database Name
    'root', //mysql root id
    'Piyush@1999', //mysql root password
    {
        host:"localhost",
        dialect: "mysql"
    }
)
export default  db;
```
## Create .env file in backed folder if not created and enter access and refresh token

```
ACCESS_TOKEN_SECRET = jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225
REFRESH_TOKEN_SECRET = 825y8i3hnfjmsbv7gwajbl7fobqrjfvbs7gbfj2q3bgh8f42
```

### Import Database in mysql server 

Go to mysql workbench and import  _*gpslocation.csv file in gpsdashboad database*_


### After database in created run following command to run backend
```
nodemon index.js

```

### If backend is running without error then go to frontend and run following command to run frontend

```
npm start

```


 

