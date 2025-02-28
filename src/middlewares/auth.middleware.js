
import { ApiError } from '../utils/Apierror.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import jwt from "jsonwebtoken"
import  {User}  from '../models/user.models.js'

export const verifyJWT = asyncHandler (async (req, _, next) => {
    
    // aab token ka access kaise lange 
    // req.cookies ka sai (kyuke humne cookie-Parser use keya h app.js mai)

    // aager accessToken token nhi hua toh , kahi user kudh sai koi custom header bhej rha ho  
    // ? = ho bhi sakhta h or ne bhi 
try {
    const token = req.cookies?.accessToken  || req.header("Authorization")?.replace("Bearer ", "")  // token ka access a gya h vaise
    
    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }
    
    
    // aab jo hume information thi getaccesstoken mai vo hume vapass lane hoge (User.models.js)
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    // aage user mil gya h or decode ho gya h toh aapke pass user h pure but hume kuch field nhi chahiye toh select ka use krange   
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
    if (!user) {
        // NEXT_VIDEO: discuss about frontend
        throw new ApiError(401, "Invalid Access Token");
    }
    
    req.user = user;
    next()
} catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token")
}

})