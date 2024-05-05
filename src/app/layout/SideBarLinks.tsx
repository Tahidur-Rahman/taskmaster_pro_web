import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FontFamily } from "../constants/Font";
import { AppColors } from "../constants/AppColors";
import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import { dashboard, logout, projects } from "../constants/AppFiles";
import { useNavigate } from "react-router-dom";

interface itemInterface {
    onClick: any;
}

const sidebarRoutesItem = [
    {
        name: "All Projects",
        route: "/",
        icon: dashboard,
    },
    {
        name: "Pending Tasks",
        route: "/pendingtasks",
        icon: projects,
    },
    {
        name: "Logout",
        route: "/",
        icon: logout,
    },
];

// { text, iconSrc, onClick }: itemInterface
const SideBarLinks = ({ onClick }: itemInterface) => {
    const context = useContext(AppContext);
    const { activeTab } = context || {};
    const navigate = useNavigate();

    return (
        <Box>
            {sidebarRoutesItem.map((item, index) => {
                return (
                    <Flex
                        key={index}
                        cursor="pointer"
                        py="10px"
                        bg={
                            activeTab == item.name
                                ? AppColors.greyTwo
                                : "transparent"
                        }
                        alignItems="center"
                        onClick={() => onClick(item.name, item.route)}
                        borderRadius={{ base: "5px", md: "10px" }}
                        _hover={{
                            bg: AppColors.greyTwo,
                        }}
                        mb="5px"
                        px={"10px"}
                    >
                        <Image
                            src={item.icon}
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
                            color={
                                activeTab == item.name
                                    ? AppColors.black
                                    : AppColors.grey
                            }
                        >
                            {item.name}
                        </Text>
                    </Flex>
                );
            })}
        </Box>
    );
};

export default SideBarLinks;
