import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { authBg, logo } from "../../constants/AppFiles";
import { AppColors } from "../../constants/AppColors";
import { FontFamily } from "../../constants/Font";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import { userDataInterface } from "../../interfaces/resuable_interfaces";

const Register = () => {
    const context = useContext(AppContext);

    const regirsterUser = () => {
        const user: userDataInterface = {
            email: "jahidul59895@gmail.com",
            id: "123",
            profilePic: "",
            username: "Jahidul",
        };
        if (context) {
            const { setUser } = context;

            setUser(user);
        }
    };
    return (
        <Box
            w="100%"
            h="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgImage={`url(${authBg})`}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
        >
            <Box
                w="280px"
                bg={AppColors.white}
                borderRadius={"10px"}
                px={"20px"}
                py="30px"
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
            >
                <Image src={logo} alt="logo123" w="50px" h="50px" />
                <Flex
                    mt="15px"
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Text
                        fontFamily={FontFamily}
                        fontSize={"13px"}
                        fontWeight={"400"}
                    >
                        Already have an account yet?
                    </Text>
                    <Link to="/">
                        <Text
                            fontFamily={FontFamily}
                            fontSize={"13px"}
                            color={"#5488f7"}
                            fontWeight={"300"}
                            cursor={"pointer"}
                        >
                            Sign In
                        </Text>
                    </Link>
                </Flex>

                <Box mt="20px" w="100%">
                    <Text
                        fontFamily={FontFamily}
                        fontSize={"12px"}
                        fontWeight={"300"}
                    >
                        Email :
                    </Text>

                    <InputGroup mt={"10px"} w="100%">
                        <InputLeftElement pointerEvents="none">
                            <MdOutlineMail color="" />
                        </InputLeftElement>
                        <Input />
                    </InputGroup>
                </Box>
                <Box mt="20px" w="100%">
                    <Text
                        fontFamily={FontFamily}
                        fontSize={"12px"}
                        fontWeight={"300"}
                    >
                        Password :
                    </Text>

                    <InputGroup mt={"10px"}>
                        <InputLeftElement pointerEvents="none" fontSize="1.2em">
                            <CiLock />
                        </InputLeftElement>
                        <Input />
                        <InputRightElement>
                            <IoEyeOffOutline color="green.500" />
                        </InputRightElement>
                    </InputGroup>
                </Box>
                <Box mt="20px" w="100%">
                    <Text
                        fontFamily={FontFamily}
                        fontSize={"12px"}
                        fontWeight={"300"}
                    >
                        Confirm Password :
                    </Text>

                    <InputGroup mt={"10px"}>
                        <InputLeftElement pointerEvents="none" fontSize="1.2em">
                            <CiLock />
                        </InputLeftElement>
                        <Input />
                        <InputRightElement>
                            <IoEyeOffOutline color="green.500" />
                        </InputRightElement>
                    </InputGroup>
                </Box>

                <Button
                    fontFamily={FontFamily}
                    fontWeight={"400"}
                    mt="20px"
                    w="100%"
                    bg={"#5488f7"}
                    color={AppColors.white}
                    fontSize={"13px"}
                    _hover={{
                        bg: "#5488f7",
                    }}
                    onClick={regirsterUser}
                >
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
};

export default Register;
