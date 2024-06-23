import mongoose from 'mongoose';
const { Schema } = mongoose;

//时间用自带的createdAt，
//groupd
const threadSchema = new Schema({
    content: { type: String,required: true},
    sendUser: { type: Schema.Types.ObjectId, ref: 'User',required: true},
    receiveUser: { type: Schema.Types.ObjectId, ref: 'User'},
    group: { type: Schema.Types.ObjectId, ref: 'Group',required: true},  
},{ timestamps: true });


const Thread = mongoose.model('Thread', threadSchema);

export default Thread;
