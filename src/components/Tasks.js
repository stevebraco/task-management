import React from 'react';
import Task from './Task';

const Tasks = ({ tasks, isEdit, setIsEdit, setLists, index, id }) => {
  return (
    <>
      {tasks?.map((task, idx) => (
        <Task
          key={idx}
          task={task}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setLists={setLists}
          index={index}
          id={id}
          idx={idx}
        />
      ))}
    </>
  );
};

export default Tasks;
