import React, { useContext, useEffect, useState } from "react";
import { Nav } from "../../components/nav/Nav";
import Layout from "../../layout/Layout";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import Project from "../../components/Project";
import { useNavigate } from "react-router-dom";
import { projectInterface } from "../../interfaces/resuable_interfaces";
import { FirebaseFirestore } from "../../firebase/Fb_Firestore";
import { AppContext } from "../../context/AppContextProvider";

const AllProjects = () => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState<projectInterface[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const context = useContext(AppContext);

    const onClickButton = (project: projectInterface) => {
        if (context) {
            const { setselectedProjectDetails } = context || {};
            setselectedProjectDetails(project);
        }
        navigate(`/projectdetails/${project.pId}`);
    };

    useEffect(() => {
        // get all projects in realtime
        FirebaseFirestore.getMyProjects(setProjects);

        // removing loadding state after 1 sec!!!
        setTimeout(() => {
            setLoadingProjects(false);
        }, 1000);
    }, []);
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
                        px={{ base: "20px", sm: "20px", md: "30px" }}
                        py="20px"
                        display={"flex"}
                        flexWrap={"wrap"}
                        gap={{ base: "10px", sm: "10px", md: "20px" }}
                        // justifyContent={"center"}
                    >
                        {loadingProjects ? (
                            <Flex
                                w="100%"
                                h="100%"
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Spinner />
                            </Flex>
                        ) : projects.length == 0 ? (
                            <Flex
                                w="100%"
                                h="100%"
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Text>No Projects Till Now</Text>
                            </Flex>
                        ) : (
                            projects.map((item, index) => (
                                <Box
                                    w={{ base: "100%", sm: "48%", md: "48%" }}
                                    minH={{ base: "320px", md: "350px" }}
                                    key={index}
                                >
                                    <Project
                                        project={item}
                                        onClickDetailsButton={() =>
                                            onClickButton(item)
                                        }
                                    />
                                </Box>
                            ))
                        )}
                    </Box>
                }
            />
        </Box>
    );
};

export default AllProjects;
