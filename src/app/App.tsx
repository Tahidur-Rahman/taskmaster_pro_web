import { Box } from "@chakra-ui/react";
import AllProjects from "./pages/app/AllProjects";
import { Routes, Route } from "react-router-dom";
import PendingTasks from "./pages/app/PendingTasks";
import { Nav } from "./components/nav/Nav";
import AddTask from "./pages/app/AddTask";
import { useContext } from "react";
import { AppContext } from "./context/AppContextProvider";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

function App() {
    const context = useContext(AppContext);
    const { user } = context || {};
    return (
        <>
            {user != null ? (
                <Box w="100%" h="auto">
                    <Nav />
                    <Routes>
                        <Route path="/" element={<AllProjects />} />
                        <Route
                            path="/pendingtasks"
                            element={<PendingTasks />}
                        />
                        <Route path="/addtask" element={<AddTask />} />
                        {/* <Route
       path="/project/:projectId/"
       element={<SingleProject />}
   /> */}
                    </Routes>
                </Box>
            ) : (
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            )}
        </>
    );
}

export default App;
