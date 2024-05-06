export const alertMessage = (
    toast: any,
    status: string,
    title: string,
    description: string
) => {
    return toast({
        title: title,
        description: description,
        status: status,
        duration: 3000,
        isClosable: true,
    });
};
