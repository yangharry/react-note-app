import { createSlice } from '@reduxjs/toolkit';
import { TagList } from './tagSlice';

export interface NoteList {
  id: string;
  title: string;
  comments: string;
  tags: TagList[];
  pin: boolean;
  date: string;
  background: string;
  priority: string;
}

export const noteSlice = createSlice({
  name: 'note',
  initialState: [],
  reducers: {
    editNote(state: NoteList[], action) {
      let targetState = state.find((s) => s.id === action.payload.id);
      if (targetState) {
        targetState.title = action.payload.title;
        targetState.comments = action.payload.comments;
        targetState.tags = action.payload.tags;
        targetState.pin = action.payload.pin;
        targetState.date = action.payload.date;
        targetState.background = action.payload.background;
        targetState.priority = action.payload.priority;
      }
    },
    restoreNote(state: NoteList[], action) {
      state.push(action.payload);
    },
    deleteNote(state: NoteList[], action) {
      state.splice(
        state.findIndex((note) => note.id === action.payload),
        1
      );
    },
    addNote(state: NoteList[], action) {
      const id = crypto.randomUUID();
      if (state.length > 0) {
        state.push({
          id: id,
          title: action.payload.title,
          comments: action.payload.comments,
          tags: action.payload.tags,
          pin: false,
          date: action.payload.date,
          background: action.payload.background,
          priority: action.payload.priority,
        });
      } else {
        state.push({
          id: id,
          title: action.payload.title,
          comments: action.payload.comments,
          tags: action.payload.tags,
          pin: false,
          date: action.payload.date,
          background: action.payload.background,
          priority: action.payload.priority,
        });
      }
    },
    pinSet(state: NoteList[], action) {
      const targetState = state.find((note) => note.id === action.payload);
      if (targetState) {
        targetState.pin = !targetState.pin;
      }
    },
  },
});

export const { pinSet, addNote, deleteNote, restoreNote, editNote } = noteSlice.actions;

export default noteSlice.reducer;
