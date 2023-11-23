import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import tagSliceReducer from './reducers/tagSlice';
import noteSliceReducer from './reducers/noteSlice';
import trashSliceReducer from './reducers/trashSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const reducer = combineReducers({
  tag: tagSliceReducer,
  note: noteSliceReducer,
  trash: trashSliceReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tag', 'note', 'trash'],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
