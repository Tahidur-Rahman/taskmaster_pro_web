import { Box, Button, Card, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FontFamily } from "../constants/Font";
import { AppColors } from "../constants/AppColors";
import { projectInterface } from "../interfaces/resuable_interfaces";

const img =
    "https://i.pinimg.com/736x/90/40/03/9040034f5d635f46a4fb92128964fcca.jpg";

interface itemInterface {
    onClickSubmitButton: any;
    onClickDetailsButton: any;
    project: projectInterface;
}
const Project = ({
    onClickSubmitButton,
    onClickDetailsButton,
    project,
}: itemInterface) => {
    return (
        <Card w={{ base: "98%", sm: "97%", md: "97%" }} py="20px" mb="10px">
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
                    {project.pName}
                </Text>
                <Text
                    color={"grey"}
                    fontSize={{ base: "10px", md: "12px" }}
                    fontFamily={FontFamily}
                >
                    {project.pTime.slice(0, 10)}
                </Text>
                {/* <HiDotsVertical /> */}
            </Flex>
            <Image
                src={project.pImage}
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
                {project.pDesc}
            </Text>

            <Flex px={"10px"} pb="10px">
                <Button
                    mr="15px"
                    fontFamily={FontFamily}
                    color={AppColors.white}
                    bg={AppColors.buttonColor1}
                    _hover={{
                        bg: AppColors.buttonColor1,
                    }}
                    fontSize={{ base: "12px", md: "14px" }}
                    onClick={onClickDetailsButton}
                >
                    Details
                </Button>
                <Button
                    onClick={onClickSubmitButton}
                    color={AppColors.white}
                    bg={"red"}
                    fontFamily={FontFamily}
                    _hover={{
                        bg: "red",
                    }}
                    fontSize={{ base: "12px", md: "14px" }}
                >
                    Submit
                </Button>
            </Flex>
        </Card>
    );
};

export default Project;
