import Modal from 'react-modal';
import { useState } from 'react';
import OpenModalButton from '../buttons/OpenModalButton';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement( '#root' );

function FormModal( props ) {

	let subtitle;
	const [ modalIsOpen, setIsOpen ] = useState( false );

	function openModal() {
		setIsOpen( true );
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = '#f00';
	}

	function closeModal() {
		setIsOpen( false );
	}

	return (
		<div>
			<OpenModalButton text={props.title} onClick={openModal}/> 
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel={props.title}
			>
				<button onClick={closeModal}>close</button>
				<h2 ref={( _subtitle ) => ( subtitle = _subtitle )}>{props.title}</h2>
				{props.form( closeModal )}
			</Modal>
		</div>
	);
}

export default FormModal;