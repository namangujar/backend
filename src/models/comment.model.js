import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    video:{
        type:Schema.Types.ObjectId,
        ref:"video"
    },
    owner:{
        owner:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

commentSchema.plugin(mongooseAggregatePaginate)

export const comment = mongoose.model("Comment", commentSchema)