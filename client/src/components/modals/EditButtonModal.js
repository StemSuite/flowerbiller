import { Button, Center, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { BiEdit } from 'react-icons/bi';

// eslint-disable-next-line no-unused-vars
function EditButtonModal({ title, onSubmit, preventClose, helperText, modalBody, disabled }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	function handleSubmit() {
		onSubmit();
		if ( !preventClose ) onClose();
	}

	function inputHelperText () {
		if ( helperText ) return <Text fontSize="sm" color="black">{helperText}</Text>;
	}

	return (
		<>
			<IconButton  size="xxs" onClick={onOpen} icon={<BiEdit/>}></IconButton>
			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader color="green.400">
						{title}
					</ModalHeader>
					{inputHelperText()}
					<ModalCloseButton />
					<ModalBody>
						<Center>
							<>{modalBody}</>
						</Center>
					</ModalBody>
					<ModalFooter>
						<Button bg="green.400" color="white" onClick={handleSubmit} isDisabled={disabled}>Save</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default EditButtonModal;