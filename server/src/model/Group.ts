import mongoose from 'mongoose';
const { Schema } = mongoose;

const groupSchema = new Schema({
    name: { type: String, required: true },
    avatar: { type: String },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    threads: [{ type: Schema.Types.ObjectId, ref: 'Thread' }]
},{ timestamps: true });

const Group = mongoose.model('Group', groupSchema);

export default Group;