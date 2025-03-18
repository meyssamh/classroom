import { createSelector, createSlice } from '@reduxjs/toolkit';
import isEqual from 'lodash/isEqual';

import { AuthState } from '$/redux';
import { fetchSignin, fetchSignout, fetchSignup, fetchUser } from '../action/authActions';
import { RootState } from '..';

const selectAuth = (state: RootState) => state.auth;

export const selectUser = createSelector(
    [selectAuth],
    (auth) => auth.data.user || { username: '', firstname: '', lastname: '' }
);

// State
const initialState: AuthState = {
	data: {
		user: {
			username: '',
			firstname: '',
			lastname: ''
		}
	},
	loading: 'idle',
	error: null,
};

// Slice
const authSlice = createSlice({
	name: 'auth',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchSignin.pending, state => {
			state.loading = 'pending';
			state.error = null;
		});
		builder.addCase(fetchSignin.fulfilled, (state, action) => {
			if (!isEqual(state.data, action.payload.data)) {
				state.data = action.payload.data;  // Update only if data has changed
			}
			state.loading = 'succeeded';
			state.error = null;
		});
		builder.addCase(fetchSignin.rejected, (state, action) => {
			const errorPayload: any = action.payload;
			state.loading = 'failed';
			state.error = errorPayload.message;
		});
		builder.addCase(fetchSignup.pending, state => {
			state.loading = 'pending';
			state.error = null;
		});
		builder.addCase(fetchSignup.fulfilled, (state, action) => {
			state.data = action.payload.data;
			state.loading = 'succeeded';
			state.error = null;
		});
		builder.addCase(fetchSignup.rejected, (state, action) => {
			const errorPayload: any = action.payload;
			state.loading = 'failed';
			state.error = errorPayload.message;
		});
		builder.addCase(fetchSignout.pending, state => {
			state.loading = 'pending';
			state.error = null;
		});
		builder.addCase(fetchSignout.fulfilled, state => {
			state.data.user.username = '';
			state.data.user.firstname = '';
			state.data.user.lastname = '';
			state.loading = 'idle';
			state.error = null;

			localStorage.clear();
		});
		builder.addCase(fetchSignout.rejected, (state, action) => {
			const errorPayload: any = action.payload;
			state.loading = 'failed';
			state.error = errorPayload.message;
		});
		builder.addCase(fetchUser.pending, state => {
			state.loading = 'pending';
			state.error = null;
		});
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			if (!isEqual(state.data, action.payload)) {
				state.data = action.payload || { user: { username: '', firstname: '', lastname: '' } };
			}
			state.loading = 'succeeded';
			state.error = null;
		});
		builder.addCase(fetchUser.rejected, (state, action) => {
			const errorPayload: any = action.payload;
			state.loading = 'failed';
			state.error = errorPayload.message;
		});
	},
	reducers: {}
});

const authReducer = authSlice.reducer;

export default authReducer;