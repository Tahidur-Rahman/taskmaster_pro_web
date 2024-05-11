import { Box, Button, Card, Flex, Image, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FontFamily } from "../constants/Font";
import { AppColors } from "../constants/AppColors";
import { AppContext } from "../context/AppContextProvider";
import { taskInterface } from "../interfaces/resuable_interfaces";

const img =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREg-0l8Zmq9ZoaGkZRA-bsqW-goMQOn7aTOl6hmP3b9w&s";

interface itemInterface {
    onClick: any;
    onClickResubmit: any;
    task: taskInterface;
    projectImageUrl?: string;
}
const Task = ({
    onClick,
    task,
    projectImageUrl,
    onClickResubmit,
}: itemInterface) => {
    return (
        <Card
            w={{ base: "98%", sm: "97%", md: "97%" }}
            pb="10px"
            // h={"100%"}
            mb="10px"
            position={"relative"}
        >
            {/* task status label */}
            {task.type !== "task" && (
                <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    mr="10px"
                    bg={
                        task.status == "Rejected"
                            ? "#FF204E"
                            : task.status == "Pending"
                            ? "blue"
                            : "#68D2E8"
                    }
                    px="15px"
                    borderRadius={"5px"}
                    py="5px"
                    position={"absolute"}
                    right={"10px"}
                    top={"15px"}
                >
                    <Text
                        fontFamily={FontFamily}
                        fontSize={{ base: "11px", md: "13px" }}
                        color={AppColors.white}
                    >
                        {task.status}
                    </Text>
                </Flex>
            )}
            <Image
                src={
                    task.type == "task"
                        ? projectImageUrl != ""
                            ? projectImageUrl
                            : img
                        : task.imageUrl
                }
                w="100%"
                h={{ base: "150px", sm: "160px", md: "200px" }}
                alt="projectImage"
                borderTopLeftRadius={"5px"}
                borderTopRightRadius={"5px"}
            />

            <Flex px={"10px"} mt="5px" justifyContent={"space-between"}>
                <Text
                    color={AppColors.grey}
                    fontSize={{ base: "10px", md: "12px" }}
                    fontFamily={FontFamily}
                    fontWeight={"600"}
                >
                    Due Date :
                </Text>
                <Text
                    color={AppColors.black}
                    fontSize={{ base: "10px", md: "12px" }}
                    fontFamily={FontFamily}
                    ml="5px"
                >
                    {task.dueDate.slice(0, 10)}
                </Text>
            </Flex>

            <Box px={"10px"} pt="10px">
                <Text
                    fontFamily={FontFamily}
                    fontWeight={"600"}
                    color={AppColors.grey}
                    fontSize={{ base: "10px", md: "12px" }}
                >
                    {task.type == "task" ? "Task" : "Submitted task"} Name :
                </Text>
                <Text
                    fontFamily={FontFamily}
                    fontWeight={"500"}
                    color={AppColors.black}
                    fontSize={{ base: "12px", md: "14px" }}
                    // mt={"6px"}
                >
                    {task.title}
                </Text>

                {/* <HiDotsVertical /> */}
            </Box>
            <Box px="10px" mt="6px">
                <Text
                    fontFamily={FontFamily}
                    fontWeight={"600"}
                    color={AppColors.grey}
                    fontSize={{ base: "10px", md: "12px" }}
                >
                    {task.type == "task"
                        ? "Description"
                        : "Submitted Description"}
                    :
                </Text>
                <Text
                    fontFamily={FontFamily}
                    fontSize={{ base: "12px", md: "14px" }}
                    fontWeight={"500"}
                    // mt={"6px"}
                    // color={AppColors.grey}
                >
                    {task.description}
                </Text>
            </Box>

            <Flex px={"10px"} py="10px">
                {(task.status == "Pending" || task.status == "Rejected") && (
                    <Button
                        onClick={onClickResubmit}
                        color={AppColors.white}
                        w={{ base: "100px", md: "120px" }}
                        bg={AppColors.buttonColor1}
                        fontFamily={FontFamily}
                        _hover={{
                            bg: AppColors.buttonColor1,
                        }}
                        fontSize={{ base: "12px", md: "14px" }}
                    >
                        Re Submit
                    </Button>
                )}

                {task.type == "task" && (
                    <Button
                        onClick={onClick}
                        color={AppColors.white}
                        w={{ base: "100px", md: "120px" }}
                        bg={AppColors.buttonColor1}
                        fontFamily={FontFamily}
                        _hover={{
                            bg: AppColors.buttonColor1,
                        }}
                        fontSize={{ base: "12px", md: "14px" }}
                    >
                        Submit
                    </Button>
                )}
            </Flex>
        </Card>
    );
};

export default Task;
