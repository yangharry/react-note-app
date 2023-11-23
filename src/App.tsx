import React, { useState } from 'react';
import './App.css';
import { SideBar } from './component/SideBar';
import { Main } from './component/Main';
import { AddTagsModal } from './component/AddTagsModal';
import { TagPage } from './component/TagPage';

function App() {
  const [isAddTags, setIsAddTags] = useState(false);
  const [seletTag, setSeletTag] = useState('Notes');

  return (
    <div className="w-full h-full flex">
      {isAddTags && <AddTagsModal setIsAddTags={setIsAddTags} isAddTags={isAddTags} />}
      <SideBar setIsAddTags={setIsAddTags} setSeletTag={setSeletTag} />
      {seletTag === 'Notes' ? <Main /> : <TagPage seletTag={seletTag} />}
    </div>
  );
}

export default App;
