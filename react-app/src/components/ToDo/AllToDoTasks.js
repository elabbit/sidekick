import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const TodoTasks = ({ list }) => {
    const dispatch = useDispatch();
    const listId = list.id
    const tasks = Object.values(useSelector(state => state.todolists[listId]['tasks']))
    console.log("!!!!", tasks)

    // tasks.map((task) => console.log(task.description))

    return (
        <div>

            {tasks && tasks.map((task) => (
                <div key={task.id}>
                    <input
                        type='checkbox'
                    />
                    <label className='task-label'>{task.description}</label>
                </div>
            ))}
        </div>
    )
}

export default TodoTasks;
