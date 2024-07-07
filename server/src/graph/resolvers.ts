import Group from "@model/Group";
import Thread from "@model/Thread";
import User from "@model/User";
import { THREAD_CREATED_CONST } from "@utils/index";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
async function getAndPopulateGroup(groupId) {
  return await Group.findById(groupId).populate('users').exec();
}
const resolvers = {
    Query: {
        user: async (parent, args, context, info) => {
            const { tid } = args;
            const user = await User.findOne({ tid });
            return user;
        },
        group: async (parent, args, context, info) => {
            const { id } = args;
           return await getAndPopulateGroup(id);
        },
        groups: async () => {
            const groupIds = await Group.find({},"_id").exec();
            const groups = [];
            for(let id of groupIds){
              const group = await getAndPopulateGroup(id);
              groups.push(group)
            }
            return groups;
        }
    },
    Group:{
        async threads(parent){
            return await Thread.find({group:parent.id}).populate('sendUser').populate('receiveUser').exec()
        }
    },
    Subscription: {
        threadCreated:{
            subscribe:()=>pubsub.asyncIterator([THREAD_CREATED_CONST]),
        }
    },
    Mutation: {
        addThread: async (parent, args, context, info) => {
            const { content, sendUser, receiveUser, group } = args;

            // new thread
            const thread = new Thread({
                content,
                sendUser,
                receiveUser,
                group
            });
            const result = await thread.save();
            pubsub.publish(THREAD_CREATED_CONST,{threadCreated:group});
            return result;
        }
    }
};

export default resolvers;
