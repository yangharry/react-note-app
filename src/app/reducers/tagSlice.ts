import { createSlice } from '@reduxjs/toolkit';

export interface TagList {
  id: string;
  title: string;
}

export const tagSlice = createSlice({
  name: 'tag',
  initialState: [],
  reducers: {
    // 태그 추가
    addTag(state: TagList[], action) {
      const id = crypto.randomUUID();
      state.push({ id: id, title: action.payload }); // 새로운 태그 추가
    },
    // 태그 삭제
    deleteTag(state: TagList[], action) {
      state = state.splice(
        state.findIndex((e) => e.id === action.payload),
        1
      ); // 전달 받는 id 와 같은 요소의 인덱스를 찾아서 삭제
    },
  },
});

export const { addTag, deleteTag } = tagSlice.actions;

export default tagSlice.reducer;
