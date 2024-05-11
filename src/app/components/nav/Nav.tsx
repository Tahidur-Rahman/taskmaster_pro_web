import {
    Flex,
    Box,
    useDisclosure,
    Text,
    Image,
    useToast,
} from "@chakra-ui/react";

import { CiMenuFries } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import NavDrawer from "./NavDrawer";
import { logo } from "../../constants/AppFiles";
import { FontFamily } from "../../constants/Font";
import { AppColors } from "../../constants/AppColors";
import { useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { AppContext } from "../../context/AppContextProvider";
import AlertDialogComp from "../AlertDialogComp";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { alertMessage } from "../../utils/ToastAlert";

export const Nav = () => {
    const navigate = useNavigate();
    // nav modal/ it's for drawer
    const { isOpen, onOpen, onClose } = useDisclosure();
    const context = useContext(AppContext);
    const cancelRef = useRef();
    const toast = useToast();

    const {
        isOpen: isOpenLogout,
        onOpen: onOpenLogout,
        onClose: onCloseLogout,
    } = useDisclosure();

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
    return (
        <Box
            w="100%"
            height="12vh"
            bg={"white"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
            borderBottomColor={"#dddd"}
            borderBottomWidth={"1px"}
        >
            <Flex w={"96%"} justifyContent="space-between" alignItems="center">
                {/* left side comtemt */}
                <Flex alignItems="center">
                    {/* in small screens menu icon */}
                    <Box
                        display={{ base: "block", md: "none" }}
                        onClick={onOpen}
                    >
                        <CiMenuFries
                            size={20}
                            cursor="pointer"
                            color={"black"}
                        />
                    </Box>

                    {/* logo  */}
                    <Box display={{ base: "none", md: "block" }}>
                        <Flex
                            alignItems={"center"}
                            cursor={"pointer"}
                            onClick={() => {
                                if (context) {
                                    const { setActiveTab } = context;
                                    setActiveTab("All Projects");
                                }
                                navigate("/");
                            }}
                        >
                            <Text
                                mr="5px"
                                fontSize={"18px"}
                                fontFamily={FontFamily}
                                fontWeight={"600"}
                                color={AppColors.black}
                            >
                                TaskMasterPro
                            </Text>
                            <Image src={logo} w={"20px"} h={"20px"} />
                        </Flex>
                    </Box>
                </Flex>

                {/* right nav contents  */}
                <Flex alignItems="center" pr={{ base: "10px", md: "0px" }}>
                    <Flex alignItems={"center"} cursor={"pointer"}>
                        <FaUserCircle size={25} />
                    </Flex>
                </Flex>

                {/* in small menu drawer */}
                <NavDrawer
                    isOpen={isOpen}
                    onClose={onClose}
                    onClickLogout={() => {
                        onOpenLogout();
                    }}
                />

                {/* logout conformation */}
                <AlertDialogComp
                    askText="Are You Sure You Want To Logout?"
                    cancelRef={cancelRef}
                    isOpen={isOpenLogout}
                    okBtnText="Logout"
                    onClickOk={logoutUser}
                    onClose={onCloseLogout}
                    titleText="Logout Alert"
                />
            </Flex>
        </Box>
    );
};
