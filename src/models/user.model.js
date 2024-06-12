import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSChema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"        
        }
    ],
    refreshToken:{
        type:String
    }
    
},{timestamps:true})

userSChema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password=bcrypt.hash(this.password,10)
    next()
})

userSChema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}
userSChema.methods.generateAccessToken = function() {
 return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSChema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User",userSChema)