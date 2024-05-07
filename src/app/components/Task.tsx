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
    task: taskInterface;
    projectImageUrl: string;
}
const Task = ({ onClick, task, projectImageUrl }: itemInterface) => {
    return (
        <Card
            w={{ base: "98%", sm: "97%", md: "97%" }}
            pb="10px"
            // h={"100%"}
            mb="10px"
        >
            <Image
                src={projectImageUrl != "" ? projectImageUrl : img}
                w="100%"
                h={{ base: "150px", sm: "160px", md: "200px" }}
                alt="projectImage"
                borderTopLeftRadius={"5px"}
                borderTopRightRadius={"5px"}
            />

            <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                px={"10px"}
                pt="10px"
            >
                <Text
                    fontFamily={FontFamily}
                    fontWeight={"600"}
                    color={AppColors.black}
                    fontSize={{ base: "14px", md: "15px" }}
                >
                    {task.title}
                </Text>
                <Text
                    color={"grey"}
                    fontSize={{ base: "10px", md: "12px" }}
                    fontFamily={FontFamily}
                >
                    {task.dueDate.slice(0, 10)}
                </Text>
                {/* <HiDotsVertical /> */}
            </Flex>
            <Text
                px={"10px"}
                py="10px"
                fontFamily={FontFamily}
                fontSize={{ base: "12px", sm: "13px", md: "15px" }}
                // color={AppColors.grey}
            >
                {task.description}
            </Text>

            <Flex px={"10px"} pb="10px">
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
                    Re Submit
                </Button>
            </Flex>
        </Card>
    );
};

export default Task;
