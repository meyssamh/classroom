'use client'
import { useEffect, useState } from 'react';

/**
 * Functional component for date information.
 *
 * @returns {JSX.Element} An element that shows a calendar icon and the current date.
 */
const DateInfo = (): JSX.Element => {
	const [today, setToday] = useState<string>('');

	useEffect(() => {
		// Prepare the current date
		const date = new Date();
		const dateString = date.toDateString();
		const formattedDate = `${dateString.slice(8, 10)} ${dateString.slice(4, 7)}`;

		setToday(formattedDate);
	}, []);

	const classes = {
		background: 'flex p-2.5 justify-center items-center gap-2.5 rounded-lg bg-whitesmoke w-30',
		text: 'text-base font-semibold text-success m-0 cursor-pointer select-none',
	};

	return (
		<section className={classes.background} role="dateBackground">
			{/* Calendar SVG */}
			<svg
				role="icon"
				width="30"
				height="30"
				viewBox="0 0 30 30"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g id="Calendar" role="iconPath">
					<path
						id="Vector"
						d="M5.9375 10.9375C5.9375 9.55679 7.05679 8.4375 8.4375 8.4375H21.5625C22.9432 8.4375 24.0625 9.55679 24.0625 10.9375V21.5625C24.0625 22.9432 22.9432 24.0625 21.5625 24.0625H8.4375C7.05679 24.0625 5.9375 22.9432 5.9375 21.5625V10.9375Z"
						stroke="#2e3452"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						id="Vector_2"
						d="M10 5.9375V10.3125"
						stroke="#2e3452"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						id="Vector_3"
						d="M20 5.9375V10.3125"
						stroke="#2e3452"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						id="Vector_4"
						d="M9.6875 13.4375H20.3125"
						stroke="#2e3452"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
			</svg>
			{/* Current date */}
			<span className={classes.text} role="text">
				{today}
			</span>
		</section>
	);
};

export default DateInfo;