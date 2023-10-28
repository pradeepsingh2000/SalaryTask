import * as express from "express";
import mongoose from "mongoose";
import EmployeeRouter from "./router/EmployeeRouter";
import bodyParser = require("body-parser");
import cors = require("cors");

import multer = require("multer");

export class Server {
  public app: express.Application = express();
  constructor() {
    this.app.use(cors());
    this.setbodyparser();
    this.setConfiguration();
    this.setRoutes();
    this.error404();
    this.errorhandel();
  }

  setConfiguration() {
    this.setMongodb();
  }

  setRoutes() {
    this.app.use("/src/upload", express.static("src/upload"));
    this.app.use("/api/employee", EmployeeRouter);
  }

  setbodyparser() {
    this.app.use(express.urlencoded({ extended: true })); // Handle x-www-form-urlencoded data
  }

  setMongodb() {
    mongoose
      .connect("mongodb://localhost:27017/TASK")

      .then(() => {
        console.log("mongo is connected");
      })
      .catch((err) => {
        console.log("Connecton Failed");
        console.log(err);
      });
  }
  error404() {
    this.app.use((req, res) => {
      res.status(404).json({
        message: "The page was not found",
      });
    });
  }

  errorhandel() {
    this.app.use((error, req, res, next) => {
      // const errorStatus= req.status;
      res.json({
        status: 500,
        msg: error,
      });
    });
  }
}
