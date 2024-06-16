import { useQuery, gql } from '@apollo/client';


const GET_USER = gql`
 query getUserQuery($tid:ID!){
  user(tid:$tid){
    name,
    avatar,
    id,
    tid,
  }
}
`;

const GET_CHANNELS = gql`
    query getAllChannels{
        channels {
            id,
            name,
            thumb,
            createdAt,
            users{
                id,
                name,
                avatar
            }
        }
    }
`

const GET_SINGLE_CHANNEL = gql`
   query ChannelQuery($id: ID!) {
    channel(id: $id) {
        id,
        name,
        thumb,
        users{
            id,
            name,
            avatar
        },
        msgs {
            content,
            createdAt,
            sendUser{
                id,
                name,
                avatar
            }
        }
    }
  }

`;

const CREATE_POST = gql`
    mutation createPost($author:String,$comment:String){
        createPost(author: $author,comment:$comment) {
            author,
            comment
        }
    }
`

const ADD_MESSAGE = gql`
    mutation ADDMSG($content:String!,$sendUser:ID!,$receiveUser:ID, $channel: ID!){
        addMessage(content:$content,sendUser:$sendUser,receiveUser:$receiveUser,channel:$channel){
            id
        }
    }
`
const POST_FEED_SUBSCRIPTION = gql`
    subscription PostFeed {
        postCreated {
            author
            comment
        }
    }
`

const POST_MSG_SUBSCRIPTION=gql`
    subscription MSGFeed{
        msgCreated{
            content,
            id,
            createdAt,
            channel{
                id
            }
        }
    }
` 

export { GET_USER, GET_CHANNELS,GET_SINGLE_CHANNEL,CREATE_POST,POST_FEED_SUBSCRIPTION,ADD_MESSAGE,POST_MSG_SUBSCRIPTION};