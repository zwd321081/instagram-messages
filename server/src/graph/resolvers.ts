import Channel from "@model/Channel";
import Msg from "@model/Msg";
import User from "@model/User";
import { subscribe } from "diagnostics_channel";
import { create } from "domain";
import { PubSub } from "graphql-subscriptions";
import { ObjectId } from "mongodb";

const pubsub = new PubSub();
const resolvers = {
    Query: {
        user: async (parent, args, context, info) => {
            const { tid } = args;
            const user = await User.findOne({ tid });
            return user;
        },
        users: async () => {
            const userList = await User.find();
            return userList;
        },
        channel: async (parent, args, context, info) => {
            const { id } = args;
            const channel = await Channel.findById(id).populate('users').populate({
                path: 'msgs',             // msgs 是 Channel 模型中的字段 
                populate: {
                  path: 'sendUser'        // sendUser 是 Message 模型中的字段
                }
              }).exec();
            if(channel.msgs&&channel.msgs.length){
                let _msgs:any = channel.msgs;
                _msgs.forEach(item=>{
                    item.sendUser = item.sendUser.toString();
                    item.channel = item.channel.toString();
                })
            }
            return channel;
        },
        channels: async () => {
            const channelList = await Channel.find().populate('users');
            return channelList;
        }
    },
    Subscription: {
        postCreated: {
            subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
        },
        msgCreated:{
            subscribe:()=>pubsub.asyncIterator(['MSG_CREATED']),
            resolve:async (payload)=>{
                const channelData =await Channel.findById(payload.msgCreated.channel)
                let msgCreatedCopy = { ...payload.msgCreated.toJSON() }; // toJSON() or toObject()
                msgCreatedCopy.channel = channelData;
                msgCreatedCopy.id=msgCreatedCopy._id;

                return msgCreatedCopy;
            }
        }
    },
    Mutation: {
        createPost: async (parent, args, context, info) => {
            pubsub.publish('POST_CREATED', { postCreated: args });
            console.log(args);
        },
        addMessage: async (parent, args, context, info) => {
            // pubsub.publish('POST_CREATED', { postCreated: args });
            const { content, sendUser, receiveUser, channel } = args;

            // 创建一个新的Message实例
            const msg = new Msg({
                content,
                sendUser,
                receiveUser,
                channel
            });
            // 将实例保存到数据库
            const result = await msg.save();
            const relevantChannel = await Channel.findById(channel);
            if (relevantChannel) {
                relevantChannel.msgs.push(msg.id);
                await relevantChannel.save();
            }
            pubsub.publish("MSG_CREATED",{msgCreated:msg});
            return result;
        }
    }
};

export default resolvers;