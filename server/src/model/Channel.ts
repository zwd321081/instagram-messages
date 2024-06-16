import mongoose from 'mongoose';
const { Schema } = mongoose;

const channelSchema = new Schema({
    name: { type: String, required: true },
    thumb: { type: String },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    msgs: [{ type: Schema.Types.ObjectId, ref: 'Msg' }]
},{ timestamps: true });

const Channel = mongoose.model('Channnel', channelSchema);

export default Channel;