import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box
            w="100%"
            h="70px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg={"white"}
        >
            <Text
                color={"black"}
                fontSize={{ base: "13px", sm: "14px", md: "16px" }}
            >
                © All Right Reserved By TaskMasterPro!!..
            </Text>
        </Box>
    );
};

export default Footer;
