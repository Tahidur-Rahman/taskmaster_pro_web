import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    Select,
    Text,
    Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Layout from "../../layout/Layout";
import { FontFamily } from "../../constants/Font";
import { IoArrowBackOutline } from "react-icons/io5";
import { AppColors } from "../../constants/AppColors";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useParams } from "react-router-dom";

const img =
    "https://i.pinimg.com/736x/90/40/03/9040034f5d635f46a4fb92128964fcca.jpg";
const SubmitTask = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { type } = useParams();
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
                                {type == "new" ? "Submit" : "Edit"} Task
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
                                    src={img}
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
                                onClick={() => {}}
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
                                Submit
                            </Button>
                        </Box>
                    </Box>
                }
            />
        </Box>
    );
};

export default SubmitTask;
