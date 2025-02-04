import { createAsyncThunk } from '@reduxjs/toolkit';

import { SigninData, SignupData } from '$/redux';

// Regex for validation
const nameRegex = /^[a-zA-Z]+$/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Async function to send login data to backend and recieve data.
 * 
 * @param {string} username Login's username
 * @param {string} password Login's password
 * 
 * @returns Data to be stored in redux state.
 */
export const fetchSignin = createAsyncThunk(
	'auth/signin',
	async (data: SigninData, { rejectWithValue }) => {
		const { username, password } = data;

		try {
			if (username.trim().length < 4 || password.length < 8) {
				throw new Error('Invalid input!');
			}

			const response = await fetch('/api/user/signin', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					'Accept': '*/*',
				},
				body: JSON.stringify({
					username,
					password,
				}),
			});

			if (response.status !== 200) {
				const errorData = await response.json();

				throw new Error(errorData.message as string);
			}

			document.cookie;

			const jsonData = await response.json();

			return jsonData;
		} catch (error: any) {
			return rejectWithValue(error);
		}
	}
);

/**
 * Async function to send Sign up data to backend and recieve data.
 * 
 * @param {string} firstname Firstname used in Sign up.
 * @param {string} lastname Lastname used in Sign up.
 * @param {string} username Username used in Sign up.
 * @param {string} email Email used in Sign up.
 * @param {string} password Password used in Sign up.
 * @param {string} confirmPassword Confirm password used in Sign up.
 * 
 * @returns Data to be stored in redux state.
 */
export const fetchSignup = createAsyncThunk(
	'auth/signup',
	async (data: SignupData, { rejectWithValue }) => {
		const { firstname, lastname, username, email, password, confirmPassword } = data;

		const validFirstname = typeof firstname === 'string' ? firstname : '';
		const validLastname = typeof lastname === 'string' ? lastname : '';

		try {
			if (validFirstname.trim().length > 0 && !validFirstname.match(nameRegex)) {
				throw new Error('InvalidInput');
			} else if (validLastname.trim().length > 0 && !validLastname.match(nameRegex)) {
				throw new Error('InvalidInput');
			} else if (!email.match(emailRegex) ||
				email.length === 0 ||
				username.length < 4 ||
				password.length < 8 ||
				password !== confirmPassword
			) {
				throw new Error('Invalid input!');
			}

			const response = await fetch('/api/user/signup', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					'Accept': '*/*',
				},
				body: JSON.stringify({
					firstname: validFirstname,
					lastname: validLastname,
					username,
					email,
					password,
					confirmPassword,
				}),
			});

			if (response.status !== 200) {
				const errorData = await response.json();

				throw new Error(errorData.message as string);
			}

			document.cookie;

			const jsonData = await response.json();

			return jsonData;
		} catch (error: any) {
			return rejectWithValue(error);
		}
	}
);

export const fetchSignout = createAsyncThunk(
	'auth/signout',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch('/api/user/signout', {
				method: 'POST',
				credentials: 'include',
			});

			if(response.status !== 200) {
				const errorData = await response.json();

				throw new Error(errorData.message as string);
			}

			return true;
		} catch (error: any) {
			return rejectWithValue(error);
		}
	}
);