import React, { SetStateAction } from 'react';
import { CustomEditor } from './CustomEditor';
import { useAppDispatch } from '../app/hooks';
import { addNote, editNote } from '../app/reducers/noteSlice';
import { TagList } from '../app/reducers/tagSlice';
import { SelectTagsModal } from './SelectTagsModal';

interface NewNoteModalProps {
  setIsNewNote: React.Dispatch<SetStateAction<boolean>>;
  inputTagsModal: boolean;
  title: string;
  setTitle: React.Dispatch<SetStateAction<string>>;
  comments: string;
  setComments: React.Dispatch<SetStateAction<string>>;
  inputTags: TagList[];
  background: string;
  priority: string;
  setInputTags: React.Dispatch<SetStateAction<TagList[]>>;
  setBackground: React.Dispatch<SetStateAction<string>>;
  setPriority: React.Dispatch<SetStateAction<string>>;
  setInputTagsModal: React.Dispatch<SetStateAction<boolean>>;
  mode: string;
  selectId: string;
}

export function NewNoteModal({
  setIsNewNote,
  inputTagsModal,
  setInputTagsModal,
  title,
  setTitle,
  comments,
  setComments,
  inputTags,
  background,
  priority,
  setInputTags,
  setBackground,
  setPriority,
  mode,
  selectId,
}: NewNoteModalProps) {
  const dispatch = useAppDispatch();

  return (
    <>
      {inputTagsModal && (
        <SelectTagsModal setInputTagsModal={setInputTagsModal} setInputTags={setInputTags} inputTags={inputTags} />
      )}
      <div
        className="w-full h-full backdrop-blur bg-black bg-opacity-50 absolute"
        onClick={() => setIsNewNote(false)}
      ></div>
      <div className="w-1/2 h-1/2 m-auto fixed left-1/4 top-1/4 bg-white rounded p-4 flex flex-col">
        <div className="font-bold">노트 생성하기</div>
        <input
          className="w-full border text-lg pl-3 p-1 mt-4 border-gray-300"
          placeholder="제목..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <CustomEditor comments={comments} setComments={setComments} background={background} />
        <div className="flex">
          {inputTags.length > 0 &&
            inputTags.map((tag: TagList) => {
              return (
                <span
                  key={tag.id}
                  className="rounded px-1 py-0.5 font-medium mr-1"
                  style={{ backgroundColor: 'rgb(156 ,163 ,175, 0.3)', fontSize: '10px' }}
                >
                  {tag.title}
                </span>
              );
            })}
        </div>
        <div className="flex mt-4 justify-between text-sm font-bold">
          <button className="bg-gray-100 rounded px-4  shadow shadow-gray-400" onClick={() => setInputTagsModal(true)}>
            Add Tag
          </button>
          <div>
            배경색 :{' '}
            <select
              className="border border-gray-400  text-center rounded"
              onChange={(e) => {
                setBackground(e.target.value);
              }}
            >
              <option value="white">White</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
            </select>
          </div>
          <div>
            우선순위 :{' '}
            <select
              className="border border-gray-400  text-center rounded"
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            >
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="px-6 bg-amber-100 py-1 rounded shadow shadow-gray-200 font-bold"
            onClick={() => {
              if (mode === 'edit') {
                dispatch(
                  editNote({
                    id: selectId,
                    comments: comments,
                    title: title,
                    background: background,
                    priority: priority,
                    tags: inputTags,
                    date: new Date(),
                  })
                );
              } else {
                dispatch(
                  addNote({
                    comments: comments,
                    title: title,
                    background: background,
                    priority: priority,
                    tags: inputTags,
                    date: new Date(),
                  })
                );
              }
              setIsNewNote(false);
            }}
          >
            {mode === 'create' ? '생성하기' : '수정하기'}
          </button>
        </div>
      </div>
    </>
  );
}
