import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddTask from './AddTasks';

const TodoTasks = ({ list }) => {
    const dispatch = useDispatch();
    const listId = list.id
    const tasks = Object.values(useSelector(state => state.todolists[listId]['tasks']))

    // tasks.map((task) => console.log(task.description))

    return (
        <div>
            <div>{list.name}</div>
            {tasks && tasks.map((task) => (
                <div key={task.id}>
                    <input
                        type='checkbox'
                    />
                    <label className='task-label'>{task.description}</label>
                </div>
            ))}
            <AddTask list={list}/>
        </div>
    )
}

export default TodoTasks;
