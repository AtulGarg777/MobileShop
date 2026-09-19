// import { createContext, useContext, useState } from "react";

// let AuthContext = createContext();

// export let AuthProvider = ({ children }) => {

//     let [user, setUser] = useState();
//     let [loading, setLoading] = useState(true);

//     return (
//         <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export function useAuth() {
//     return useContext(AuthContext);
// }