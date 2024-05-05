import React, { createContext, useState, ReactNode, useEffect } from "react";
import { userDataInterface } from "../interfaces/resuable_interfaces";

// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase/firebase.config";
// import { getCurrentUser } from "../firebase/Fb_Firestore";
// import { userDataInterface } from "../utils/reusableTypes";
// import { langStatusFunc } from "../util_functions/UtilFunctions";

export interface ContextProps {
    user: userDataInterface | null;
    setUser: React.Dispatch<React.SetStateAction<userDataInterface | null>>;

    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<ContextProps | null>(null);

const AppContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<userDataInterface | null>(null);

    const [activeTab, setActiveTab] = useState("All Projects");

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user: any) => {
    //         if (user) {
    //             getCurrentUser(user.uid).then((userData: any) => {
    //                 setUser(userData);

    //                 setAppLaoding(false);
    //             });
    //         } else {
    //             // console.log("not logged in user");
    //             setUser(null);
    //             setAppLaoding(false);
    //         }
    //     });
    //     langStatusFunc(setAppLanguage);
    // }, []);

    // console.log("contatcs", contacts);

    return (
        <AppContext.Provider
            value={{
                activeTab,
                setActiveTab,
                user,
                setUser,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
