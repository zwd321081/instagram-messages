

const typeDefs = `#graphql
  scalar ISODate
  type Thread{
    id: ID!
    content: String!
    sendUser: User!
    receiveUser: User
    createdAt: ISODate
    group: Group!
  }

  type User{
    tid: ID!
    id: ID!
    name: String!
    avatar: String,
  }
  type Group{
    id: ID!
    avatar: String
    name: String!
    users: [User!],
    threads: [Thread!],
    createdAt: ISODate
    updatedAt: ISODate
  }




 
  type Subscription {
    threadCreated:String
  }

  type Mutation{
    addThread(content: String! sendUser: ID! receiveUser: ID group: ID!): Thread
  }

  type Query {
    group(id: ID!): Group
    user(tid: ID!): User
    groups: [Group]
  }
`;

export default typeDefs;