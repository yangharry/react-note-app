import DOMPurify from 'dompurify';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { NoteList, deleteNote, pinSet, restoreNote } from '../app/reducers/noteSlice';
import { NewNoteModal } from './NewNoteModal';
import { useState } from 'react';
import { addTrash, deleteTrash, restore } from '../app/reducers/trashSlice';
import { TagList } from '../app/reducers/tagSlice';

interface TagePageProps {
  seletTag: string;
}

export function TagPage({ seletTag }: TagePageProps) {
  const dispatch = useAppDispatch();
  const [isNewNote, setIsNewNote] = useState(false);

  const notes = useAppSelector((state) => {
    if (seletTag === 'Trash') {
      return state.trash;
    } else {
      return state.note;
    }
  });
  const fiteredNotes = notes.filter((note: NoteList) => {
    if (seletTag === 'Trash') {
      return true;
    } else {
      let tags = note.tags.map((tag) => {
        return tag.title;
      });
      return tags.includes(seletTag);
    }
  });

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
          selectId={selectId}
        />
      )}
      <div className="w-4/5 h-full bg-white">
        <div className="px-4 flex justify-between items-center h-12 shadow">
          <div className="text-lg font-bold">{seletTag}</div>
          <button
            className="bg-amber-100 px-5 py-1 font-bold rounded shadow shadow-gray-400"
            onClick={() => {
              setMode('create');
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
        <div className="flex">
          {fiteredNotes.length === 0 && <div className="w-full text-center font-bold text-lg">노트가 없습니다</div>}
          {fiteredNotes.length > 0 &&
            fiteredNotes.map((note: NoteList) => {
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
                        className={`${
                          note.pin && 'text-red-600'
                        } w-1/6 material-icons text-right text-lg cursor-pointer`}
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
                        <div
                          className="material-icons text-xl cursor-pointer"
                          onClick={() => {
                            if (seletTag === 'Trash') {
                              dispatch(restoreNote(note));
                              dispatch(restore(note.id));
                            }
                          }}
                        >
                          restore_from_trash
                        </div>
                        <div
                          className="material-icons text-xl cursor-pointer"
                          onClick={() => {
                            if (seletTag === 'Trash') {
                              dispatch(deleteTrash(note.id));
                            } else {
                              dispatch(addTrash(note));
                              dispatch(deleteNote(note.id));
                            }
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
