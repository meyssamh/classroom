import React from 'react';
import classNames from 'classnames';

import { NavigationButtonProps } from '$/declaration';

/**
 * Functional component for buttons in sidebar.
 *
 * @param {string} text Button text.
 * @param {string} variant Type of button.
 * @param {string} icon Name of the icon we want to use. Optional!
 * @param {MouseEventHandler} onClick Event handler for the button.
 *
 * @returns {JSX.Element} A button to use in sidebar.
 */
const NavigationButton = ({
	text,
	variant,
	icon,
	onClick,
}: NavigationButtonProps): JSX.Element => {
	const classes = {
		buttonBase: 'border-none cursor-pointer bg-transparent p-0',
		buttonFocus: 'focus:outline-none',
		iconText: 'inline-flex items-center gap-[0.88rem]',
		text: 'font-normal cursor-pointer',
		logout: 'text-[#908c89]',
	};

	const buttonClassNames = icon === 'logout'
		? classNames(classes.buttonBase, classes.iconText, classes.logout)
		: classNames(classes.buttonBase, classes.iconText);

	const textClassNames = icon === 'logout'
		? classNames(classes.text, classes.logout)
		: classes.text;

	const homeIcon = (
		<svg
			role="icon"
			width="30"
			height="30"
			viewBox="0 0 30 30"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="Home" role="iconPath">
				<path
					id="Vector"
					d="M8.43799 24.0624H21.5629C22.9437 24.0624 24.0629 22.9432 24.0629 21.5624V12.1875L15.0004 5.9375L5.93799 12.1875V21.5624C5.93799 22.9432 7.05729 24.0624 8.43799 24.0624Z"
					stroke="#2e3452"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					id="Vector_2"
					d="M12.187 19.6865C12.187 18.3058 13.3063 17.1865 14.687 17.1865H15.312C16.6927 17.1865 17.812 18.3058 17.812 19.6865V24.0615H12.187V19.6865Z"
					stroke="#2e3452"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
		</svg>
	);

	const tableIcon = (
		<svg
			role="icon"
			xmlns="http://www.w3.org/2000/svg"
			width="23"
			height="23"
			viewBox="0 0 23 23"
			fill="none"
		>
			<path
				role="iconPath"
				d="M2.875 20.125V2.875H20.125V20.125H2.875ZM4.3125 8.14583H18.6875V4.3125H4.3125V8.14583ZM9.58333 13.4167H13.4167V9.58333H9.58333V13.4167ZM9.58333 18.6875H13.4167V14.8542H9.58333V18.6875ZM4.3125 13.4167H8.14583V9.58333H4.3125V13.4167ZM14.8542 13.4167H18.6875V9.58333H14.8542V13.4167ZM4.3125 18.6875H8.14583V14.8542H4.3125V18.6875ZM14.8542 18.6875H18.6875V14.8542H14.8542V18.6875Z"
				fill="#2e3452"
			/>
		</svg>
	);

	const logoutIcon = (
		<svg
			role="icon"
			width="30"
			height="30"
			viewBox="0 0 30 30"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="Logout" role="iconPath">
				<path
					id="Vector"
					d="M19.6875 10.9375L24.0625 15L19.6875 19.0625"
					stroke="#908c89"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					id="Vector_2"
					d="M23.75 15H13.4375"
					stroke="#908c89"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					id="Vector_3"
					d="M19.0625 5.9375H8.4375C7.05679 5.9375 5.9375 7.05679 5.9375 8.4375V21.5625C5.9375 22.9432 7.05679 24.0625 8.4375 24.0625H19.0625"
					stroke="#908c89"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
		</svg>
	);

	const iconMap: Record<string, JSX.Element | undefined> = {
		home: homeIcon,
		table: tableIcon,
		logout: logoutIcon,
	};

	return (
		<button
			className={classNames(
				buttonClassNames,
				variant === 'icon-text' && classes.iconText
			)}
			onClick={onClick}
		>
			{icon && iconMap[icon]}
			<span className={textClassNames} role="text">
				{text}
			</span>
		</button>
	);
};

export default NavigationButton;