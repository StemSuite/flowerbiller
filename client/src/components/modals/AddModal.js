import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import OpenModalButton from '../buttons/OpenModalButton';

function AddModal({ title, onSumbit, preventClose, modalBody, disabled }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	function handleSubmit() {
		onSumbit();
		if ( !preventClose ) onClose();
	}

	return (
		<>
			<OpenModalButton text={title} onClick={onOpen}></OpenModalButton>
			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader color="green.400">{title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{modalBody}
					</ModalBody>
					<ModalFooter>
						<Button bg="green.400" color="white" onClick={handleSubmit} isDisabled={disabled}>Submit</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default AddModal;