import mongoose from 'mongoose';
const { Schema } = mongoose;

//时间用自带的createdAt，
//groupd
const msgSchema = new Schema({
    content: { type: String,required: true},
    sendUser: { type: Schema.Types.ObjectId, ref: 'User',required: true},
    receiveUser: { type: Schema.Types.ObjectId, ref: 'User'},
    channel: { type: Schema.Types.ObjectId, ref: 'Channel',required: true},  
},{ timestamps: true });


const Msg = mongoose.model('Msg', msgSchema);

export default Msg;
