import { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import Lists from './components/Lists';

const LISTS = [
  {
    id: 1,
    name: 'courses',
    tasks: [
      {
        id: 1,
        name: 'faire les courses',
        status: true,
      },
      {
        id: 2,
        name: 'acheter de leau',
        status: false,
      },
    ],
  },
  {
    id: 2,
    name: 'nouvelle liste',
    tasks: [],
  },
];

function App() {
  const [lists, setLists] = useState([]);

  const handleAddLists = () => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    const newLists = {
      id: lists.length + 1,
      name: 'nouvelle liste',
      tasks: [],
      color,
    };
    setLists([...lists, newLists]);
  };

  return (
    <div className="App">
      <button onClick={handleAddLists}>Add Lists</button>
      <Lists lists={lists} setLists={setLists} />
    </div>
  );
}

export default App;
