import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, DatePicker } from "@nextui-org/react";

export default function App(training: { trainer: string | (readonly string[] & string) | undefined; description: string | (readonly string[] & string) | undefined; date: Date; }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} color="primary">Open Modal</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col">редагувати тренування</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    value={training.trainer}
                                    label="Тренер"
                                    variant="bordered"
                                />
                                <Input
                                    label="Назва"
                                    value={training.description}
                                    variant="bordered"
                                />
                                <DatePicker
                                    label="Дата"

                                    // value={training.date}
                                    isRequired
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Закрити
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Редагувати
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}