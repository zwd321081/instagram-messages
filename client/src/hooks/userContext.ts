import { createContext } from 'react';

type User = {
    name: string;
    avatar: string;
    id:string;
    tid:string
};

// Create the context with the User type
const UserContext = createContext<User | null>(null);

export default UserContext;