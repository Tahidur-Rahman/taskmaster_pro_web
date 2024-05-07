import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { FontFamily } from "../../constants/Font";
import Task from "../../components/Task";
import { useNavigate, useParams } from "react-router-dom";
import { taskInterface } from "../../interfaces/resuable_interfaces";
import { FirebaseFirestore } from "../../firebase/Fb_Firestore";
import { AppContext } from "../../context/AppContextProvider";

const ProjectDetails = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [tasks, setTasks] = useState<taskInterface[]>([]);
    const [loadingTasks, setLoadingTasks] = useState(true);
    const context = useContext(AppContext);
    const { selectedProjectDetails } = context || {};
    // console.log("projectId**********", projectId);

    const onClickEdit = (text: string) => {
        navigate("/submittask/resubmit");
    };

    useEffect(() => {
        // get all tasks of that projects

        FirebaseFirestore.getProjectAllTasks(
            setTasks,
            projectId ? projectId : ""
        );

        setTimeout(() => {
            setLoadingTasks(false);
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
                        // alignItems={"center"}
                    >
                        {loadingTasks ? (
                            <Flex
                                w="100%"
                                h="100%"
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Spinner />
                            </Flex>
                        ) : tasks.length == 0 ? (
                            <Flex
                                w="100%"
                                h="100%"
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Text>No Tasks Available Till Now!</Text>
                            </Flex>
                        ) : (
                            tasks.map((item, index) => (
                                <Box
                                    w={{ base: "100%", sm: "48%", md: "48%" }}
                                    minH={{ base: "300px", md: "350px" }}
                                    key={index}
                                >
                                    <Task
                                        projectImageUrl={
                                            selectedProjectDetails != null
                                                ? selectedProjectDetails.pImage
                                                : ""
                                        }
                                        task={item}
                                        onClick={() => onClickEdit("edit")}
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

export default ProjectDetails;
