import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { authBg } from "../constants/AppFiles";
import { AppColors } from "../constants/AppColors";
import { FontFamily } from "../constants/Font";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, []);
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
            <Text color={AppColors.white} fontFamily={FontFamily}>
                404 Not Found!
            </Text>
        </Box>
    );
};

export default NotFoundPage;
