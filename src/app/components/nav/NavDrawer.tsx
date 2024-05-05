import {
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    useToast,
} from "@chakra-ui/react";

interface navDrawerInterface {
    isOpen: any;
    onClose: any;
}
const NavDrawer = ({ isOpen, onClose }: navDrawerInterface) => {
    const toast = useToast();

    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg={"white"}>
                <DrawerCloseButton color={"red"} />
            </DrawerContent>
        </Drawer>
    );
};

export default NavDrawer;
