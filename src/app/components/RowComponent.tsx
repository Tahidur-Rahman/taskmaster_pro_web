import { Box } from "@chakra-ui/react";

interface rowInterface {
    children: any;
}
const RowComponent = ({ children }: rowInterface) => {
    return (
        <Box
            w="100%"
            display="flex"
            flexDirection="row"
            // py="60px"
        >
            {children}
        </Box>
    );
};

export default RowComponent;
