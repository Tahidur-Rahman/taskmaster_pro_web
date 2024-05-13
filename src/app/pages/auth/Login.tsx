import {
    Box,
    Button,
    CSSReset,
    Flex,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Spinner,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { authBg, logo } from "../../constants/AppFiles";
import { AppColors } from "../../constants/AppColors";
import { FontFamily } from "../../constants/Font";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import { userDataInterface } from "../../interfaces/resuable_interfaces";
import { FbAuth } from "../../firebase/fb_auth";
import { alertMessage } from "../../utils/ToastAlert";
import { validatePassword } from "../../utils/CommonFunctions";
import { fbErrorDetect } from "../../firebase/fb_error";
import { FirebaseFirestore } from "../../firebase/Fb_Firestore";
import {
    AppleLoginButton,
    GoogleLoginButton,
} from "react-social-login-buttons";
import { socialButtonStyle } from "../../constants/cssStyles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const Login = () => {
    const context = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLogging, setIsGoogleLogging] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const loginUser = async () => {
        setIsLoading(true);
        if (!email || !password) {
            setIsLoading(false);
            return alertMessage(
                toast,
                "warning",
                "Field Alert",
                "All Field's Required!"
            );
        } else {
            if (validatePassword(password, toast)) {
                try {
                    const userCredential = await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );
                    if (userCredential.user.emailVerified) {
                        setIsLoading(false);
                        navigate("/");

                        alertMessage(
                            toast,
                            "success",
                            "Success Alert",
                            "Login Successfull!"
                        );
                    } else {
                        setIsLoading(false);
                        alertMessage(
                            toast,
                            "warning",
                            "Verification Alert",
                            "Your account is not verified yet. Please verify to login to your account."
                        );
                    }
                } catch (error: any) {
                    console.log(error.code);
                    setIsLoading(false);
                    fbErrorDetect(toast, error.code);
                }
            } else {
                setIsLoading(false);
            }
        }
    };

    const googleLogin = async () => {
        setIsGoogleLogging(true);
        try {
            const userData = await FbAuth.signInWithGoogle();
            if (context) {
                const { setUser } = context;
                setUser(userData);
            }
            setIsGoogleLogging(false);
            navigate("/");

            alertMessage(
                toast,
                "success",
                "Success Alert",
                "Login Successfull!"
            );
        } catch (error: any) {
            setIsGoogleLogging(false);
            console.log(error.code);
            fbErrorDetect(toast, error.code);
        } finally {
            setIsGoogleLogging(false);
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
                <Flex mt="15px">
                    <Text
                        fontFamily={FontFamily}
                        fontSize={"13px"}
                        fontWeight={"400"}
                    >
                        Don't have an account yet?
                    </Text>
                    <Link to={"/register"}>
                        <Text
                            fontFamily={FontFamily}
                            fontSize={"12px"}
                            color={AppColors.buttonColor1}
                            fontWeight={"300"}
                            ml="6px"
                            cursor={"pointer"}
                        >
                            Sign up
                        </Text>
                    </Link>
                </Flex>

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
                <Box mt="10px" w="100%">
                    <Text
                        fontFamily={FontFamily}
                        fontSize={"12px"}
                        fontWeight={"300"}
                    >
                        Password :
                    </Text>

                    <>
                        <CSSReset />
                        <InputGroup mt={"5px"}>
                            <InputLeftElement
                                pointerEvents="none"
                                fontSize="1.2em"
                            >
                                <CiLock />
                            </InputLeftElement>
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                type={showPassword ? "text" : "password"}
                            />
                            <InputRightElement
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <IoEyeOffOutline cursor="pointer" />
                                ) : (
                                    <IoEyeOutline cursor="pointer" />
                                )}
                            </InputRightElement>
                        </InputGroup>
                    </>
                </Box>

                <Flex mt="10px" w="63%" alignSelf={"center"}>
                    <GoogleLoginButton
                        size="40px"
                        iconSize={16}
                        style={socialButtonStyle}
                        onClick={googleLogin}
                    >
                        <span>
                            {isGoogleLogging ? (
                                <Spinner ml="10px" size={"sm"} />
                            ) : (
                                "Sign in with Google"
                            )}
                        </span>
                    </GoogleLoginButton>
                </Flex>

                <Link to={"/resetpassword"}>
                    <Text
                        fontFamily={FontFamily}
                        fontSize={"12px"}
                        fontWeight={"500"}
                        mt="10px"
                        cursor={"pointer"}
                        textAlign={"center"}
                        color={AppColors.buttonColor1}
                    >
                        Reset Password
                    </Text>
                </Link>

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
                    {isLoading ? <Spinner /> : "Sign Up"}
                </Button>
            </Box>
        </Box>
    );
};

export default Login;
