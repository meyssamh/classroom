import React from 'react';
import classNames from 'classnames';

import { StudentTagProps } from '$/declaration';
import Button from '../Button/Button';

/**
 * Component for displaying a student's name with their status (absent/present/unresolved).
 * The tag has three variants:
 * 1. Absent
 * 2. Present
 * 3. Unresolved (default)
 *
 * @param {string} text - Name of the student.
 * @param {string} variant - Type of the tag.
 * @param {MouseEventHandler} onClick - Handler for click event to edit student's status.
 * @param {MouseEventHandler} onAbsentClick - Handler for clicking on the absent button.
 * @param {MouseEventHandler} onPresentClick - Handler for clicking on the present button.
 * 
 * @returns {JSX.Element} A tag with a student's name and options to change their status.
 */
const StudentTag = ({
	text,
	variant = 'unresolved',
	onClick,
	onAbsentClick,
	onPresentClick,
}: StudentTagProps): JSX.Element => {
	const classes = {
		base: 'flex items-center justify-between p-0.5 pl-5 w-[398px] h-10 rounded-lg cursor-pointer border-0 focus:outline-none',
		variants: {
			absent: 'bg-danger',
			present: 'bg-blue',
			unresolved: 'bg-unresolved cursor-default'
		},
		text: 'font-semibold text-success',
		situation: 'text-white p-[5px_15px_5px_5px]',
		buttons: 'inline-flex items-center gap-5'
	};

	if (variant === 'absent' || variant === 'present') {
		const situationText = variant.charAt(0).toUpperCase() + variant.slice(1);

		return (
			<button
				className={classNames(classes.base, classes.variants[variant])}
				onClick={onClick}
			>
				<strong className={classes.text} role="text">
					{text}
				</strong>
				<strong className={classNames(classes.text, classes.situation)} role="situation">
					{situationText}
				</strong>
			</button>
		);
	}

	return (
		<div className={classNames(classes.base, classes.variants.unresolved)} role="tag">
			<strong className={classes.text} role="text">
				{text}
			</strong>
			<div className={classes.buttons} role="action">
				<Button variant="text-slim" text="Absent" onClick={onAbsentClick} />
				<Button variant="contained-slim" text="Present" onClick={onPresentClick} />
			</div>
		</div>
	);
};

export default StudentTag;