import { Router } from "express"; //(router express ke through he aayega kyuke server ke baat h na)
import {loginUser,logoutUser,registerUser} from "../controllers/user.controller.js";

// video-13 ka h ye
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

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

router.route("/login").post(loginUser)


// secured routes
// humne jo method pass kiye h or humne auth.middleware.j mai use keya tha varifyJWT mai next() eska mean h ke aager varifyJWT ka kaam khatam ho gya h toh logOutUser kr doh kyuke ager next() use ne keya toh router confuse ho jayega ke pehle kisko check kru.
router.route("/logout").post(verifyJWT, logoutUser)

route.route("/refresh-token").post(refreshAccessToken);
export default router;