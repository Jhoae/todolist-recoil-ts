import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryList, categoryState, IToDo, toDoState } from '../atoms';

const DeleteButton = styled.button`
  margin-left: 30px;
  border: none;
  color: red;
  border-radius: 5px;
`;

const ToDotext = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
`;

function ToDo({ text, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const Allcategory = useRecoilValue(categoryList);
  const nowcategory = useRecoilValue(categoryState);

  const onChangeCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  let availableButton = Allcategory.filter(
    (categories: string) => categories !== nowcategory
  );

  const onDelete = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <ToDotext>
        <span>{text}</span>
        <DeleteButton onClick={onDelete}>X</DeleteButton>
      </ToDotext>
      {availableButton.map((btn: string) => (
        <button key={btn} name={btn} onClick={onChangeCategory}>
          {btn}
        </button>
      ))}
      <hr />
    </li>
  );
}

export default ToDo;
