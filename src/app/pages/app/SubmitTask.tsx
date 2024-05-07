import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    Select,
    Spinner,
    Text,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import Layout from "../../layout/Layout";
import { FontFamily } from "../../constants/Font";
import { IoArrowBackOutline } from "react-icons/io5";
import { AppColors } from "../../constants/AppColors";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import { taskInterface } from "../../interfaces/resuable_interfaces";
import { FirebaseFirestore } from "../../firebase/Fb_Firestore";
import { alertMessage } from "../../utils/ToastAlert";

const img =
    "https://i.pinimg.com/736x/90/40/03/9040034f5d635f46a4fb92128964fcca.jpg";

const SubmitTask = () => {
    const [startDate, setStartDate] = useState(new Date());
    const context = useContext(AppContext);
    const { selectedProjectDetails, user } = context || {};
    const { type } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const onClickSubmit = async () => {
        if (type == "new") {
            setLoading(true);
            try {
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
                };

                await FirebaseFirestore.addTaskToProject(
                    taskData,
                    selectedProjectDetails != null
                        ? selectedProjectDetails?.pId
                        : ""
                );
                setLoading(false);
                navigate("/");

                alertMessage(
                    toast,
                    "success",
                    "Task Alert",
                    "Task Submitted Successfull!"
                );
            } catch (error) {
                setLoading(false);
            }
        } else {
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
                        px={{ base: "20px", sm: "20px", md: "50px" }}
                        py="20px"
                        justifyContent={"center"}
                    >
                        <Box w={{ base: "100%", sm: "100%", md: "70%" }}>
                            <Text
                                textAlign={"center"}
                                fontFamily={FontFamily}
                                fontWeight={"600"}
                            >
                                {type == "new" ? "Submit" : "Re Submit"} Task
                            </Text>

                            <Box mt="30px">
                                <Text
                                    fontFamily={FontFamily}
                                    fontSize={{ base: "12px", md: "14px" }}
                                    mb="10px"
                                >
                                    Title :
                                </Text>
                                <Input
                                    placeholder="Title..."
                                    _placeholder={{
                                        fontFamily: FontFamily,
                                    }}
                                    disabled={loading}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Box>
                            <Box mt="30px">
                                <Text
                                    fontFamily={FontFamily}
                                    fontSize={{ base: "12px", md: "14px" }}
                                    mb="10px"
                                >
                                    Description :
                                </Text>
                                <Textarea
                                    _placeholder={{
                                        fontFamily: FontFamily,
                                    }}
                                    placeholder="Description..."
                                    disabled={loading}
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                ></Textarea>
                            </Box>
                            {/* <Box mt="30px" w="100%">
                            <Text
                                fontFamily={FontFamily}
                                fontSize={{ base: "12px", md: "14px" }}
                                mb="10px"
                            >
                                Due Date :
                            </Text>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) =>
                                    setStartDate(date ? date : new Date())
                                }
                                className="custom-datepicker"
                            />
                        </Box> */}
                            <Box mt="30px">
                                <Text
                                    fontFamily={FontFamily}
                                    fontSize={{ base: "12px", md: "14px" }}
                                    mb="10px"
                                >
                                    Select a new map :
                                </Text>
                                <Image
                                    src={
                                        selectedProjectDetails != null
                                            ? selectedProjectDetails.pImage
                                            : img
                                    }
                                    w="50%"
                                    h={{
                                        base: "120px",
                                        sm: "100px",
                                        md: "160px",
                                    }}
                                    alt="projectImage"
                                    cursor={"pointer"}
                                />
                            </Box>

                            {/* select contractor */}
                            {/* <Box mt="30px">
                            <Text fontFamily={FontFamily} mb="10px">
                                Select Contractor :
                            </Text>
                            <Select
                                placeholder={"Select Contractor"}
                                mt="10px"
                                h="30px"
                                fontSize="14px"
                                // value={sortValue}
                                // onChange={(e) => onClickSort(e.target.value)}
                            >
                                <option value="test"> test</option>
                                <option value="test2">test2</option>
                            </Select>
                        </Box> */}

                            <Button
                                onClick={onClickSubmit}
                                color={AppColors.white}
                                w="20%"
                                h="45px"
                                mt={"20px"}
                                mb="20px"
                                bg={AppColors.buttonColor1}
                                fontFamily={FontFamily}
                                _hover={{
                                    bg: AppColors.buttonColor1,
                                }}
                                fontSize={{ base: "12px", md: "14px" }}
                            >
                                {loading ? <Spinner /> : "Submit"}
                            </Button>
                        </Box>
                    </Box>
                }
            />
        </Box>
    );
};

export default SubmitTask;
