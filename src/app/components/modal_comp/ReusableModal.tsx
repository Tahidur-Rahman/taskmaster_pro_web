import {
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
} from "@chakra-ui/react";

interface modalCompInterface {
    isOpen: any;
    onClose: any;
    children: any;
    modalSizeInMd?: string;
    noFullInSm?: boolean;
}
const ReusableModal = ({
    isOpen,
    onClose,
    children,
    modalSizeInMd = "2xl",
    noFullInSm = false,
}: modalCompInterface) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={{
                base: noFullInSm ? modalSizeInMd : "full",
                md: modalSizeInMd,
            }}
            isCentered={true}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                {children}
            </ModalContent>
        </Modal>
    );
};

export default ReusableModal;
