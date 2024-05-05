import { Box, Button, Card, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FontFamily } from "../constants/Font";
import { AppColors } from "../constants/AppColors";

const img =
    "https://i.pinimg.com/736x/90/40/03/9040034f5d635f46a4fb92128964fcca.jpg";
const Project = () => {
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
                >
                    Project Title goes here
                </Text>
                <Text color={"grey"} fontSize={"12px"} fontFamily={FontFamily}>
                    12/14/24
                </Text>
                {/* <HiDotsVertical /> */}
            </Flex>
            <Image src={img} w="100%" h="200px" alt="projectImage" />
            <Text
                px={"10px"}
                py="10px"
                fontFamily={FontFamily}
                fontSize={{ base: "13px", sm: "14px", md: "15px" }}
                // color={AppColors.grey}
            >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
            </Text>

            <Flex px={"10px"} pb="10px">
                <Button
                    mr="15px"
                    fontFamily={FontFamily}
                    color={AppColors.white}
                    bg={"green"}
                    _hover={{
                        bg: "green",
                    }}
                >
                    Details
                </Button>
                <Button
                    color={AppColors.white}
                    bg={"red"}
                    fontFamily={FontFamily}
                    _hover={{
                        bg: "red",
                    }}
                >
                    Edit
                </Button>
            </Flex>
        </Card>
    );
};

export default Project;