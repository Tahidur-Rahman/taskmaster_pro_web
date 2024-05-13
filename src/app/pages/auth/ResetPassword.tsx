import {
    Box,
    Button,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Spinner,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { logo } from "../../constants/AppFiles";
import { AppColors } from "../../constants/AppColors";
import { FontFamily } from "../../constants/Font";
import { MdOutlineMail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { alertMessage } from "../../utils/ToastAlert";
import { fbErrorDetect } from "../../firebase/fb_error";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const ResetPassoword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const loginUser = async () => {
        setIsLoading(true);
        if (!email) {
            setIsLoading(false);
            return alertMessage(
                toast,
                "warning",
                "Field Alert",
                "All Field's Required!"
            );
        } else {
            try {
                await sendPasswordResetEmail(auth, email);

                setIsLoading(false);
                navigate("/");

                alertMessage(
                    toast,
                    "success",
                    "Success Alert",
                    "An email has been sent to your email address. Please reset your password and login to your account."
                );
            } catch (error: any) {
                console.log(error.code);
                setIsLoading(false);
                fbErrorDetect(toast, error.code);
            }
        }
    };

    return (
        <Box
            w="100%"
            h="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgColor={AppColors.buttonColor1}
            // bgImage={`url(${authBg})`}
            // bgPosition="center"
            // bgRepeat="no-repeat"
            // bgSize="cover"
        >
            <Box
                w={{ base: "280px", md: "350px" }}
                px={{ base: "20px", md: "30px" }}
                py={{ base: "30px", md: "50px" }}
                bg={AppColors.white}
                borderRadius={"10px"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
            >
                <Image src={logo} alt="logo123" w="50px" h="50px" />

                <Box mt="20px" w="100%">
                    <Text
                        fontFamily={FontFamily}
                        fontSize={"13px"}
                        fontWeight={"300"}
                    >
                        Email :
                    </Text>

                    <InputGroup mt={"5px"} w="100%">
                        <InputLeftElement pointerEvents="none">
                            <MdOutlineMail color="" />
                        </InputLeftElement>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </InputGroup>
                </Box>

                <Button
                    fontFamily={FontFamily}
                    fontWeight={"400"}
                    mt="10px"
                    w="60%"
                    alignSelf={"center"}
                    bg={AppColors.buttonColor1}
                    color={AppColors.white}
                    fontSize={"13px"}
                    _hover={{
                        bg: AppColors.buttonColor1,
                    }}
                    onClick={loginUser}
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner /> : "Reset"}
                </Button>
                {/* <Link to={"/"}>
                    <Text
                        fontFamily={FontFamily}
                        fontSize={"12px"}
                        fontWeight={"500"}
                        mt="10px"
                        cursor={"pointer"}
                        textAlign={"center"}
                        textDecoration={"underline"}
                    >
                        Back
                    </Text>
                </Link> */}
            </Box>
        </Box>
    );
};

export default ResetPassoword;
