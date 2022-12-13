import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom: LocaltoDos } = recoilPersist({
  key: 'toDos',
  storage: localStorage,
});
const { persistAtom: LocalcategoryList } = recoilPersist({
  key: 'toDos',
  storage: localStorage,
});

export let Categories = ['TO_DO', 'DOING', 'DONE'];

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryList = atom({
  key: 'categoryList',
  default: ['TO_DO', 'DOING', 'DONE'],
  effects_UNSTABLE: [LocalcategoryList],
});

export const categoryState = atom<string>({
  key: 'category',
  default: Categories[0],
});

export const toDoState = atom<IToDo[]>({
  key: 'toDoList',
  default: [],
  effects_UNSTABLE: [LocaltoDos],
});

// selector를 사용해서 toDo를 분류
// -- 어떤 state를 가져다가 다른 state를 만들수있음
export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
