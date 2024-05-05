import React from "react";
import { Nav } from "../../components/nav/Nav";
import Layout from "../../layout/Layout";
import { Box, Text } from "@chakra-ui/react";
import Project from "../../components/Project";

const AllProjects = () => {
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
                        <Project />
                        <Project />
                        <Project />
                        <Project />
                        <Project />
                        <Project />
                    </Box>
                }
            />
        </Box>
    );
};

export default AllProjects;
