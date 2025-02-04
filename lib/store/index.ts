import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import authReducer from './slice/authSlice';
import homeReducer from './slice/homeSlice';
import classReducer from './slice/classSlice';

// Presisted configuration for development
const persistConfig = {
	key: 'root',
	storage,
};

// Combining reducers to make a root reducer
const rootReducer = combineReducers({
	auth: authReducer,
	home: homeReducer,
	class: classReducer,
});

// Presisted reducer for development
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration
export const store: Store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
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
			]
		},
	}),
});

// Presisted store for development
export const persistor = persistStore(store);

// Redux types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;