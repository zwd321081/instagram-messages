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
const ADD_THREAD_SUBSCRIPTION = gql`
    subscription add_thread_sub {
        threadCreated
    }
`



export { GET_USER, GET_ALL_GROUPS, GET_GROUP_DETAIL, ADD_THREAD_SUBSCRIPTION, ADD_THREAD_MUTATION };