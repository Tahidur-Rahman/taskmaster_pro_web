import { Box } from "@chakra-ui/react";
import AllProjects from "./pages/app/AllProjects";
import { Routes, Route } from "react-router-dom";
import PendingTasks from "./pages/app/PendingTasks";

function App() {
    return (
        <>
            <Box w="100%" h="auto">
                <Routes>
                    <Route path="/" element={<AllProjects />} />
                    <Route path="/pendingtasks" element={<PendingTasks />} />
                    {/* <Route
            path="/project/:projectId/"
            element={<SingleProject />}
        /> */}
                </Routes>
            </Box>
        </>
    );
}

export default App;
