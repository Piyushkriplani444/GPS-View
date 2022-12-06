import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger_output.json" assert{ type :"json"};

dotenv.config();

const app=express();

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use("/doc" , swaggerUI.serve,swaggerUI.setup(swaggerFile));
app.listen(5000, ()=> console.log('Server running at port 5000'));