import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddTask from './AddTasks';
import { thunkDeleteTask, thunkUpdateTask } from '../../store/todo';
import EditTask from './EditTask';

const TodoTasks = ({ list, setSelectedList }) => {
    const dispatch = useDispatch();
    const [editingTaskId, setEditingTaskId] = useState(null);
    const listId = list.id
    const tasks = Object.values(useSelector(state => state.todolists[listId]['tasks']))
    const [taskStatuses, setTaskStatuses] = useState(() =>
        tasks.reduce((acc, task) => {
            acc[task.id] = task.status;
            return acc;
        }, {})
    );

    console.log(taskStatuses)

    const deleteTask = async (taskId) => {
        await dispatch(thunkDeleteTask(taskId))
    }

    const handleCheck = async (e, task) => {
        e.preventDefault();
        const isChecked = taskStatuses[task.id] === false ? true : false;
        const updatedTask = {
            ...task,
            status: isChecked ? 'true' : 'false'
        };

        await dispatch(thunkUpdateTask(updatedTask, task));

        setTaskStatuses({
            ...taskStatuses,
            [task.id]: isChecked
        });
    };

    return (
        <div>
            <button onClick={() => setSelectedList(null)}>Back</button>
            <div>{list.name}</div>
            {tasks && tasks.map((task) => (
                <div key={task.id}>
                    {editingTaskId !== task.id &&
                        <>
                            <input type='checkbox'
                                checked={taskStatuses[task.id] === false ? false : true}
                                onChange={(e) => handleCheck(e, task)}
                            />
                            <label className='task-label'>{task.description}</label>
                        </>
                    }

                    <EditTask task={task} setEditingTaskId={setEditingTaskId} editingTaskId={editingTaskId} listId={listId} />

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
