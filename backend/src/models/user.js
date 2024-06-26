import mongoose from 'mongoose'
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: false
    },
    oAuth: {
        type:String,
        enum: ['local', 'oauth'],
        required: true
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    },
})
userSchema.pre("save" , async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }
    next();
})
const User = mongoose.model("User",userSchema);
export default User