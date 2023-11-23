import { createSlice } from '@reduxjs/toolkit';
import { TagList } from './tagSlice';

export interface TrashList {
  id: string;
  title: string;
  comments: string;
  tags: TagList[];
  pin: boolean;
  date: string;
  background: string;
  priority: string;
}

export const trashSlice = createSlice({
  name: 'trash',
  initialState: [],
  reducers: {
    deleteTrash(state: TrashList[], action) {
      state.splice(
        state.findIndex((trash) => trash.id === action.payload),
        1
      );
    },
    addTrash(state: TrashList[], action) {
      state.push(action.payload);
    },
    restore(state: TrashList[], action) {
      state.splice(
        state.findIndex((trash) => trash.id === action.payload),
        1
      );
    },
  },
});

export const { addTrash, restore, deleteTrash } = trashSlice.actions;

export default trashSlice.reducer;
