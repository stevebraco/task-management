import React from 'react';
import styled from 'styled-components';
import List from './List';

const ContainerLists = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 30px;
`;

const Lists = ({ lists, setLists }) => {
  return (
    <ContainerLists>
      {lists.map((list, index) => (
        <List
          key={index}
          {...list}
          index={index}
          lists={lists}
          setLists={setLists}
        />
      ))}
    </ContainerLists>
  );
};

export default Lists;
