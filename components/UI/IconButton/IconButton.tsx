import React from 'react';
import classNames from 'classnames';

import { IconButtonProps } from '$/declaration';

/**
 * Functional component for buttons with icons.
 * IconButton has four variants:
 *
 * 1. outlined
 * 2. contained (default)
 * 3. contained-disabled
 * 4. contained-danger
 *
 * @param {string} icon Type of the icon we want to use in the button. It contains three icons: submit, submit-danger, and cancel.
 * @param {string} variant Variant of the IconButton.
 * @param {string} text Text to show in the button.
 * @param {MouseEventHandler} onClick Event handler for the button. Optional!
 *
 * @returns {JSX.Element} A button with an icon.
 */
const IconButton = ({ icon, variant, text, onClick }: IconButtonProps): JSX.Element => {
	const classes = {
		button: 'inline-flex px-5 py-2.5 justify-center items-center gap-2.5 rounded-lg border-0 cursor-pointer focus:outline-0',
		outlined: '!border border-success bg-transparent text-success',
		contained: 'bg-blue text-success',
		containedDisabled: 'bg-whitesmoke text-darkgray !cursor-not-allowed',
		containedDanger: 'bg-danger text-white',
		text: 'text-sm font-medium',
	};

	// Icons
	const icons = {
		'cancel': (
			<svg role={'icon'} xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
				<path role={'iconPath'} d="M19.4062 7.59375L7.59375 19.4062" stroke="#2e3452" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<path role={'iconPath'} d="M7.59375 7.59375L19.4062 19.4062" stroke="#2e3452" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
		'submit': (
			<svg role={'icon'} xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
				<path role={'iconPath'} d="M6.46875 14.4748L9.38244 18.4655C10.2957 19.7163 12.1701 19.692 13.0507 18.4179L20.5312 7.59375" stroke="#2e3452" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
		'submit-disabled': (
			<svg role={'icon'} xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
				<path role={'iconPath'} d="M6.46875 14.4748L9.38244 18.4655C10.2957 19.7163 12.1701 19.692 13.0507 18.4179L20.5312 7.59375" stroke="#a8a8a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
		'submit-danger': (
			<svg role={'icon'} xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
				<path role={'iconPath'} d="M7.59375 8.71875L8.54004 19.6012C8.64115 20.7639 9.6145 21.6562 10.7816 21.6562H16.2184C17.3855 21.6562 18.3589 20.7639 18.4599 19.6012L19.4062 8.71875" stroke="#fcfcfc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<path role={'iconPath'} d="M10.9688 8.4375V7.59375C10.9688 6.35111 11.9761 5.34375 13.2188 5.34375H13.7812C15.0239 5.34375 16.0312 6.35111 16.0312 7.59375V8.4375" stroke="#fcfcfc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<path role={'iconPath'} d="M5.625 8.71875H21.375" stroke="#fcfcfc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	};

	// Get the appropriate icon based on the icon prop
	const selectedIcon = icons[icon] || icons.submit;

	// Define button classes based on the variant
	const buttonClasses = classNames(classes.button, {
		[classes.outlined]: variant === 'outlined',
		[classes.contained]: variant === 'contained' || !variant,
		[classes.containedDisabled]: variant === 'contained-disabled',
		[classes.containedDanger]: variant === 'contained-danger',
	});

	return (
		<button
			className={buttonClasses}
			onClick={onClick}
			disabled={variant === 'contained-disabled'}
		>
			{selectedIcon}
			<span className={classes.text} role={'text'}>
				{text}
			</span>
		</button>
	);
};

export default IconButton;