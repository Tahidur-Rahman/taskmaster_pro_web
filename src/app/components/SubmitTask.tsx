import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    Spinner,
    Text,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import { taskInterface } from "../interfaces/resuable_interfaces";
import { FirebaseFirestore } from "../firebase/Fb_Firestore";
import { alertMessage } from "../utils/ToastAlert";
import { FontFamily } from "../constants/Font";
import { AppColors } from "../constants/AppColors";
import { useFilePicker } from "use-file-picker";
import { FileAmountLimitValidator } from "use-file-picker/validators";
import { uploadFileToStorage } from "../firebase/fb_storage";

interface submitTaskInterface {
    onClose: any;
    isResubmitTask?: boolean;
    isMySubmission?: boolean;
    task?: taskInterface | null;
}

const SubmitTask = ({
    onClose,
    isResubmitTask,
    task,
    isMySubmission,
}: submitTaskInterface) => {
    const context = useContext(AppContext);
    const { selectedProjectDetails, user } = context || {};

    const [title, setTitle] = useState(isResubmitTask ? task?.title : "");
    const [description, setDescription] = useState(
        isResubmitTask ? task?.description : ""
    );
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const { openFilePicker, filesContent } = useFilePicker({
        readAs: "DataURL",
        accept: "image/*",
        multiple: true,
        validators: [new FileAmountLimitValidator({ max: 1 })],
    });

    // console.log(filesContent[0]);

    const onClickSubmit = async () => {
        setLoading(true);
        if (isResubmitTask) {
            //  if resubmitting task/ updating task this code will run!!
            if (!title || !description) {
                setLoading(false);
                return alertMessage(
                    toast,
                    "warning",
                    "Task Alert",
                    "All Fields Required!"
                );
            }
            if (filesContent.length == 0) {
                // if update without image
                const taskData = {
                    description: description,
                    title: title,
                    updatedAt: Date.now(),
                };
                FirebaseFirestore.updateProjectId(
                    task != null ? task.taskId : "",
                    taskData,
                    task != null ? task?.projectId : ""
                );
                setLoading(false);
                onClose();
                if (isMySubmission) {
                    if (context) {
                        const { setActiveTab } = context;
                        setActiveTab("All Projects");
                    }
                    navigate("/");
                }

                alertMessage(
                    toast,
                    "success",
                    "Task Alert",
                    "Task Updated Successfully!"
                );
            } else {
                // update with image
                const imageUrl = await uploadFileToStorage(filesContent[0]);
                const taskData = {
                    description: description,
                    title: title,
                    updatedAt: Date.now(),
                    imageUrl: imageUrl,
                };
                FirebaseFirestore.updateProjectId(
                    task != null ? task.taskId : "",
                    taskData,
                    task != null ? task?.projectId : ""
                );
                setLoading(false);
                onClose();
                if (isMySubmission) {
                    if (context) {
                        const { setActiveTab } = context;
                        setActiveTab("All Projects");
                    }
                    navigate("/");
                }

                alertMessage(
                    toast,
                    "success",
                    "Task Alert",
                    "Task Updated Successfully!"
                );
            }
        } else {
            //  if submitting new task this code will run!!
            if (!title || !description || filesContent.length == 0) {
                setLoading(false);
                return alertMessage(
                    toast,
                    "warning",
                    "Task Alert",
                    "All Fields Required!"
                );
            }

            try {
                const imageUrl = await uploadFileToStorage(filesContent[0]);
                const taskData: taskInterface = {
                    createdAt: Date.now(),
                    creatorId: user ? user.id : "",
                    description: description,
                    dueDate:
                        selectedProjectDetails != null
                            ? selectedProjectDetails.pTime
                            : "",
                    taskId: "",
                    title: title,
                    updatedAt: Date.now(),
                    status: "Pending",
                    type: "submitted task",
                    imageUrl: imageUrl,
                    projectId:
                        selectedProjectDetails != null
                            ? selectedProjectDetails?.pId
                            : "",
                    assignedTo: user ? user.email : "",
                    contractorId: task != null ? task?.contractorId : "",
                };

                await FirebaseFirestore.addTaskToProject(
                    taskData,
                    selectedProjectDetails != null
                        ? selectedProjectDetails?.pId
                        : ""
                );
                setLoading(false);
                onClose();
                // navigate("/");

                alertMessage(
                    toast,
                    "success",
                    "Task Alert",
                    "Task Submitted Successfully!"
                );
            } catch (error) {
                setLoading(false);
            }
        }
    };
    return (
        <Box w="100%" h="95vh" overflowY={"auto"}>
            <Box
                w="100%"
                h={"100%"}
                // bg={"red"}
                px={{ base: "20px", sm: "20px", md: "50px" }}
                py="20px"
                justifyContent={"center"}
            >
                <Box w={"100%"}>
                    <Text
                        textAlign={"center"}
                        fontFamily={FontFamily}
                        fontWeight={"600"}
                    >
                        {isResubmitTask ? "Re_Submit" : "Submit"} Task
                    </Text>

                    <Box mt="30px">
                        <Text
                            fontFamily={FontFamily}
                            fontSize={{ base: "10px", md: "12px" }}
                            mb="5px"
                        >
                            Title :
                        </Text>
                        <Input
                            // placeholder="Title..."
                            _placeholder={{
                                fontFamily: FontFamily,
                            }}
                            disabled={loading}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Box>
                    <Box mt="10px">
                        <Text
                            fontFamily={FontFamily}
                            fontSize={{ base: "10px", md: "12px" }}
                            mb="5px"
                        >
                            Description :
                        </Text>
                        <Textarea
                            _placeholder={{
                                fontFamily: FontFamily,
                            }}
                            // placeholder="Description..."
                            disabled={loading}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Textarea>
                    </Box>

                    <Box mt="10px">
                        <Text
                            fontFamily={FontFamily}
                            fontSize={{ base: "10px", md: "12px" }}
                            mb="10px"
                        >
                            Add a Photo :
                        </Text>

                        {filesContent.length == 0 ? (
                            isResubmitTask ? (
                                <Box onClick={() => openFilePicker()}>
                                    <Image
                                        src={task?.imageUrl}
                                        alt={"name8888"}
                                        w="100%"
                                        h={{ base: "80px", md: "120px" }}
                                        borderRadius={"10px"}
                                        cursor={"pointer"}
                                    />
                                </Box>
                            ) : (
                                <Flex
                                    w="100%"
                                    h={{ base: "80px", md: "120px" }}
                                    borderWidth={"1px"}
                                    borderColor={AppColors.greyTwo}
                                    borderRadius={"10px"}
                                    cursor={"pointer"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    onClick={() => openFilePicker()}
                                >
                                    <AiOutlinePlusCircle
                                        size={30}
                                        color={AppColors.greyTwo}
                                    />
                                </Flex>
                            )
                        ) : (
                            filesContent.map((file, index) => (
                                <Box
                                    key={index}
                                    onClick={() => openFilePicker()}
                                >
                                    <Image
                                        src={file.content}
                                        alt={file.name}
                                        w="100%"
                                        h={{ base: "80px", md: "120px" }}
                                        borderRadius={"10px"}
                                        cursor={"pointer"}
                                    />
                                </Box>
                            ))
                        )}
                    </Box>

                    <Flex justifyContent={"center"} alignItems={"center"}>
                        <Button
                            onClick={onClickSubmit}
                            color={AppColors.white}
                            w="30%"
                            mt={"15px"}
                            bg={AppColors.buttonColor1}
                            disabled={loading}
                            fontFamily={FontFamily}
                            _hover={{
                                bg: AppColors.buttonColor1,
                            }}
                            fontSize={{ base: "12px", md: "14px" }}
                        >
                            {loading ? <Spinner /> : "Submit"}
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default SubmitTask;
