import { Box, Flex, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import { FontFamily } from "../../constants/Font";
import Task from "../../components/Task";
import { useEffect, useState } from "react";
import { taskInterface } from "../../interfaces/resuable_interfaces";
import { FirebaseFirestore } from "../../firebase/Fb_Firestore";
import ReusableModal from "../../components/modal_comp/ReusableModal";
import SubmitTask from "../../components/SubmitTask";

const MySubmission = () => {
    const navigate = useNavigate();
    const [myAddedTasks, setMyAddedTasks] = useState<taskInterface[]>([]);
    const [loadingTasks, setLoadingTasks] = useState(true);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [singleTask, setSingleTask] = useState<taskInterface | null>();

    const onClickEdit = (item: taskInterface) => {
        // navigate("/submittask/edit");
        setSingleTask(item);
        onOpen();
    };

    useEffect(() => {
        // get all tasks of which current user submitted!!

        FirebaseFirestore.getAllMySubmittedTasks(setMyAddedTasks);

        setTimeout(() => {
            setLoadingTasks(false);
        }, 1000);
    }, []);

    return (
        <Box w="100%" h="100%">
            <Layout
                children={
                    <Box w="100%" h="100%">
                        <Box
                            w="100%"
                            h="100%"
                            overflowY="auto"
                            position="sticky"
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
                                    <Text>
                                        No Tasks Submitted By You Till Now!
                                    </Text>
                                </Flex>
                            ) : (
                                myAddedTasks.map((item, index) => (
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
                                            task={item}
                                            onClick={() => {}}
                                            onClickResubmit={() =>
                                                onClickEdit(item)
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
                                        isResubmitTask
                                        task={singleTask}
                                        isMySubmission
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

export default MySubmission;
