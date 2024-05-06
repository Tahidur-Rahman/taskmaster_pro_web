import { Box, Button, Card, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FontFamily } from "../constants/Font";
import { AppColors } from "../constants/AppColors";

const img =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREg-0l8Zmq9ZoaGkZRA-bsqW-goMQOn7aTOl6hmP3b9w&s";

interface itemInterface {
    onClick: any;
}
const Task = ({ onClick }: itemInterface) => {
    return (
        <Card w={{ base: "95%", sm: "45%", md: "45%" }} py="20px" mb="10px">
            <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                px={"10px"}
                pb="10px"
            >
                <Text
                    fontFamily={FontFamily}
                    fontWeight={"600"}
                    color={AppColors.black}
                    fontSize={{ base: "14px", md: "15px" }}
                >
                    Task Title
                </Text>
                <Text
                    color={"grey"}
                    fontSize={{ base: "10px", md: "12px" }}
                    fontFamily={FontFamily}
                >
                    12/14/24
                </Text>
                {/* <HiDotsVertical /> */}
            </Flex>
            <Image
                src={img}
                w="100%"
                h={{ base: "150px", sm: "160px", md: "200px" }}
                alt="projectImage"
            />
            <Text
                px={"10px"}
                py="10px"
                fontFamily={FontFamily}
                fontSize={{ base: "12px", sm: "13px", md: "15px" }}
                // color={AppColors.grey}
            >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
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
