import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import { FontFamily } from "../../constants/Font";
import Task from "../../components/Task";
import { useEffect, useState } from "react";
import { taskInterface } from "../../interfaces/resuable_interfaces";
import { FirebaseFirestore } from "../../firebase/Fb_Firestore";

const MySubmission = () => {
    const navigate = useNavigate();
    const [myAddedTasks, setMyAddedTasks] = useState<taskInterface[]>([]);
    const [projectImages, setProjectImages] = useState<string[]>([]);
    const [loadingTasks, setLoadingTasks] = useState(true);

    const onClickEdit = (text: string) => {
        navigate("/submittask/edit");
    };

    useEffect(() => {
        // get all tasks of which current user submitted!!

        FirebaseFirestore.getAllMySubmittedTasks(
            setMyAddedTasks,
            setProjectImages
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
                        ) : myAddedTasks.length == 0 ? (
                            <Flex
                                w="100%"
                                h="100%"
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Text>No Tasks Submitted By You Till Now!</Text>
                            </Flex>
                        ) : (
                            myAddedTasks.map((item, index) => (
                                <Box
                                    w={{ base: "100%", sm: "48%", md: "48%" }}
                                    minH={{ base: "300px", md: "350px" }}
                                    key={index}
                                >
                                    <Task
                                        projectImageUrl={projectImages[index]}
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

export default MySubmission;
