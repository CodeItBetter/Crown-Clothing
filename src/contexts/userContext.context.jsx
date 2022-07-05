import { createContext, useState } from 'react';

export const UserContext = createContext({
    userData: null,
    setUserData : () => null
});


export const UserProvider = ({children}) =>{
    const [userData, setUserData] = useState(null);
    const value= {userData, setUserData};
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}