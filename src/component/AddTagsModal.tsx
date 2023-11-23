import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { TagList, addTag, deleteTag } from '../app/reducers/tagSlice';

interface TagModalProps {
  setIsAddTags: React.Dispatch<React.SetStateAction<boolean>>;
  isAddTags: boolean;
}

export function AddTagsModal({ isAddTags, setIsAddTags }: TagModalProps) {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tag); // tagSlice 에서 태그 데이터 가져오기
  const [tagInput, setTagInput] = useState(''); // input 값 초기화

  return (
    <div className="w-full h-full backdrop-blur bg-black bg-opacity-50 absolute flex items-center z-10">
      <div className="w-1/5 bg-white rounded p-4 m-auto flex flex-col">
        <div className="w-full flex justify-between items-center">
          {/* 모달창 제목 */}
          <div className="text-lg font-bold">Edit Tags</div>
          {/* 모달창 종료 */}
          <button
            className="material-icons font-bold text-gray-500"
            onClick={() => {
              setIsAddTags(false);
            }}
          >
            close
          </button>
        </div>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addTag(tagInput)); // tagSlice 에 태그 추가할 input 데이터 전달
            setTagInput(''); // input 값 초기화
          }}
        >
          <input
            type="text"
            className="w-full my-4 p-1 border-b-2 border-black outline-none"
            placeholder="new tag..."
            value={tagInput}
            onChange={(e) => {
              setTagInput(e.target.value); // input 값 입력
            }}
          />
        </form>
        {/* 모달창에 태그 목록 생성  */}
        {tags.map((tag: TagList) => {
          return (
            <div key={tag.id} className="w-full flex justify-between items-center py-2">
              <div className="font-semibold">{tag.title}</div>
              <button
                className="material-icons font-bold text-gray-500 text-lg"
                onClick={() => {
                  dispatch(deleteTag(tag.id));
                }} // 태그 삭제할 id 전달
              >
                close
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
