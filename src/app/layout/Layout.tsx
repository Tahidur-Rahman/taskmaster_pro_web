import { Box, Flex } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import DashBoardSidebar from "./DashBoardSidebar";

interface pageInterface {
    children: any;
}
const Layout = ({ children }: pageInterface) => {
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const userId = localStorage.getItem("userId");
    //     if (userId) {
    //         setLoading(false);
    //     } else {
    //         return router.push("/");
    //     }
    // }, []);

    // if (loading) {
    //     return;
    // }
    return (
        <Box w="100%" h={"88vh"}>
            <Flex w="100%" h={"100%"}>
                {/* left side nav contents */}
                <Box
                    w={"20%"}
                    h={"100%"}
                    overflowY={"auto"}
                    position={"sticky"}
                    display={{ base: "none", md: "block" }}
                >
                    <DashBoardSidebar />
                </Box>

                {/* page contents */}
                <Box w={{ base: "100%", md: "80%" }} h={"100%"}>
                    {children}
                </Box>
            </Flex>
        </Box>
    );
};

export default Layout;
