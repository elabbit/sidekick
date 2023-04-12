import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddTask from './AddTasks';
import { thunkDeleteTask, thunkUpdateTask } from '../../store/todo';
import EditTask from './EditTask';

const TodoTasks = ({ list, setSelectedList }) => {
    const dispatch = useDispatch();
    const [editingTaskId, setEditingTaskId] = useState(null);
    const listId = list.id
    const tasks = useSelector(state => state.todolists[listId]['tasks'])
    const [taskStatuses, setTaskStatuses] = useState({});


    useEffect(() => {
        const newTaskStatuses = {};
        const tasksArr = Object.values(tasks)
        tasksArr.forEach((task) => {
          newTaskStatuses[task.id] = task.status === true;
        });
        setTaskStatuses(newTaskStatuses);
      }, [tasks]);

    const deleteTask = async (taskId) => {
        await dispatch(thunkDeleteTask(taskId))
    }

    const handleCheck = async (e, task) => {
        e.preventDefault();
        const updatedTask = {
            ...task,
            status: taskStatuses[task.id] === false ? "true" : "false"
        };

        await dispatch(thunkUpdateTask(updatedTask, task));

        setTaskStatuses({
            ...taskStatuses,
            [task.id]: taskStatuses[task.id] === false ? true : false
        });
    };

    const deleteCheckedTasks = async () => {
        const checkedTasks = Object.values(tasks).filter(task => taskStatuses[task.id] === true);
        checkedTasks.forEach(async (task) => {
            await dispatch(thunkDeleteTask(task.id));
        });
    };

    const uncheckAllTasks = () => {
        const checkedTasks = Object.values(tasks).filter(task => taskStatuses[task.id] === true);
        checkedTasks.forEach(async (task) => {
            const updatedTask = {
                ...task,
                status: "false"
            }
            await dispatch(thunkUpdateTask(updatedTask, task));
        });

        const newTaskStatuses = {};
        Object.values(tasks).forEach(task => {
          newTaskStatuses[task.id] = false;
        });

        setTaskStatuses(newTaskStatuses);
      };

    const checkAllTasks = () => {
        const uncheckedTasks = Object.values(tasks).filter(task => taskStatuses[task.id] === false);
        uncheckedTasks.forEach(async (task) => {
            const updatedTask = {
                ...task,
                status: "true"
            }

            await dispatch(thunkUpdateTask(updatedTask, task));
        });

        const newTaskStatuses = {};
        Object.values(tasks).forEach(task => {
          newTaskStatuses[task.id] = true;
        });

        setTaskStatuses(newTaskStatuses);

    }


    return (
        <div>
            <button onClick={() => setSelectedList(null)}>Back</button>
            <div>{list.name}</div>
            {tasks && Object.values(tasks).map((task) => (
                <div key={task.id}>
                    {editingTaskId !== task.id &&
                        <>
                            <input type='checkbox'
                                checked={taskStatuses[task.id] === false || taskStatuses[task.id] === undefined ? false : true}
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

            <button onClick={deleteCheckedTasks}>Delete Checked Tasks</button>
            <button onClick={uncheckAllTasks}>Uncheck All</button>
            <button onClick={checkAllTasks}>Check All</button>

        </div>
    )
}

export default TodoTasks;
