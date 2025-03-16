import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { Classes } from '$/redux';

/**
 * Async function to get data of all classes from backend.
 * 
 * @returns Data to be stored in redux state.
 */
export const fetchClasses = createAsyncThunk(
	'home/classes',
	async (_, { rejectWithValue }) => {
		const bearer = Cookies.get('access_token') === undefined ?
			'' :
			Cookies.get('access_token') as string;

		try {
			const response = await fetch('/api/classes/getClasses' as string, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Authorization': bearer,
					'Content-Type': 'application/json',
				}
			});

			if (response.status === 401) {
				throw new Error('Unauthorized');
			} else if (response.status !== 200) {
				throw new Error('Something went wrong!');
			}

			const jsonData = await response.json();

			return jsonData.data;

		} catch (error: any) {
			return rejectWithValue(error);
		}
	}
);

/**
 * Async function to post data of a class to backend.
 * 
 * @param {string} newClassname Name of the new class
 * 
 * @returns Data to be stored in redux state.
 */
export const fetchNewClass = createAsyncThunk(
	'home/newclass',
	async (newClassname: string, { rejectWithValue }) => {
		const bearer = Cookies.get('access_token') === undefined ?
			'' :
			Cookies.get('access_token') as string;

		try {
			if (newClassname.trim().length === 0) {
				throw new Error('Invalid input!');
			}

			const response = await fetch('/api/classes/newClass' as string, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Authorization': bearer,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					classname: newClassname
				})
			});

			if (response.status === 401) {
				throw new Error('Unauthorized');
			} else if (response.status !== 201) {
				throw new Error('Something went wrong!');
			}

			const jsonData = await response.json();

			return jsonData.data;
		} catch (error: any) {
			return rejectWithValue(error);
		}
	}
);

/**
 * Async function to put data of a class to backend.
 * 
 * @param {number} id Id of the chosen class
 * @param {string} classname Updated name of the chosen class
 * 
 * @returns Data to be stored in redux state.
 */
export const fetchUpdateClass = createAsyncThunk(
	'home/updateclass',
	async (data: Classes, { rejectWithValue }) => {
		const { id, classname } = data;
		const bearer = Cookies.get('access_token') === undefined ?
			'' :
			Cookies.get('access_token') as string;

		try {

			if (classname.trim().length === 0) {
				throw new Error('Invalid input!');
			}

			const response = await fetch(`/api/classes/${id}/updateClass` as string, {
				method: 'PUT',
				credentials: 'include',
				headers: {
					'Authorization': bearer,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					classname
				})
			});

			if (response.status === 401) {
				throw new Error('Unauthorized');
			} else if (response.status !== 200) {
				throw new Error('Something went wrong!');
			}

			const jsonData = await response.json();

			return jsonData.data;
		} catch (error: any) {
			return rejectWithValue(error);
		}
	}
);

/**
 * Async function to deleta data of a class from backend.
 * 
 * @param {number} id Id of the chosen class
 * 
 * @returns Data to be stored in redux state.
 */
export const fetchDeleteClass = createAsyncThunk(
	'home/deleteclass',
	async (id: number, { rejectWithValue }) => {
		const bearer = Cookies.get('access_token') === undefined ?
			'' :
			Cookies.get('access_token') as string;

		try {
			const response = await fetch(`/api/classes/${id}/deleteClass` as string, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Authorization': bearer,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					classId: id,
				})
			});

			if (response.status === 401) {
				throw new Error('Unauthorized');
			} else if (response.status !== 200) {
				throw new Error('Something went wrong!');
			}

			const jsonData = await response.json();

			return jsonData.data;

		} catch (error: any) {
			return rejectWithValue(error);
		}
	}
);