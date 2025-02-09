import mongoose, { Schema } from "mongoose";
const UserSchema= new Schema({
    username: {
        type: String,
        required: true,
        required: [true, 'Path `username` is required.'],
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      avatar:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      },
},{timestamps:true})
const User= mongoose.model('User' ,UserSchema);
export default User;