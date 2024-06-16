

const typeDefs = `#graphql
  scalar ISODate
  type Message{
    id: ID!
    content: String!
    sendUser: User!
    receiveUser: User
    createdAt: ISODate
    channel: Channel!
  }

  type User{
    tid: ID!
    id: ID!
    name: String!
    avatar: String,
    telphone:String
  }
  type Channel{
    id: ID!
    thumb: String
    name: String!
    users: [User!],
    msgs: [Message!],
    createdAt: ISODate
  }

  type Query {
    users: [User],
    channel(id: ID!): Channel
    user(tid: ID!): User
    channels: [Channel]
  }


  input MessageInput{
    content: String!
    sendUser: ID!
    receiveUser: ID
    channel: ID!
  }
  type Subscription {
    postCreated: Post
    msgCreated:Message
  }

  type Post{
    author: String
    comment: String
  }
  type Mutation{
    createPost(author: String, comment: String): Post
    addMessage(content: String!
    sendUser: ID!
    receiveUser: ID
    channel: ID!): Message
  }
`;

export default typeDefs;