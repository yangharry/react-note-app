import ReactQuill from 'react-quill';
interface CustomEditorProps {
  setComments: React.Dispatch<React.SetStateAction<string>>;
  comments: string;
  background: string;
}

export function CustomEditor({ setComments, comments, background }: CustomEditorProps) {
  var toolbarOptions = [
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ['image', 'blockquote', 'code-block'],

    // [{ header: 1 }, { header: 2 }], // custom button values
    // [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    // [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    // [{ direction: 'rtl' }], // text direction

    // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],

    // [{ font: [] }],
    // [{ align: [] }],

    // ['clean'], // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions,
  };
  return (
    <ReactQuill
      className={`${
        background === 'blue'
          ? 'bg-blue-200 '
          : background === 'red'
          ? 'bg-red-200 '
          : background === 'green'
          ? 'bg-green-200 '
          : 'bg-white '
      }  mt-4 flex-1 pb-12 mb-2`}
      value={comments}
      modules={modules}
      onChange={(comments) => {
        setComments(comments);
      }}
    />
  );
}
