import { createSlice } from '@reduxjs/toolkit';

import { HomeState } from '$/redux';
import {
	fetchClasses,
	fetchNewClass,
	fetchUpdateClass,
	fetchDeleteClass
} from '../action/homeActions';

//State
const initialState: HomeState = {
	data: {
		classes: []
	},
	loading: 'idle',
	error: null,
};

// Slice
const homeSlice = createSlice({
	name: 'home',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchClasses.pending, state => {
			state.loading = 'pending';
			state.error = null;
		});
		builder.addCase(fetchClasses.fulfilled, (state, action) => {
			state.data = action.payload;
			state.loading = 'idle';
			state.error = null;
		});
		builder.addCase(fetchClasses.rejected, (state, action) => {
			const errorPayload: any = action.payload;
			state.loading = 'failed';
			state.error = errorPayload.message;
		});
		builder.addCase(fetchNewClass.pending, state => {
			state.loading = 'pending';
			state.error = null;
		});
		builder.addCase(fetchNewClass.fulfilled, (state, action) => {
			state.data.classes.push(action.payload.newClass);
			state.loading = 'succeeded';
			state.error = null;
		});
		builder.addCase(fetchNewClass.rejected, (state, action) => {
			const errorPayload: any = action.payload;
			state.loading = 'failed';
			state.error = errorPayload.message;
		});
		builder.addCase(fetchUpdateClass.pending, state => {
			state.loading = 'pending';
			state.error = null;
		});
		builder.addCase(fetchUpdateClass.fulfilled, (state, action) => {
			state.data.classes.map(course => {
				if (course.id === action.payload.updatedClass.id) {
					course.classname = action.payload.updatedClass.classname;
				}
			});
			state.loading = 'succeeded';
			state.error = null;
		});
		builder.addCase(fetchUpdateClass.rejected, (state, action) => {
			const errorPayload: any = action.payload;
			state.loading = 'failed';
			state.error = errorPayload.message;
		});
		builder.addCase(fetchDeleteClass.pending, state => {
			state.loading = 'pending';
			state.error = null;
		});
		builder.addCase(fetchDeleteClass.fulfilled, (state, action) => {
			const index = state.data.classes.findIndex(course => {
				return course.id === action.payload.deletedClass.id;
			});
			state.data.classes.splice(index, 1);
			state.loading = 'succeeded';
			state.error = null;
		});
		builder.addCase(fetchDeleteClass.rejected, (state, action) => {
			const errorPayload: any = action.payload;
			state.loading = 'failed';
			state.error = errorPayload.message;
		});
	},
	reducers: {}
});

const homeReducer = homeSlice.reducer;

export default homeReducer;