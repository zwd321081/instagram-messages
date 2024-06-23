import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    tid: { type: Number, required: true,unique: true},
    name: { type: String, required: true,unique: true},
    avatar: String,
},{ timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
