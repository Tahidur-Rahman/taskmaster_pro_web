import { Box, Flex, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { FontFamily } from "../../constants/Font";
import Task from "../../components/Task";
import { useNavigate, useParams } from "react-router-dom";
import { taskInterface } from "../../interfaces/resuable_interfaces";
import { FirebaseFirestore } from "../../firebase/Fb_Firestore";
import { AppContext } from "../../context/AppContextProvider";
import ReusableModal from "../../components/modal_comp/ReusableModal";
import SubmitTask from "../../components/SubmitTask";

const ProjectDetails = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [tasks, setTasks] = useState<taskInterface[]>([]);
    const [loadingTasks, setLoadingTasks] = useState(true);
    const context = useContext(AppContext);
    const { selectedProjectDetails } = context || {};
    // console.log("projectId**********", projectId);
    const [isResubmitTask, setIsReSubmitTask] = useState(false);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [singleTask, setSingleTask] = useState<taskInterface | null>();

    const onClickEdit = (text: string, task: taskInterface) => {
        if (text == "submit") {
            setIsReSubmitTask(false);
            onOpen();
        } else {
            setIsReSubmitTask(true);
            setSingleTask(task);
            onOpen();
        }
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
                    <Box w="100%" h={"100%"}>
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
                                        w={{
                                            base: "100%",
                                            sm: "48%",
                                            md: "48%",
                                        }}
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
                                            onClick={() =>
                                                onClickEdit("submit", item)
                                            }
                                            onClickResubmit={() =>
                                                onClickEdit("resubmit", item)
                                            }
                                        />
                                    </Box>
                                ))
                            )}
                        </Box>

                        {/* show task submit modal */}
                        <ReusableModal
                            children={
                                <>
                                    <SubmitTask
                                        onClose={onClose}
                                        isResubmitTask={isResubmitTask}
                                        task={singleTask}
                                    />
                                </>
                            }
                            isOpen={isOpen}
                            onClose={onClose}
                        />
                    </Box>
                }
            />
        </Box>
    );
};

export default ProjectDetails;
