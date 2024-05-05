import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";

interface alertInterface {
    isOpen: any;
    onClose: any;
    titleText: string;
    askText: string;
    okBtnText: string;
    onClickOk: any;
    cancelRef: any;
}
const AlertDialogComp = ({
    askText,
    isOpen,
    okBtnText,
    onClickOk,
    onClose,
    titleText,
    cancelRef,
}: alertInterface) => {
    return (
        <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {titleText}
                    </AlertDialogHeader>

                    <AlertDialogBody>{askText}</AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button colorScheme="red" onClick={onClickOk} ml={3}>
                            {okBtnText}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default AlertDialogComp;
