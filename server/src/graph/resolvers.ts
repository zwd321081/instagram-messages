import Group from "@model/Group";
import Thread from "@model/Thread";
import User from "@model/User";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
const resolvers = {
    Query: {
        user: async (parent, args, context, info) => {
            const { tid } = args;
            const user = await User.findOne({ tid });
            return user;
        },
        group: async (parent, args, context, info) => {
            const { id } = args;
            const group = (await Group.findById(id)).populate('users')
            return group;
        },
        groups: async () => {
            const groups = await Group.find();
            return groups;
        }
    },
    Group:{
        async threads(parent){
            return await Thread.find({group:parent.id})
        }
    },
    Subscription: {
        msgCreated:{
            subscribe:()=>pubsub.asyncIterator(['MSG_CREATED']),
            resolve:async (payload)=>{
                const channelData =await Group.findById(payload.msgCreated.channel)
                let msgCreatedCopy = { ...payload.msgCreated.toJSON() }; // toJSON() or toObject()
                msgCreatedCopy.channel = channelData;
                msgCreatedCopy.id=msgCreatedCopy._id;

                return msgCreatedCopy;
            }
        }
    },
    Mutation: {
        addThread: async (parent, args, context, info) => {
            // pubsub.publish('POST_CREATED', { postCreated: args });
            const { content, sendUser, receiveUser, group } = args;

            // new thread
            const thread = new Thread({
                content,
                sendUser,
                receiveUser,
                group
            });
            // 将实例保存到数据库
            const result = await thread.save();
            // const relevantChannel = await Group.findById(channel);
            // if (relevantChannel) {
            //     relevantChannel.msgs.push(thread.id);
            //     await relevantChannel.save();
            // }
            // pubsub.publish("MSG_CREATED",{msgCreated:msg});
            return result;
        }
    }
};

export default resolvers;