import React, {ChangeEvent} from 'react';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {AddItemForm} from '../components/utils/AddItemForm';
import {EditableSpan} from '../components/utils/EditableSpan';
import {useDispatch, useSelector} from "react-redux";
import {TodolistType} from "./AppWithRedux";
import {AppRootStateType} from '../state/store/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/reducers/tasks-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "../state/reducers/todolists-reducer";


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todolist: TodolistType
}

export function TodolistWithRedux({todolist}: PropsType) {

  const {id, title, filter} = todolist

  let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
  const dispatch = useDispatch()

  const addTask = (title: string) => dispatch(addTaskAC(title, id));
  const removeTodolist = () => dispatch(RemoveTodolistAC(id));
  const changeTodolistTitle = (title: string) => dispatch(ChangeTodolistTitleAC(title, id));

  const onAllClickHandler = () => dispatch(ChangeTodolistFilterAC("all", id))
  const onActiveClickHandler = () => dispatch(ChangeTodolistFilterAC("active", id))
  const onCompletedClickHandler = () => dispatch(ChangeTodolistFilterAC("completed", id))

  if (filter === "active") tasks = tasks.filter(t => !t.isDone)
  if (filter === "completed") tasks = tasks.filter(t => t.isDone)

  return (
    <div>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle}/>
        <IconButton onClick={removeTodolist}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>
      <div style={{paddingTop: "10px", paddingBottom: "10px"}}>
        {tasks &&
          tasks.map(t => {
            const onClickHandler = () => dispatch(removeTaskAC(t.id, id))
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, id))
            const onTitleChangeHandler = (newValue: string) => dispatch(changeTaskTitleAC(t.id, newValue, id))

            return <div key={t.id} className={t.isDone ? "is-done" : ""}>
              <Checkbox
                checked={t.isDone}
                color="primary"
                onChange={onChangeHandler}
              />
              <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
              <IconButton onClick={onClickHandler}>
                <Delete/>
              </IconButton>
            </div>
          })
        }
      </div>
      <div style={{paddingTop: '15px'}}>
        <Button variant={filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color={'inherit'}
                size={"small"}
        >
          All
        </Button>
        <Button variant={filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}
                size={"small"}
        >
          Active
        </Button>
        <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}
                size={"small"}
        >
          Completed
        </Button>
      </div>
    </div>
  )
}


