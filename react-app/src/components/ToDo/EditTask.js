import React, { useEffect, useState } from 'react';
import { thunkUpdateTask } from '../../store/todo';
import { useDispatch, useSelector } from 'react-redux';


const EditTask = ({ task, listId, editingTaskId, setEditingTaskId }) => {
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();

    const openEditTaskForm = (task) => {
        setEditingTaskId(task.id)
        setDescription(task.description)
    }

    const closeEditTaskForm = () => {
        setEditingTaskId(null)
        setDescription('')
    }

    const updateTask = async (e, task) => {
        e.preventDefault();
        let whitespace = /^\s*$/;

        if (description.length < 0 || whitespace.test(description)) {
            return errors.push("Cannot submit an empty task")
        };

        const taskData = {
            list_id: listId,
            description: description,
            status: 'false'
        }
        let updatedTask = await dispatch(thunkUpdateTask(taskData, task))
        if (updatedTask) {
            setErrors([])
            setDescription('')
            setEditingTaskId(null)
        }
    }

    return (
        <div>
            {editingTaskId !== task.id &&
                <button onClick={() => openEditTaskForm(task)} className="edit task">
                    <i className="fa-regular fa-pen-to-square"></i>
                </button>
            }


            {task.id === editingTaskId &&
                <form onSubmit={(e) => updateTask(e, task)}>
                    <input
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <button type="submit">
                        <i className="fa-regular fa-circle-check"></i>
                    </button>
                    <button type="button" onClick={() => closeEditTaskForm()}>
                        <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                </form>
            }
        </div>
    )
}

export default EditTask;
