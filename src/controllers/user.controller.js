import {asyncHandler} from "../utils/asyncHandler.js"




import { ApiError } from "../utils/Apierror.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose"


// registerUser

const registerUser = asyncHandler( async (req, res) => {
   

   
   const {fullname, email, username, password} = req.body;
   console.log("email: ", email);
   
   
   
   
   
   
   if (
      [fullname, email, username, password].some((field) =>             
         field?.trim() === ""
      )
   ) {
      throw new ApiError(400, "All fields are required");
      
   }




   const existedUser = await User.findOne({
      $or: [{username}, {email}],
   })
   
   if (existedUser) {
      throw new ApiError(409, "User with email and Username already exist")
   }

   console.log(req.files); 






   const avatarLocalPath = req.files?.avatar[0]?.path;


   
   let coverImageLocalPath;
   if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
      coverImageLocalPath = req.files.coverImage[0]?.path;
   }


   if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required")
   }
   


   const avatar = await uploadOnCloudinary(avatarLocalPath);
   const coverImage = await uploadOnCloudinary(coverImageLocalPath);
   
   if (!avatar) {
      throw new ApiError(400, "Avatar file is required")
   }




   const user = await User.create({
      fullname,
      avatar: avatar.url, 
      coverImage: coverImage?.url || "",  
      email,
      password,
      username: username.toLowerCase(),
   })

   const createdUser = await User.findById(user._id).select(
   
    "-password -refreshToken"
   )  

   if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user")
   }



 
   return res.status(201).json(
      new ApiResponse(200, createdUser, "User registered successfully")
   )

})







// abb jo ye access and refresh token h ye baar baar use honge toh hum esai hum ek meathod mai daal dange toh pehle hume userid pass krana padega 


const generateAccessAndRefereshTokens = async (userId) => {
   
try {
  const user = await User.findById(userId);


//   token ko generate karna hai ye ek meathod hai jo hume token generate karta hai
const accessToken = user.generateAccessToken();
const refreshToken = user.generateRefreshToken();

// access tok
// en toh hum user ko dai datai h but referesh token ko hum database mai bhi save karke rakhte h taki baar baar na puchana pade user sai
// toh refreshToken koi database mai daal rhe h
user.refreshToken =  refreshToken;
// aab password bhi hona chahiye toh hum ek or parameter use krte h 
await user.save({validateBeforeSave: false})


// jub ye successfully ho jaye toh accessToken and refreshToken return kr doh
return{accessToken, refreshToken}



} catch (error) {
   throw new ApiError(500, "Something went wrong while generating referesh and access token")
} 

}







// login
const loginUser = asyncHandler(async (req, res) => {

   const{email, username, password} = req.body;
console.log(email);
   if (!username && !email) {
      throw new ApiError(400, "username and email is required");
   }


  const user = await User.findOne({
   $or: [{username}, {email}]
  }) 

  if (!user) {
     throw new ApiError(404, "User does not exist");
}



// check password
// jo esmai user h ye User mongoose database waale ne h ye jo humne isPasswordCorrect function keya h na ye humara kuch ka method create keya hua h toh jo ye user h ye bhi humara h database ka dusra h (User) 
const isPasswordValid = await user.isPasswordCorrect(password);
if (!isPasswordValid) {
   throw new ApiError(401, "Invalid user credentials");
}


// get accessToken and refereshToken
// bs kuch ne krna jo mehod uper use keya tha us function ko call kr doh
const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id);


// ye optional hain kr bhi sakhte ho or ne bhi
// ke muje user ko unwanted chize nhi bhejna toh muje pta h ke muje user ko password nhi bhejna toh hum select ka use krange
const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


// aab cookies bhejne h
const options = {
   httpOnly : true,  // hume dono mai ture use keya h means ye aab server sai he modife ho sakhte h bs frontend sai ne ho sakhte
   secure : true, 

}

// respone bhej doh ke successfull ho gya
return res
.status(200)
.cookie("accessToken", accessToken, options)
.cookie("refreshToken", refreshToken, options)
         //    key             value
.json(
   new ApiResponse(
      200,
      {
         //  ye hum es liye use kr rhe h aager user kudh sai accessToken and refreshToken ko save krna cha rha h aapne localstorage mai.
         user: loggedInUser, accessToken, refreshToken
      },
      "User logged In successfully"
   )
)         
})


// abb logOutUser bhi krna hoga
const logoutUser = asyncHandler(async (req, res) => {


   //1- refreshToken ko database sai gayab kr rhe h
 await User.findByIdAndUpdate(
      // query baatao ke user ko find kaise kre
      req.user._id,

      // aab update krna kya h use set operator ke kya kya update krna h
      {
         $set : {
            refreshToken: undefined,   // this removes the field from document
         }
      },

      {
         new: true
      }
   )

   // 2-aab cookies ko bhi krna padega

   const options = {
      httpOnly: true,
      secure: true,
   }

   return res
   .status(200)
   .clearcookie("accessToken", options)
   .clearcookie("refreshToken", options)
   .json(new ApiResponse(200, {}, "User logged out successfully"))
})


// video = 16
//  aager user ko token refresh krna ho 
const refreshAccessToken = asyncHandler(async (req, res) => {
const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

if (!incomingRefreshToken) {
   throw new ApiError(401, "unauthorized request")
}

// token ko decode kr deya
try {
   const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
   )
   
   const user = await User.findById(decodedToken?._id)
   
   if (!user) {
      throw new ApiError(401, "Invalid refresh token")
   }
   
   if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used")
   }
   
   // varification toh ho gya h 
   
   
   
   // jub varification ho gya toh aab hum new token generate krke dai date h 
   
   const options = {
      httpOnly: true,
      secure: true,
   }
   
   const {accessToken, newRefereshToken} = await generateAccessAndRefereshTokens(user._id)
   
   return res
   .status(200)
   .cookie("accessToken", accessToken, options)
   .cookie("refereshToken", newRefereshToken, options)
   .json(
      new ApiResponse(
         200,
         {accessToken, refreshToken: newRefereshToken},
         "Access token refreshed"
      )
   )
} catch (error) {
   throw new ApiError(401, error?.message || "Invalid refresh token")
}

})

export {
   registerUser,
   loginUser,
   logoutUser,
    refreshAccessToken
};