import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddTask from './AddTasks';
import { thunkDeleteTask } from '../../store/todo';
import EditTask from './EditTask';

const TodoTasks = ({ list, setSelectedList }) => {
    const dispatch = useDispatch();
    const [editingTaskId, setEditingTaskId] = useState(null);
    const listId = list.id
    const tasks = Object.values(useSelector(state => state.todolists[listId]['tasks']))
    const [taskStatuses, setTaskStatuses] = useState(tasks.reduce((acc, cur) => { acc[cur.id] = false; return acc; }, {}));

    console.log(taskStatuses)
    const deleteTask = async (taskId) => {
        await dispatch(thunkDeleteTask(taskId))
    }

    return (
        <div>
            <button onClick={() => setSelectedList(null)}>Back</button>
            <div>{list.name}</div>
            {tasks && tasks.map((task) => (
                <div key={task.id}>
                    {editingTaskId !== task.id &&
                        <>
                            <input type='checkbox' />
                            <label className='task-label'>{task.description}</label>
                        </>
                    }

                    <EditTask task={task} setEditingTaskId={setEditingTaskId} editingTaskId={editingTaskId} listId={listId}/>

                    {editingTaskId !== task.id &&
                        <button type="submit" onClick={() => deleteTask(task.id)}>
                            <i className="fa-solid fa-circle-minus"></i>
                        </button>
                    }
                </div>
            ))}

            <AddTask list={list} />

        </div>
    )
}

export default TodoTasks;
