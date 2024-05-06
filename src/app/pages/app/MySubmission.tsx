import { Box, Text } from "@chakra-ui/react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import { FontFamily } from "../../constants/Font";
import Task from "../../components/Task";

const MySubmission = () => {
    const navigate = useNavigate();
    const data = [0, 1, 2, 3, 4, 5, 6];

    const onClickEdit = (text: string) => {
        navigate("/submittask/edit");
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
                        px={{ base: "5px", sm: "5px", md: "20px" }}
                        py="20px"
                    >
                        {/* <Text textAlign={"center"} mb="20px">
                            My Submitted Tasks
                        </Text> */}
                        <Box
                            display={"flex"}
                            flexWrap={"wrap"}
                            gap={{ base: "10px", sm: "10px", md: "20px" }}
                            justifyContent={"center"}
                            // alignItems={"center"}
                        >
                            {data.map((item, index) => (
                                <Task
                                    key={index}
                                    onClick={() => onClickEdit("submit")}
                                />
                            ))}
                        </Box>
                    </Box>
                }
            />
        </Box>
    );
};

export default MySubmission;
