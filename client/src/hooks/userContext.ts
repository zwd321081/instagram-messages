import React, { createContext } from 'react';

type User = {
    name: string;
    avatar: string;
    telphone: string;
    id:string;
};

// Create the context with the User type
const UserContext = createContext<User | null>(null);

export default UserContext;