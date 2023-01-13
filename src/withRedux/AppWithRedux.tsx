import React from 'react';
import '../App.css';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskType} from '../components/Todolist';
import {AddItemForm} from '../components/utils/AddItemForm';
import {AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "../state/reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store/store";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed";


function AppWithRedux() {
  const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
  const dispatch = useDispatch()

  function addTodolist(title: string) {
    dispatch(AddTodolistAC(title))
  }

  const todos = todolists.map(tl => {
      return <Grid key={tl.id} item>
        <Paper style={{padding: "10px"}}>
          <TodolistWithRedux
            todolist={tl}
          />
        </Paper>
      </Grid>
    })

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "20px"}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {todos}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
