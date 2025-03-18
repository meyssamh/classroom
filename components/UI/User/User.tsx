'use client'

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserName } from '@/types/redux';
import { fetchUser } from '@/lib/store/action/authActions';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { selectUser } from '@/lib/store/slice/authSlice';

/**
 * User component for displaying user's full name or username.
 *
 * @returns {JSX.Element} An element with the user's full name or username.
 */
const User = (): JSX.Element => {

	let user: UserName = useSelector(selectUser);

	// ThunkDispatch hook
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	// Fetch data when user.username is empty
	React.useEffect(() => {
		if (user.username === '') {
			dispatch(fetchUser());
		}
	}, [user, dispatch]);

	// Decides if the fullname have to be shown or the username!
	const name = React.useMemo(() => {
		return !user?.firstname || !user?.lastname
			? user?.username || 'Unknown User'
			: `${user.firstname} ${user.lastname}`;
	}, [user]);

	const classes = {
		user: 'inline-flex items-center justify-between gap-2.5 bg-whitesmoke rounded-lg p-1.5',
		fullname: 'text-custom',
	};

	return (
		<section className={classes.user} role="user">
			{/* User's name */}
			<strong className={classes.fullname} role="name">
				{name}
			</strong>
			{/* User icon SVG */}
			<svg role="icon" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g id="User" role="iconPath">
					<path
						id="Vector"
						d="M20.0002 18.7503C22.9917 18.7503 25.4168 16.3252 25.4168 13.3337C25.4168 10.3421 22.9917 7.91699 20.0002 7.91699C17.0086 7.91699 14.5835 10.3421 14.5835 13.3337C14.5835 16.3252 17.0086 18.7503 20.0002 18.7503Z"
						stroke="#2e3452"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						id="Vector_2"
						d="M11.4127 32.083H28.5877C30.4909 32.083 31.9569 30.4465 31.0682 28.7637C29.7607 26.2882 26.7802 23.333 20.0002 23.333C13.2202 23.333 10.2396 26.2882 8.93226 28.7637C8.04348 30.4465 9.5095 32.083 11.4127 32.083Z"
						stroke="#2e3452"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
			</svg>
		</section>
	);
};

export default User;