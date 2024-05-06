import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { AppColors } from "../constants/AppColors";
import { authBg } from "../constants/AppFiles";
import { FontFamily } from "../constants/Font";

const NoNetScreen = () => {
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
            <Text color={AppColors.white} fontFamily={FontFamily}>
                No Internet Connection.....
            </Text>
        </Box>
    );
};

export default NoNetScreen;
