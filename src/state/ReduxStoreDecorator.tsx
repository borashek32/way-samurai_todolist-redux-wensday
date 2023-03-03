import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType, store} from "./store";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

const id_1 = v1()
const id_2 = v1()

const initialGlobalState = {
  todolists: [
    {id: id_1, title: "What to learn", filter: "all"},
    {id: id_2, title: "What to buy", filter: "all"}
  ],
  tasks: {
    [id_1]: [
      {id: v1(), title: "HTML & CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: false}
    ],
    [id_2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Meat", isDone: true},
      {id: v1(), title: "Wheat", isDone: false}
    ]
  }
}


export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


// this is HOC
export const ReduxStoreDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}