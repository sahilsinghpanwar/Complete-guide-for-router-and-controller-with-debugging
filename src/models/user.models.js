import mongoose, { Schema } from "mongoose";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },

        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },

        avatar: {
            type: String, //cloudinary url
            required: true,
        },

        coverImage: {
            type: String
        },

        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            },

        ],

        passsword: {
            type: String,
            required: [true, 'password is required'],
        },

        refreshToken: {
            type: String,
        },

    },

    {
        timestamps: true,
    }
)


// jub bhi data save hora ho usai pahle muje ye krna h  (hooks)
// but esmai toh hum passsword encrypt kr rhe h
userSchema.pre("save", async function (next) {

// aab esmai ek problem h aager kisi nai maan lo ke avatar mai kuch change keya toh ye passsword ko change kr dega toh hum else statement use krange ke aager mai tume passsword field ke modification bheju toh he tume modification krna h passsword  mai . aager koi modification nhi hua password mai toh hum if statement use kr rhe h niche toh vo sidhe next() kr dege

    if (!this.isModified("password")) return next();

    // kisko hash krna hai or kitne round mai krna h
    else{
    this.passsword = bcrypt.hash(this.passsword, 10);
    next();
}
})

// we design custom methods
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}


// for JWT
userSchema.methods.generateAccessToken = function () {
   return jwt.sign(
    {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,

    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }

)
}


userSchema.methods.generateRefreshToken = function () {

    const secret = jwt.sign(

        {
_id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,

        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }

    )
    return secret

}


export const User = mongoose.model("User", userSchema);