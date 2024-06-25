import { useQuery, gql } from '@apollo/client';


const GET_USER = gql`
 query userQuery($id:ID!){
  user(tid:$id){
    id,
    name,
    avatar,
    tid
  }
}
`;

const GET_ALL_GROUPS = gql`
   query getAllGroups{
        groups {
            id,
            name,
            avatar,
            users {
                id,
                name,
                avatar
            }
            threads {
                content
            }
     }
}
`

const GET_SINGLE_CHANNEL = gql`
   query ChannelQuery($id: ID!) {
    channel(id: $id) {
        id,
        name,
        avatar,
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

const POST_MSG_SUBSCRIPTION = gql`
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

export { GET_USER, GET_ALL_GROUPS, GET_SINGLE_CHANNEL, CREATE_POST, POST_FEED_SUBSCRIPTION, ADD_MESSAGE, POST_MSG_SUBSCRIPTION };