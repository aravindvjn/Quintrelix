import { createContext, useState } from "react";

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);

const ContextUser = ({ children }) => {
  const [user, setUser] = useState("");
  const [theData,setTheData] = useState(0);


  return (
    <AuthContext.Provider value={{ user,setUser,setTheData,theData }}>{children}</AuthContext.Provider>
  );
};
export default ContextUser;
