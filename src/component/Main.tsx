import React, { useState } from 'react';
import { NewNoteModal } from './NewNoteModal';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { NoteList, deleteNote, pinSet } from '../app/reducers/noteSlice';
import DOMPurify from 'dompurify';
import { addTrash } from '../app/reducers/trashSlice';
import { TagList } from '../app/reducers/tagSlice';

export function Main() {
  const dispatch = useAppDispatch();
  const [isNewNote, setIsNewNote] = useState(false);
  const notes = useAppSelector((state) => state.note);
  const [searchText, setSearchText] = useState('');
  const searchNotes = notes.filter((note: NoteList) => {
    let text = searchText.replace(/ /gi, '');
    if (text === '') {
      return true;
    } else {
      return note.title.replace(/ /gi, '').indexOf(text) !== -1;
    }
  });

  const pinnedNotes = searchNotes.filter((note: NoteList) => note.pin);
  const noPinnedNotes = searchNotes.filter((note: NoteList) => !note.pin);

  const [inputTagsModal, setInputTagsModal] = useState(false);
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [inputTags, setInputTags] = useState<TagList[]>([]);
  const [background, setBackground] = useState('white');
  const [priority, setPriority] = useState('HIGH');
  const [mode, setMode] = useState('create');
  const [selectId, setSelectId] = useState('');

  return (
    <>
      {isNewNote && (
        <NewNoteModal
          selectId={selectId}
          setIsNewNote={setIsNewNote}
          inputTagsModal={inputTagsModal}
          setInputTagsModal={setInputTagsModal}
          title={title}
          setTitle={setTitle}
          comments={comments}
          setComments={setComments}
          inputTags={inputTags}
          background={background}
          priority={priority}
          setInputTags={setInputTags}
          setBackground={setBackground}
          setPriority={setPriority}
          mode={mode}
        />
      )}
      <div className="w-4/5 h-full bg-white">
        <div className="px-4 flex justify-between items-center h-12 shadow">
          <div className="text-lg font-bold">Notes</div>
          <button
            className="bg-amber-100 px-5 py-1 font-bold rounded shadow shadow-gray-400"
            onClick={() => {
              setMode('create');
              setSelectId('');
              setTitle('');
              setComments('');
              setInputTags([]);
              setPriority('');
              setBackground('');
              setIsNewNote(!isNewNote);
            }}
          >
            +
          </button>
        </div>
        <div className="w-full p-4">
          <input
            className="w-full rounded shadow shadow-gray-400 p-2 text-sm"
            placeholder="노트의 제목을 입력해주세요"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <div className="w-full py-4 flex justify-end">
            <button className="px-6 py-1 rounded shadow shadow-gray-400 bg-gray-200 font-bold">정렬</button>
          </div>
        </div>
        {pinnedNotes.length > 0 && (
          <div className="px-4 font-bold text-gray-400">
            Pinned Notes <span className="text-sm">({pinnedNotes.length})</span>
          </div>
        )}
        <div className="flex flex-wrap">
          {pinnedNotes.map((note: NoteList) => {
            return (
              <div className="p-3" key={note.id}>
                <div
                  className={`${
                    note.background === 'blue'
                      ? 'bg-blue-200 shadow-blue-400'
                      : note.background === 'red'
                      ? 'bg-red-200 shadow-red-400'
                      : note.background === 'green'
                      ? 'bg-green-200 shadow-green-400'
                      : 'bg-white shadow-gray-400'
                  }  w-72 h-64 rounded-lg p-3 shadow-lg`}
                >
                  <div className="flex items-center w-full h-1/6">
                    <div className="w-3/6 whitespace-nowrap overflow-hidden text-ellipsis text-lg font-bold">
                      {note.title}
                    </div>
                    <div className="w-2/6 text-right text-sm font-medium">{note.priority}</div>
                    <div
                      className="w-1/6 material-icons text-right text-lg text-red-600 cursor-pointer"
                      onClick={() => {
                        dispatch(pinSet(note.id));
                      }}
                    >
                      push_pin
                    </div>
                  </div>
                  <div className="py-2 h-3/6">
                    <div
                      className="h-full font-medium overflow-hidden text-ellipsis line-clamp-4"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.comments) }}
                    />
                  </div>
                  <div className="p-2 h-1/6">
                    <div>
                      {note.tags.map((tag) => {
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
                  </div>
                  <div className="w-full p-2 flex items-center text-gray-500 h-1/6">
                    <div className="text-xs w-4/6 font-bold">
                      {new Date(note.date).getMonth() +
                        '/' +
                        new Date(note.date).getDate() +
                        '/' +
                        new Date(note.date).getFullYear().toString().substr(2, 2)}{' '}
                      {new Date(note.date).getHours() > 12
                        ? `${new Date(note.date).getHours() - 12}:${new Date(note.date).getMinutes()}PM`
                        : `${new Date(note.date).getHours()}:${new Date(note.date).getMinutes()}AM`}
                    </div>
                    <div className="w-2/6 flex justify-between items-center">
                      <i
                        className="fa-solid fa-pen-to-square cursor-pointer"
                        onClick={(e) => {
                          setMode('edit');
                          setSelectId(note.id);
                          setTitle(note.title);
                          setComments(note.comments);
                          setInputTags(note.tags);
                          setPriority(note.priority);
                          setBackground(note.background);
                          setIsNewNote(true);
                        }}
                      ></i>
                      <div className="material-icons text-xl cursor-pointer">restore_from_trash</div>
                      <div
                        className="material-icons text-xl cursor-pointer"
                        onClick={() => {
                          dispatch(addTrash(note));
                          dispatch(deleteNote(note.id));
                        }}
                      >
                        delete
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {noPinnedNotes.length > 0 && (
          <div className="px-4 font-bold text-gray-400">
            All Notes <span className="text-sm">({noPinnedNotes.length})</span>
          </div>
        )}
        <div className="flex flex-wrap">
          {noPinnedNotes.map((note: NoteList) => {
            return (
              <div className="p-3" key={note.id}>
                <div
                  className={`${
                    note.background === 'blue'
                      ? 'bg-blue-200 shadow-blue-400'
                      : note.background === 'red'
                      ? 'bg-red-200 shadow-red-400'
                      : note.background === 'green'
                      ? 'bg-green-200 shadow-green-400'
                      : 'bg-white shadow-gray-400'
                  }  w-72 h-64 rounded-lg p-3 shadow-lg`}
                >
                  <div className="flex items-center w-full h-1/6">
                    <div className="w-3/6 whitespace-nowrap overflow-hidden text-ellipsis text-lg font-bold">
                      {note.title}
                    </div>
                    <div className="w-2/6 text-right text-sm font-medium">{note.priority}</div>
                    <div
                      className="w-1/6 material-icons text-right text-lg cursor-pointer"
                      onClick={() => {
                        dispatch(pinSet(note.id));
                      }}
                    >
                      push_pin
                    </div>
                  </div>
                  <div className="py-2 h-3/6">
                    <div
                      className="h-full font-medium overflow-hidden text-ellipsis line-clamp-4"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.comments) }}
                    />
                  </div>
                  <div className="p-2 h-1/6">
                    <div>
                      {note.tags.map((tag) => {
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
                  </div>
                  <div className="w-full p-2 flex items-center text-gray-500 h-1/6">
                    <div className="text-xs w-4/6 font-bold">
                      {new Date(note.date).getMonth() +
                        '/' +
                        new Date(note.date).getDate() +
                        '/' +
                        new Date(note.date).getFullYear().toString().substr(2, 2)}{' '}
                      {new Date(note.date).getHours() > 12
                        ? `${new Date(note.date).getHours() - 12}:${new Date(note.date).getMinutes()}PM`
                        : `${new Date(note.date).getHours()}:${new Date(note.date).getMinutes()}AM`}
                    </div>
                    <div className="w-2/6 flex justify-between items-center">
                      <i
                        className="fa-solid fa-pen-to-square cursor-pointer"
                        onClick={(e) => {
                          setMode('edit');
                          setSelectId(note.id);
                          setTitle(note.title);
                          setComments(note.comments);
                          setInputTags(note.tags);
                          setPriority(note.priority);
                          setBackground(note.background);
                          setIsNewNote(true);
                        }}
                      ></i>
                      <div className="material-icons text-xl cursor-pointer">restore_from_trash</div>
                      <div
                        className="material-icons text-xl cursor-pointer"
                        onClick={() => {
                          dispatch(addTrash(note));
                          dispatch(deleteNote(note.id));
                        }}
                      >
                        delete
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
