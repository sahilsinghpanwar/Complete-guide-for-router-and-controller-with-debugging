import { Router } from "express";
import {registerUser} from "../controllers/user.controller.js";

// video-13 ka h ye
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",    //(file ka naam)
      maxCount: 1        //kitne files h
    },
    {
      name: "coverImage",
      maxCount: 1
    }
  ]),
  registerUser
);   



                              // prefix    route
// http://localhost:8000/api/v1/users/register



// ye h ne toh comment kr deya
// or aager login method use krna hoge toh direct use krange yaha per 
// router.route("/login").post(login);
          //  route          method

        //   ek or method aa jayega register ke jagah login
        //   http://localhost:8000/api/v1/users/login


export default router;