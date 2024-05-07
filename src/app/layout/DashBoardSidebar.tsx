import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import AlertDialogComp from "../components/AlertDialogComp";
import SideBarLinks from "./SideBarLinks";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { alertMessage } from "../utils/ToastAlert";

const DashBoardSidebar = () => {
    const cancelRef = useRef();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const context = useContext(AppContext);
    const navigate = useNavigate();
    const toast = useToast();
    const [key, setKey] = useState(0);

    const logoutUser = () => {
        signOut(auth).then((_) => {
            if (context) {
                const { setUser, setActiveTab } = context || {};
                setUser(null);
                setActiveTab("All Projects");
                navigate("/");
                alertMessage(
                    toast,
                    "success",
                    "Logout Alert",
                    "Logout Successfull!"
                );
            }
        });
    };

    const onClickSideLink = (name: string, routeName: string) => {
        if (context) {
            const { setActiveTab } = context;
            setActiveTab(name);
        }

        setKey((prevKey) => prevKey + 1);

        if (name == "Logout") {
            onOpen();
            return;
        }
        navigate(routeName);
    };

    useEffect(() => {
        setKey((prevKey) => prevKey + 1);
    }, []);
    return (
        <Box
            w="100%"
            h={"100%"}
            bg={"white"}
            borderRightColor={"#dddd"}
            borderRightWidth={"1px"}
            px="10px"
            pt={"10px"}
        >
            <SideBarLinks key={key} onClick={onClickSideLink} />

            {/* logout conformation */}
            <AlertDialogComp
                askText="Are You Sure You Want To Logout?"
                cancelRef={cancelRef}
                isOpen={isOpen}
                okBtnText="Logout"
                onClickOk={logoutUser}
                onClose={onClose}
                titleText="Logout Alert"
            />
        </Box>
    );
};

export default DashBoardSidebar;
