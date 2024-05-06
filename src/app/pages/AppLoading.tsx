import { Box, Spinner } from "@chakra-ui/react";
import React from "react";
import { authBg } from "../constants/AppFiles";
import { AppColors } from "../constants/AppColors";

const AppLoading = () => {
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
            <Box>
                <Spinner color={AppColors.white} />
            </Box>
        </Box>
    );
};

export default AppLoading;
