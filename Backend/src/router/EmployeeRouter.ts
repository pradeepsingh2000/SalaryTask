import { Router } from "express";
// import { EmployeeController } from "../Controller/commentController";
// import { GlobalMiddleware } from "../MiddleWare/CheckError";
// import {  EmployeeValidator } from "../Validators/CommentsValidator";
import { UserController } from "../Controller/userController";
import { EmployeeValidation } from "../Validator/EmployeeValidator";

import { Salary } from "../MiddleWare/CheckSalary";
import { Utils } from "../Utils/Utils";
const utils = new Utils();

class CommentRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get("/getAll", UserController.getAllEmployess);
    this.router.get("/Employee/:id", UserController.getEmployee);
  }

  postRoutes() {
    this.router.post(
      "/addEmployee",
      new Utils().multer,
      Salary.calSalary,
      UserController.AddEmployee
    );
  }

  patchRoutes() {
    this.router.patch(
      "/updateEmployee/:id",
      new Utils().multer,
      UserController.UpdateEmployee
    );
  }

  deleteRoutes() {
    this.router.delete("/deleteEmployee/:id", UserController.DeleteEmployee);
  }
}
export default new CommentRouter().router;
