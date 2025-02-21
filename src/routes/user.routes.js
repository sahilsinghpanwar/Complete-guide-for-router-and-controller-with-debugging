import { Router } from "express";
import {registerUser} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);   

                  // prefix    route
// http://localhost:8000/api/v1/users/register



// ye h ne toh comment kr deya
// or aager login method use krna hoge toh direct use krange yaha per 
// router.route("/login").post(login);
          //  route          method

        //   ek or method aa jayega register ke jagah login
        //   http://localhost:8000/api/v1/users/login


export default router;