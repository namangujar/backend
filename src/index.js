import dotenv from "dotenv";
import connectDB from "./db/index.js";


dotenv.config({
    path:'./env'
})

connectDB()




/* another approach
import express from "express"
const app = express();
//IIFE immedietely invoked function expression 
(async ()=>{
    try{
        await    mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("ERROR: ",error)
            throw error
        })
    }catch(error){
        console.error("ERROR: ",error)
        throw err
    }

})()
*/