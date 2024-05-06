import React from "react";
import { Nav } from "../../components/nav/Nav";
import Layout from "../../layout/Layout";
import { Box, Text } from "@chakra-ui/react";
import Project from "../../components/Project";
import { useNavigate } from "react-router-dom";

const AllProjects = () => {
    const navigate = useNavigate();

    const data = [0, 1, 2, 3, 4, 5, 6];

    const onClickButton = (text: string) => {
        if (text == "submit") {
            navigate("/submittask/new");
        } else {
            navigate("/projectdetails/123");
        }
    };
    return (
        <Box w="100%" h="100%">
            <Layout
                children={
                    <Box
                        w="100%"
                        h={"100%"}
                        overflowY={"auto"}
                        position={"sticky"}
                        // bg={"red"}
                        px={{ base: "5px", sm: "5px", md: "20px" }}
                        py="20px"
                        display={"flex"}
                        flexWrap={"wrap"}
                        gap={{ base: "10px", sm: "10px", md: "20px" }}
                        justifyContent={"center"}
                    >
                        {data.map((item, index) => (
                            <Project
                                key={index}
                                onClickSubmitButton={() =>
                                    onClickButton("submit")
                                }
                                onClickDetailsButton={() =>
                                    onClickButton("details")
                                }
                            />
                        ))}
                    </Box>
                }
            />
        </Box>
    );
};

export default AllProjects;
