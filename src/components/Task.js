import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const WrapperTask = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1rem 1rem;
  width: 100%;
  height: 80px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  opacity: ${(props) => props.status && '0.4'};
  margin: 8px 0;
`;

const TextTask = styled.span`
  padding: 0.2rem;
  margin: 0.5rem 0;
  font-weight: bold;
`;
const Date = styled.p`
  padding-top: 5px;
  font-size: 0.6rem;
`;
const WrapperClick = styled.div`
  display: flex;
  gap: 5px;
`;
const Task = ({ isEdit, setIsEdit, setLists, idx, index, task, id }) => {
  const handleDeleteTask = (idList, idTask) => () => {
    setLists((prevState) => {
      let lists = [...prevState];
      lists[idList - 1].tasks = lists[idList - 1].tasks.filter(
        (task) => task.id !== idTask
      );
      return lists;
    });
  };
  const handleUpdateTask = (index, indexList) => (e) => {
    e.preventDefault();
    setIsEdit({
      idx: index,
      indexList,
      name: e.target.textContent,
    });
  };

  const handleEditTaskSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value) {
      setLists((prevState) => {
        const lists = [...prevState];
        lists[isEdit.indexList].tasks[isEdit.idx].name = e.target[0].value;
        return lists;
      });
    }
    setIsEdit(null);
  };

  const handleStatus = (idx, index, status) => () => {
    console.log(status);
    setLists((prevState) => {
      const lists = [...prevState];
      lists[index].tasks[idx].status = !status;
      return lists;
    });
  };
  return (
    <>
      <WrapperTask status={task.status}>
        {isEdit?.name === task.name && isEdit.idx === idx ? (
          <form onSubmit={handleEditTaskSubmit}>
            <input defaultValue={task.name} />
          </form>
        ) : (
          <div>
            <TextTask onClick={handleUpdateTask(idx, index)}>
              {task.name}
            </TextTask>
            <Date>{moment().endOf(task.date).fromNow()}</Date>
          </div>
        )}
        <WrapperClick>
          <input
            type="checkbox"
            defaultChecked={task.status}
            onClick={handleStatus(idx, index, task.status)}
          />
          <button onClick={handleDeleteTask(id, task.id)}>X</button>
        </WrapperClick>
      </WrapperTask>
    </>
  );
};

export default Task;
