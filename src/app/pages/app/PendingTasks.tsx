import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Nav } from "../../components/nav/Nav";
import Layout from "../../layout/Layout";

const PendingTasks = () => {
    return (
        <Box w="100%" h="100%">
            <Nav />
            <Layout
                children={
                    <Box
                        w="100%"
                        h={"100%"}
                        overflowY={"auto"}
                        position={"sticky"}
                        // bg={"red"}
                        px={{ base: "10px", sm: "10px", md: "20px" }}
                        py="20px"
                        display={"flex"}
                        flexWrap={"wrap"}
                        gap={"20px"}
                        justifyContent={"center"}
                    >
                        <Text>Pending Task screen</Text>
                    </Box>
                }
            />
        </Box>
    );
};

export default PendingTasks;
