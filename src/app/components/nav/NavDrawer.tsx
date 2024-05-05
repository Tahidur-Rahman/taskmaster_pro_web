import {
    Box,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Image,
    Text,
    useToast,
} from "@chakra-ui/react";
import { FontFamily } from "../../constants/Font";
import { AppColors } from "../../constants/AppColors";
import { logo } from "../../constants/AppFiles";
import { useNavigate } from "react-router-dom";
import SideBarLinks from "../../layout/SideBarLinks";
import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";

interface navDrawerInterface {
    isOpen: any;
    onClose: any;
}
const NavDrawer = ({ isOpen, onClose }: navDrawerInterface) => {
    const toast = useToast();
    const navigate = useNavigate();
    const context = useContext(AppContext);

    const onClickSideLink = (name: string, routeName: string) => {
        if (context) {
            const { setActiveTab } = context;
            setActiveTab(name);
        }

        if (name == "Logout") {
            onClose();
            return;
        }
        onClose();
        navigate(routeName);
    };

    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg={"white"}>
                <DrawerCloseButton color={"red"} />

                {/*  logo and text */}
                <Flex
                    alignItems={"center"}
                    cursor={"pointer"}
                    pl="20px"
                    pt="15px"
                    onClick={() => {
                        navigate("/");
                        onClose();
                    }}
                >
                    <Text
                        mr="5px"
                        fontSize={"15px"}
                        fontFamily={FontFamily}
                        fontWeight={"600"}
                        color={AppColors.black}
                    >
                        TaskMasterPro
                    </Text>
                    <Image src={logo} w={"15px"} h={"15px"} />
                </Flex>

                <Box mt="20px" pl="10px" pr="20px">
                    <SideBarLinks onClick={onClickSideLink} />
                </Box>
            </DrawerContent>
        </Drawer>
    );
};

export default NavDrawer;
