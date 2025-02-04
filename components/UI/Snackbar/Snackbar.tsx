import * as React from 'react';
import classNames from 'classnames';

import { SnackbarProps } from '$/declaration';

/**
 * Functional component for snackbar to show at fulfilled or rejected fetches.
 * 
 * @param {string} text The text you want to show the user.
 * @param {string} severity Type of snackbar. It can be either success or error.
 * 
 * @returns {JSX.Element} A snackbar to inform user.
 */
const Snackbar = ({ text, severity }: SnackbarProps): JSX.Element => {

	const classes = {
		base: 'inline-flex p-[0.8125rem] pr-[1.25rem] items-center gap-[0.625rem] rounded-[1.25rem] absolute bottom-3 right-3 z-10 animate-fade',
		success: 'bg-blue',
		error: 'bg-danger',
		text: 'text-white font-normal',
	};

	// SVGs
	const success = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="35"
			height="35"
			viewBox="0 0 35 35"
			fill="none"
		>
			<path
				d="M6.92712 17.4997C6.92712 11.6604 11.6608 6.92676 17.5 6.92676C23.3394 6.92676 28.073 11.6604 28.073 17.4997C28.073 23.339 23.3394 28.0726 17.5 28.0726C11.6608 28.0726 6.92712 23.339 6.92712 17.4997Z"
				stroke="#fcfcfc"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M14.2188 18.5938L14.8512 19.9418C15.3526 21.0102 16.849 21.0717 17.4364 20.0481L20.7812 14.2188"
				stroke="#fcfcfc"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);

	const error = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="35"
			height="35"
			viewBox="0 0 35 35"
			fill="none"
		>
			<path
				d="M6.92676 17.4997C6.92676 11.6604 11.6604 6.92676 17.4997 6.92676C23.339 6.92676 28.0726 11.6604 28.0726 17.4997C28.0726 23.339 23.339 28.0726 17.4997 28.0726C11.6604 28.0726 6.92676 23.339 6.92676 17.4997Z"
				stroke="#fcfcfc"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M14.2188 14.2188L20.7813 20.7813"
				stroke="#fcfcfc"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M20.7813 14.2188L14.2188 20.7813"
				stroke="#fcfcfc"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);

	return (
		<div
			className={classNames(
				classes.base,
				severity === 'success' ? classes.success : classes.error
			)}
			role={'alert'}
		>
			{severity === 'success' ? success : error}
			{/* Message */}
			<strong className={classes.text} role={'alertText'}>
				{text}
			</strong>
		</div>
	);
};

export default Snackbar;