import Checkbox from '@mui/material/Checkbox/Checkbox';
import React, {ChangeEvent, memo, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
import {useDispatch} from 'react-redux';
import {removeTaskAC, changeTaskStatusAC, changeTaskTitleAC} from './state/tasks-reducer';

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}


const TaskWithRedux = memo(({
                                task,
                                todolistId
}: TaskPropsType) => {
    let {id, isDone, title} = task
    const dispatch = useDispatch()


    const onClickHandler = useCallback(() => dispatch(removeTaskAC(id, todolistId)), [])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(id, newIsDoneValue, todolistId));
    }, [])
    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, todolistId));
    }, [])


    return <div className={isDone ? "is-done" : ""}>
        <Checkbox
            checked={isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})

export default TaskWithRedux;