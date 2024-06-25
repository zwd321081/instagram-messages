import { useEffect, useState } from 'react'
import { Content } from './components/content/Content'
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery, gql, useSubscription } from '@apollo/client';
import UserContext from './hooks/userContext';
import { GET_USER, POST_FEED_SUBSCRIPTION } from './services';


import { Navigation } from './components/nav/Navigation'
import { Messages } from './components/messages/index'








// http://localhost:3000/?userId=1

function App() {
  const [searchParams] = useSearchParams();
  const {loading,error,data} = useQuery(GET_USER,{
    variables:{id:Number(searchParams.get('userId'))}
  });

  return (
    <>
    <UserContext.Provider value={data?.user}>
      <Navigation/>
      <Messages/>
      {/* <Messages/> */}
    </UserContext.Provider>
    </>
  )
}

export default App
