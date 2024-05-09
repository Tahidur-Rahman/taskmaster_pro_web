import { Box } from "@chakra-ui/react";
import AllProjects from "./pages/app/AllProjects";
import { Routes, Route } from "react-router-dom";
import PendingTasks from "./pages/app/MySubmission";
import { Nav } from "./components/nav/Nav";
import { useContext } from "react";
import { AppContext } from "./context/AppContextProvider";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AppLoading from "./pages/AppLoading";
import MySubmission from "./pages/app/MySubmission";
import ProjectDetails from "./pages/app/ProjectDetails";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    const context = useContext(AppContext);
    const { user, appLoading } = context || {};
    return (
        <>
            {appLoading ? (
                <AppLoading />
            ) : user != null ? (
                <Box w="100%" h="auto">
                    <Nav />
                    <Routes>
                        <Route path="/" element={<AllProjects />} />
                        <Route
                            path="/mysubmission"
                            element={<MySubmission />}
                        />

                        <Route
                            path="/projectdetails/:projectId"
                            element={<ProjectDetails />}
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Box>
            ) : (
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            )}
        </>
    );
}

export default App;
