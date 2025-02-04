import { createSlice } from '@reduxjs/toolkit';

import { ClassState } from '$/redux';
import {
	fetchClass,
	fetchNewStudent,
	fetchUpdateStudent,
	fetchDeleteStudent,
	fetchNewSession,
	fetchUpdateSession,
	fetchDeleteSession
} from '../action/classActions';

// State
const initialState: ClassState = {
	data: {
		class: { id: 0, classname: '' },
		students: [],
		sessions: []
	},
	loading: 'idle',
	error: null,
};

// Slice
const classSlice = createSlice({
	name: 'class',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchClass.pending, state => {
			state.loading = 'pending';
			state.error = null;
		});
		builder.addCase(fetchClass.fulfilled, (state, action) => {
			state.data = action.payload;
			state.loading = 'idle';
			state.error = null;

			localStorage.setItem('students', JSON.stringify(action.payload.students));
		});
		builder.addCase(fetchClass.rejected, (state, action) => {
			const errorPayload: any = action.payload;
			state.loading = 'failed';
			state.error = errorPayload.message;
		});
		builder.addCase(fetchNewStudent.pending, state => {
			state.loading = 'pending';
			state.error = null;
		});
		builder.addCase(fetchNewStudent.fulfilled, (state, action) => {
			state.data.students.push(action.payload.newStudent);
			state.loading = 'succeeded';
			state.error = null;

			const students = state.data.students;
			localStorage.setItem('students', students.toString());
		});
		builder.addCase(fetchNewStudent.rejected, (state, action) => {
			const errorPayload: any = action.payload;
			state.loading = 'failed';
			state.error = errorPayload.message;
		});
		builder.addCase(fetchUpdateStudent.pending, state => {
			state.loading = 'pending';
			state.error = null;
		});
		builder.addCase(fetchUpdateStudent.fulfilled, (state, action) => {
			state.data.students.map(student => {
				if (student.id === action.payload.updatedStudent.id) {
					student.firstname = action.payload.updatedStudent.firstname;
					student.lastname = action.payload.updatedStudent.lastname;
				}
			});
			state.loading = 'succeeded';
			state.error = null;

			const students = state.data.students;
			localStorage.setItem('students', students.toString());
		});
		builder.addCase(fetchUpdateStudent.rejected, (state, action) => {
			const errorPayload: any = action.payload;
			state.loading = 'failed';
			state.error = errorPayload.message;
		});
		builder.addCase(fetchDeleteStudent.pending, state => {
			state.loading = 'pending';
			state.error = null;
		});
		builder.addCase(fetchDeleteStudent.fulfilled, (state, action) => {
			const index = state.data.students.findIndex(student => {
				return student.id === action.payload.deletedStudent.id;
			});
			state.data.students.splice(index, 1);
			state.loading = 'succeeded';
			state.error = null;

			const students = state.data.students;
			localStorage.setItem('students', students.toString());
		});
		builder.addCase(fetchDeleteStudent.rejected, (state, action) => {
			const errorPayload: any = action.payload;
			state.loading = 'failed';
			state.error = errorPayload.message;
		});
		builder.addCase(fetchNewSession.pending, state => {
			state.loading = 'pending';
			state.error = null;
		});
		builder.addCase(fetchNewSession.fulfilled, (state, action) => {
			state.data.sessions.push(action.payload.newSession);
			state.loading = 'succeeded';
			state.error = null;
		});
		builder.addCase(fetchNewSession.rejected, (state, action) => {
			const errorPayload: any = action.payload;
			state.loading = 'failed';
			state.error = errorPayload.message;
		});
		builder.addCase(fetchUpdateSession.pending, state => {
			state.loading = 'pending';
			state.error = null;
		});
		builder.addCase(fetchUpdateSession.fulfilled, (state, action) => {
			const updatedSession = localStorage.getItem('selectedSession');

			state.data.sessions.map(session => {
				if (session.id === Number(updatedSession)) {
					session.situation = action.payload.updatedSession.situation;
				}
			});
			state.loading = 'succeeded';
			state.error = null;
		});
		builder.addCase(fetchUpdateSession.rejected, (state, action) => {
			const errorPayload: any = action.payload;
			state.loading = 'failed';
			state.error = errorPayload.message;
		});
		builder.addCase(fetchDeleteSession.pending, state => {
			state.loading = 'pending';
			state.error = null;
		});
		builder.addCase(fetchDeleteSession.fulfilled, (state, action) => {
			const index = state.data.sessions.findIndex(session => {
				return session.id === action.payload.deletedSession.id;
			});
			state.data.sessions.splice(index, 1);
			state.loading = 'succeeded';
			state.error = null;
		});
		builder.addCase(fetchDeleteSession.rejected, (state, action) => {
			const errorPayload: any = action.payload;
			state.loading = 'failed';
			state.error = errorPayload.message;
		});
	},
	reducers: {}
});

const classReducer = classSlice.reducer;

export default classReducer;