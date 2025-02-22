import { response } from "express"
import {asyncHandler} from "../utils/asyncHandler.js"

import { ApiError } from "../utils/Apierror.js"

import {User} from "../models/user.models.js"

import {uploadOnCloudinary} from "../utils/cloudinary.js"

import { ApiResponse } from "../utils/ApiResponse.js"

// ye method user ko register karega

const registerUser = asyncHandler( async (req, res) => {

   // ye video 12 ka hain maine esko Comment kr deya hain uski jagaha hum video 13 mai jo user ko register krane ka step by step logic likange 
//  res.status(200).json({
//     message: "ok"
//  })




   // video 13 user ko register krane ka logic hain

   // 1) get user details form frontend ----->   (aab hum frontend use toh ne kr rhe toh hum user ke details postman sai lange)

   // 2) validation - not empty ----->  (kahi user nai username empty toh ne bhej deya ya toh email galat toh ne bhej de or correct format mai toh bheha h na toh ye sab dekhana hoga toh validation use hoga)

   // 3) check if user already exists: username, email ------>  (aab esko hum email or username sai bhi check kr sakte h ke username ya email unique toh h na jaise hum insta par username likhate h toh woh unique hote h)

   // 4) check for images, check for avatar ------> (compulsory)

   // 5) upload them to cloudinary ------>  (aab cloudinary mai humne avatar ko successfully upload kr diya hum usko check krange , pehle toh user nai deya hoga multer ko humne uspe check lagaya fir humne cloudinary per bhi check lagaya ke avatar ko upload keya ke ne keya)

   // 6) create user object - create entry in db -----> (ke mongodb mai jub mai data bhejunga toh usko object mai bhejte h, or muje db call bhi dekhan h .create, humne user create kr diya hain toh obesly user nai toh username, email toh daala he hoga toh jitna bhi response h vo esetice user ko mil jayega)

   // 7) remove password and refresh token from response ------> (jo ye response h esmai toh password bhi show hoga but hume ye jo bhi project h vo frontend mai password show kr dega toh, toh hum response sai ye dono password, refresh token ko remove kr dange)

   // 8) check for user creation ------> (ke user create hua h ke ne hua)

   // 9) return response -------> (aager create ho gya h toh return response, else return error)




   // 1) get user details form frontend 
   const {fullname, email, username, password} = req.body;
   // console.log("email: ", email);






   // check validation

   if (
      [fullname, email, username, password].some((field) =>             //ye jo some h ye true return kr dega aager thik hoga toh
         field?.trim() === ""
      )
   ) {
      throw new ApiError(400, "All fields are required");
      
   }





   // check if user already exists: username, email
   // const existedUser = user.findOne({email})            aager ek ho he krna ho toh 
   const existedUser = await User.findOne({
      $or: [{username}, {email}],
   })
   
   if (existedUser) {
      throw new ApiError(409, "User with email and Username already exist")
   }

   console.log(req.files); //jo bhi file kai under hoge vo sub dai dega 








   // upload bhi kr deya or aab check bhi kr lo ke avatar aaya ke ne
   const avatarLocalPath = req.files?.avatar[0]?.path;
   // const coverImageLocalPath = req.files?.coverImage[0]?.path;        esko comment krange 

   // aab krange standard tarike sai coverImage ko ne aager kuch ne hua toh "" ye show kr dena undefined error show maat krna

   let coverImageLocalPath;
   if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
      coverImageLocalPath = req.files.coverImage[0]?.path;
   }


   if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required")
   }
   







   
   
   // abb hum cloudinary per upload kra , or check bhi krna hoga  (await ka use krange kyuke images, pdf ko upload hone mai time lagega)
   const avatar = await uploadOnCloudinary(avatarLocalPath);
   const coverImage = await uploadOnCloudinary(coverImageLocalPath);
   
   if (!avatar) {
      throw new ApiError(400, "Avatar file is required")
   }







   // aab jub saara kaam ho gye h toh aab object banao or db mai entry maar doh(but hume toh coverImage toh check he ne keya toh hum usko yahi he check kr lange)

   // esko hum await kra dange kyuke jo data h vo alag contenent mai h toh time toh lagega
   const user = await User.create({
      fullname,
      avatar: avatar.url,  //hume bs avatar ka url chahiye
      coverImage: coverImage?.url || "",  //coverImage hue toh url bhej doh nhi toh empty "" String
      email,
      password,
      username: username.toLowerCase(),
   })

   // aab ye bhi check krna hoga ke create hua ke ne hua
   //esai ek specific _id hote h esai hum user ko find krange ke vo exist krta h ke ne krta
   // hum .select ka use bhi kr sakte hain ke hume kya kya ne chahiye, string kai under   
   const createdUser = await User.findById(user._id).select(
      // ye doh field nhi ayenge
    "-password -refreshToken"
   )  

   if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user")
   }



   // aab last mai hum response bhejange ke user register ho gya kya successfully
   return res.status(201).json(
      new ApiResponse(200, createdUser, "User registered successfully")
   )

})

export {registerUser};