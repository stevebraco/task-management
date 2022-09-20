import React, { useState } from 'react';
import styled from 'styled-components';
import Tasks from './Tasks';

const ListsStyles = styled.div`
  background: #ffffff;
  width: 300px;
  padding: 0.5rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  height: 80vh;
`;

const FlexTitle = styled.div`
  font-size: 0.7rem;
  text-transform: capitalize;
  border-radius: 20px;
  background: ${(props) => `#${props.color}`};
  padding: 0.4rem;
  display: flex;
  align-items: center;
`;

const TitleList = styled.h1`
  font-size: 0.7rem;
  text-transform: capitalize;
  padding: 0.4rem;
`;

const WrapperTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  max-height: 45px;
  min-height: 45px;
  width: 100%;
`;

const BtnAddTask = styled.button`
  border: none;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  display: inline-block;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 1);
`;

const WrapperProgressBar = styled.div`
  border: 1px solid lightgray;
  border-radius: 50px;
  width: 100%;
`;
const ProgressBar = styled.div`
  background: blue;
  width: ${(props) => (props.progress ? `${props.progress}%` : '0')};
  height: 20px;
  background: ${(props) =>
    `${props.progress}` === '100' ? 'green' : '#1da1f2'};

  box-shadow: 2px 14px 15px -7px rgba(30, 166, 250, 0.36);
  border-radius: 50px;
  transition: all 0.5s;
`;

const Input = styled.input`
  height: 100%;
  font-weight: bolder;
`;

const List = ({ id, name, color, tasks, index, lists, setLists }) => {
  const [isEdit, setIsEdit] = useState(null);

  const handleAddTask = (idList) => () => {
    setIsEdit({
      addTasK: true,
      index: idList - 1,
    });
  };

  const handleDelete = (deleteId) => () => {
    const deleteList = lists.filter(({ id }) => id !== deleteId);
    setLists(deleteList);
  };

  const handleUpdateTitleList = (index) => (e) => {
    setIsEdit({
      idx: index,
      name: e.target.textContent,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value) {
      setLists((prevState) => {
        const lists = [...prevState];
        lists[isEdit.idx].name = e.target[0].value;
        return lists;
      });
    }
    setIsEdit(null);
  };

  const barProgress = (index) => {
    const status = lists[index].tasks.map((task) => task.status);
    const statusTrue = status.filter((x) => x === true).length;
    const statusFalse = status.filter((x) => x === false).length;
    return (statusTrue / (statusFalse + statusTrue)) * 100;
  };
  const handleSumitAddTask = (idList) => (e) => {
    if (e.target[0].value) {
      const current = new Date();
      const date = `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`;
      e.preventDefault();
      setLists((prevState) => {
        const newtask = {
          id: lists[idList - 1].tasks.length + 1,
          name: e.target[0].value,
          status: false,
          date,
        };
        let copy = [...prevState];
        copy[idList - 1] = {
          ...copy[idList - 1],
          tasks: [...copy[idList - 1].tasks, { ...newtask }],
        };
        return copy;
      });
    }

    setIsEdit(null);
  };
  return (
    <ListsStyles>
      <div>
        <WrapperTitle>
          {isEdit && isEdit.name === name && isEdit.idx === index ? (
            <form onSubmit={handleEditSubmit}>
              <Input defaultValue={name} />
            </form>
          ) : (
            <FlexTitle color={color}>
              <TitleList onClick={handleUpdateTitleList(index)}>
                {name}
              </TitleList>
              <span>{tasks.length}</span>
            </FlexTitle>
          )}
          <button onClick={handleDelete(id)}>X</button>
        </WrapperTitle>
        <Tasks
          tasks={tasks}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setLists={setLists}
          index={index}
          id={id}
        />
        {isEdit?.addTasK && isEdit.index === index && (
          <form onSubmit={handleSumitAddTask(id)}>
            <input type="text" placeholder="add task" />
          </form>
        )}

        <BtnAddTask onClick={handleAddTask(id)}>+ Add task</BtnAddTask>
      </div>
      <WrapperProgressBar>
        <ProgressBar progress={barProgress(index)} />
      </WrapperProgressBar>
    </ListsStyles>
  );
};

export default List;
