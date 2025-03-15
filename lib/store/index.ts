import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import homeReducer from './slice/homeSlice';
import classReducer from './slice/classSlice';

let store: Store;
let persistor: any = null;

// Combine reducers
const rootReducer = combineReducers({
	auth: authReducer,
	home: homeReducer,
	class: classReducer,
});

if (process.env.NODE_ENV === 'production') {
	// Production store (without redux-persist)
	store = configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				immutableCheck: false,
				serializableCheck: {
					ignoredActions: [
						'auth/signin/rejected',
						'auth/signup/rejected',
						'home/classes/rejected',
						'home/newclass/rejected',
						'home/updateclass/rejected',
						'home/deleteclass/rejected',
						'class/class/rejected',
						'class/newstudent/rejected',
						'class/updatestudent/rejected',
						'class/deletestudent/rejected',
						'class/newsession/rejected',
						'class/updatesession/rejected',
						'class/deletesession/rejected',
					],
				},
			}),
	});
} else {
	// Development store (with redux-persist)
	const storage = require('redux-persist/lib/storage').default;
	const { persistReducer, persistStore } = require('redux-persist');

	const persistConfig = {
		key: 'root',
		storage,
	};

	const persistedReducer = persistReducer(persistConfig, rootReducer);

	store = configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				immutableCheck: false,
				serializableCheck: {
					ignoredActions: [
						'persist/PERSIST',
						'auth/signin/rejected',
						'auth/signup/rejected',
						'home/classes/rejected',
						'home/newclass/rejected',
						'home/updateclass/rejected',
						'home/deleteclass/rejected',
						'class/class/rejected',
						'class/newstudent/rejected',
						'class/updatestudent/rejected',
						'class/deletestudent/rejected',
						'class/newsession/rejected',
						'class/updatesession/rejected',
						'class/deletesession/rejected',
					],
				},
			}),
	});

	persistor = persistStore(store);
}

export { store, persistor };

// Redux types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;