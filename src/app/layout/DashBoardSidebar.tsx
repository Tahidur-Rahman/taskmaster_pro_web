import { Box, useDisclosure } from "@chakra-ui/react";
import { useContext, useRef } from "react";
import AlertDialogComp from "../components/AlertDialogComp";
import SideBarLinks from "./SideBarLinks";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";

const DashBoardSidebar = () => {
    const cancelRef = useRef();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const context = useContext(AppContext);
    const navigate = useNavigate();
    // const logout = () => {
    //     signOut(auth).then((_) => {
    //         if (context) {
    //             const { setUser } = context || {};
    //             setUser(null);
    //             onClose();
    //             localStorage.removeItem("userId");
    //             router.push("/");
    //         }
    //     });
    // };

    const onClickSideLink = (name: string, routeName: string) => {
        if (context) {
            const { setActiveTab } = context;
            setActiveTab(name);
        }

        if (name == "Logout") {
            onOpen();
            return;
        }
        navigate(routeName);
    };
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
            <SideBarLinks onClick={onClickSideLink} />

            {/* logout conformation */}
            <AlertDialogComp
                askText="Are You Sure You Want To Logout?"
                cancelRef={cancelRef}
                isOpen={isOpen}
                okBtnText="Logout"
                onClickOk={() => {
                    if (context) {
                        const { setUser } = context;
                        setUser(null);
                    }
                }}
                onClose={onClose}
                titleText="Logout Alert"
            />
        </Box>
    );
};

export default DashBoardSidebar;
