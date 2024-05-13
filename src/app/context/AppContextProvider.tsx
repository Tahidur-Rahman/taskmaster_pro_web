import React, { createContext, useState, ReactNode, useEffect } from "react";
import {
    projectInterface,
    userDataInterface,
} from "../interfaces/resuable_interfaces";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { FirebaseFirestore } from "../firebase/Fb_Firestore";
import NoNetScreen from "../pages/NoNetScreen";

export interface ContextProps {
    user: userDataInterface | null;
    setUser: React.Dispatch<React.SetStateAction<userDataInterface | null>>;

    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    selectedProjectDetails: projectInterface | null;
    setselectedProjectDetails: React.Dispatch<
        React.SetStateAction<projectInterface | null>
    >;
    appLoading: boolean;
    setAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<ContextProps | null>(null);

const AppContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<userDataInterface | null>(null);

    const [activeTab, setActiveTab] = useState("All Projects");
    const [selectedProjectDetails, setselectedProjectDetails] =
        useState<projectInterface | null>(null);
    const [appLoading, setAppLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    useEffect(() => {
        if (isOnline) {
            onAuthStateChanged(auth, (user: User | null) => {
                if (user) {
                    if (user.emailVerified) {
                        FirebaseFirestore.getCurrentUser(
                            user != null ? user.uid : ""
                        ).then((userData: any) => {
                            setUser(userData);

                            setAppLoading(false);
                        });
                    } else {
                        setUser(null);
                        setAppLoading(false);
                    }
                } else {
                    // console.log("not logged in user");
                    setUser(null);
                    setAppLoading(false);
                }
            });
        } else {
            setUser(null);
            setAppLoading(false);
        }

        setActiveTab("All Projects");
        // setAppLoading(false);
    }, []);

    return (
        <AppContext.Provider
            value={{
                activeTab,
                setActiveTab,
                user,
                setUser,
                appLoading,
                setAppLoading,
                selectedProjectDetails,
                setselectedProjectDetails,
            }}
        >
            {isOnline ? children : <NoNetScreen />}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
