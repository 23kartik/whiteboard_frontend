
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [connectedUsers, setConnectedUsers] = useState([]);

  const addConnectedUser = (user) => {
    setConnectedUsers((prevUsers) => [...prevUsers, user]);
  };

  const removeConnectedUser = (userId) => {
    setConnectedUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <UserContext.Provider value={{ connectedUsers, addConnectedUser, removeConnectedUser,setConnectedUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
