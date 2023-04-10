import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddTask from './AddTasks';
import { thunkDeleteTask } from '../../store/todo';

const TodoTasks = ({ list, setSelectedList }) => {
    const dispatch = useDispatch();
    const [description, setDescription] = useState('')
    const listId = list.id
    const tasks = Object.values(useSelector(state => state.todolists[listId]['tasks']))

    const deleteTask = async (taskId) => {
        await dispatch(thunkDeleteTask(taskId))
    }

    return (
        <div>
            <button onClick={() => setSelectedList(null)}>Back</button>
            <div>{list.name}</div>
            {tasks && tasks.map((task) => (
                <div key={task.id}>
                    <input type='checkbox' />
                    <label className='task-label'>{task.description}</label>
                    <button type="submit" onClick={() => deleteTask(task.id)}>
                        <i className="fa-solid fa-circle-minus"></i>
                    </button>
                </div>
            ))}
            <AddTask list={list} />
        </div>
    )
}

export default TodoTasks;
