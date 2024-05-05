import { Flex, Box, useDisclosure, Text, Image } from "@chakra-ui/react";

import { CiMenuFries } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import NavDrawer from "./NavDrawer";
import { logo } from "../../constants/AppFiles";
import { FontFamily } from "../../constants/Font";
import { AppColors } from "../../constants/AppColors";

export const Nav = () => {
    // nav modal/ it's for drawer
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                        <Flex alignItems={"center"} cursor={"pointer"}>
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
                        <Text
                            ml="8px"
                            fontSize={"15px"}
                            fontFamily={FontFamily}
                            display={{ base: "none", md: "block" }}
                            color={AppColors.grey}
                        >
                            Jahidul
                        </Text>
                    </Flex>
                </Flex>

                {/* in small menu drawer */}
                <NavDrawer isOpen={isOpen} onClose={onClose} />
            </Flex>
        </Box>
    );
};
