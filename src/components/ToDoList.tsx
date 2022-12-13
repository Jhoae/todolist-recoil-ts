import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState, toDoSelector, categoryList } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [Allcategory, setAllCategory] = useRecoilState(categoryList);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    console.log('event.currentTarget.value', event.currentTarget.value);
    setCategory(event.currentTarget.value as any);
  };

  const addCategory = () => {
    let newCategory = prompt('추가할 카테고리의 이름은 무엇인가요?' + '');
    if (newCategory) {
      if (Allcategory.includes(newCategory)) {
        alert('이미 존재하는 카테고리입니다.');
        return;
      }
      setAllCategory([...Allcategory, newCategory]);
      setCategory(newCategory);
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingRight: '20px',
        }}
      >
        <h1>ToDo-List</h1>
        <button onClick={addCategory}>+</button>
      </div>
      <hr />
      <select value={category} onInput={onInput}>
        {Allcategory.map((categories: string) => {
          return (
            <option key={categories} value={categories}>
              {categories}
            </option>
          );
        })}
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
