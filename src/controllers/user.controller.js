import {asyncHandler} from "../utils/asyncHandler.js"


// ye method user ko register karega
const registerUser = asyncHandler( async (req, res) => {
 res.status(200).json({
    message: "ok"
 })
})

export {registerUser}