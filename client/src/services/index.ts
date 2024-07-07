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

const GET_GROUP_DETAIL = gql`
    query getGroupDetail($id: ID!) {
        group(id: $id) {
            id,
                name,
                avatar,
            users{
                id,
                name,
                avatar
            },
            threads {
                content,
                createdAt,
            sendUser{
                avatar,
                id
              }
            }
        }
    }

`;



const ADD_THREAD_MUTATION = gql`
    mutation add_thread_mutation($content:String!,$sendUser:ID!,$receiveUser:ID, $group: ID!){
        addThread(content:$content,sendUser:$sendUser,receiveUser:$receiveUser,group:$group){
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

export { GET_USER, GET_ALL_GROUPS, GET_GROUP_DETAIL, POST_FEED_SUBSCRIPTION, POST_MSG_SUBSCRIPTION, ADD_THREAD_MUTATION };