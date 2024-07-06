import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql,split, HttpLink } from '@apollo/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';

import { createClient } from 'graphql-ws';
import MessageThread from './components/messages/MessageThread.tsx';
// ES modules

const httpLink = new HttpLink({
  uri: 'http://localhost:4001/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4001/graphql',
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found,please report </div>,
    children: [{
      path: "/group/:groupId",
      element: <MessageThread />,
    
    }]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  ,
)
