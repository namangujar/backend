import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
    });


    const uploadOnCloudinary = async function(localPath){
        try{
            if(!localPath) return null;
            //upload the file
        const response =  await cloudinary.uploader.upload(localPath,{
                resource_type:"auto"
            })
            // console.log("file uploaded ", response.url)
            fs.unlinkSync(localPath)
            return response;
        }catch(error){
            fs.unlinkSync(localPath)
            return null;    
        }
    }
    export {uploadOnCloudinary}