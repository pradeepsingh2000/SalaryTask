import * as express from "express";
// import * as mongoose from 'mongoose';
import { Server } from "./Server";
const bodyParser = require ('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

let server = new Server().app;
let port = 5000;

server.listen(port,()=>{
    console.log("server is running");
});





