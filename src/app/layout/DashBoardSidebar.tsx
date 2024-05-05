import { Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import AlertDialogComp from "../components/AlertDialogComp";
import { dashboard, logout, projects } from "../constants/AppFiles";
import { FontFamily } from "../constants/Font";
import { AppColors } from "../constants/AppColors";
import { useNavigate } from "react-router-dom";

const DashBoardSidebar = () => {
    const cancelRef = useRef();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("AllProjects");

    const { isOpen, onOpen, onClose } = useDisclosure();
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
            <DashBoardItem
                text="AllProjects"
                onClick={() => {
                    setActiveTab("AllProjects");
                    navigate("/");
                }}
                iconSrc={dashboard}
                activeTab={activeTab}
            />
            <DashBoardItem
                text="Pending Tasks"
                onClick={() => {
                    setActiveTab("Pending Tasks");
                    navigate("/pendingtasks");
                }}
                iconSrc={projects}
                activeTab={activeTab}
            />

            <DashBoardItem
                text="Logout"
                onClick={() => {
                    setActiveTab("Logout");
                    onOpen();
                }}
                iconSrc={logout}
                activeTab={activeTab}
            />

            {/* logout conformation */}
            <AlertDialogComp
                askText="Are You Sure You Want To Logout?"
                cancelRef={cancelRef}
                isOpen={isOpen}
                okBtnText="Logout"
                onClickOk={() => {}}
                onClose={onClose}
                titleText="Logout Alert"
            />
        </Box>
    );
};

interface itemInterface {
    text: string;
    activeTab: string;
    onClick: any;
    iconSrc: string;
}
const DashBoardItem = ({
    text,
    iconSrc,
    onClick,
    activeTab,
}: itemInterface) => {
    return (
        <Flex
            cursor="pointer"
            py="10px"
            bg={activeTab == text ? AppColors.greyTwo : "transparent"}
            alignItems="center"
            onClick={onClick}
            borderRadius={{ base: "5px", md: "10px" }}
            _hover={{
                bg: AppColors.greyTwo,
            }}
            mb="5px"
            px={"10px"}
        >
            <Image
                src={iconSrc}
                alt="imageicon"
                w="18px"
                h="18px"
                fit={"contain"}
            />
            <Text
                fontSize={"15px"}
                ml="12px"
                fontFamily={FontFamily}
                fontWeight={"500"}
                color={activeTab == text ? AppColors.black : AppColors.grey}
            >
                {text}
            </Text>
        </Flex>
    );
};

export default DashBoardSidebar;
