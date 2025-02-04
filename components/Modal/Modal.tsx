import * as React from 'react';

import { ModalProps } from '$/declaration';
import Overlay from '../UI/Overlay/Overlay';
import IconButton from '../UI/IconButton/IconButton';

/**
 * Functional modal component.
 *
 * @param {string} type - Type of modal. It can be either edit, edit-disabled, or delete.
 * @param {string} label - Label of modal.
 * @param {JSX.Element} children - Input fields used in edit or edit-disabled type modal. Optional!
 * @param {string} question - Question we use in delete type modal. Optional!
 * @param {MouseEventHandler} onCancelClick - Event handler for cancel button.
 * @param {MouseEventHandler} onProceedClick - Event handler for submit or delete button. Optional!
 * 
 * @returns {JSX.Element} A modal with its own overlay.
 */
const Modal: React.FC<ModalProps> = ({
	type,
	label,
	children,
	question,
	onCancelClick,
	onProceedClick
}) => {
	const classes = {
		modal: 'flex flex-col items-center justify-between w-[563px] flex-shrink-0 rounded-lg bg-white shadow-md',
		title: 'text-custom inline-block p-[30px_0] text-lg',
		line: 'w-[503px] h-[2px] bg-whitesmoke mb-8',
		input: 'w-full px-4',
		required: 'text-custom text-base font-normal pl-7',
		question: 'text-custom self-start !mb-8 pl-8',
		actions: 'flex items-center justify-end gap-[30px] w-full mb-[30px]',
		action: 'mr-[30px]',
	};

	return (
		<Overlay>
			<section className={classes.modal}>
				<section>
					<strong className={classes.title}>{label}</strong>
					<section className={classes.line}></section>
				</section>
				{type === 'edit' || type === 'edit-disabled' ? (
					<section className={classes.input}>
						{children}
						<strong className={classes.required}>* Required</strong>
					</section>
				) : (
					<section className={classes.question}>{question}</section>
				)}
				<section className={classes.actions}>
					<section>
						<IconButton
							variant={type === 'edit' || type === 'edit-disabled' ? 'outlined' : 'contained'}
							text={'Cancel'}
							icon={'cancel'}
							onClick={onCancelClick}
						/>
					</section>
					<section className={classes.action}>
						{type === 'edit' ? (
							<IconButton
								variant={'contained'}
								text={'Submit'}
								icon={'submit'}
								onClick={onProceedClick}
							/>
						) : type === 'edit-disabled' ? (
							<IconButton
								variant={'contained-disabled'}
								text={'Submit'}
								icon={'submit-disabled'}
							/>
						) : (
							<IconButton
								variant={'contained-danger'}
								text={'Delete'}
								icon={'submit-danger'}
								onClick={onProceedClick}
							/>
						)}
					</section>
				</section>
			</section>
		</Overlay>
	);
};

export default Modal;