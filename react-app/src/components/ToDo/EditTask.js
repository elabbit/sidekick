import React, { useEffect, useState } from 'react';

const EditTask = ({ task, editingTaskId, setEditingTaskId }) => {
    const [description, setDescription] = useState('')

    const openEditTaskForm = (task) => {
        setEditingTaskId(task.id)
        setDescription(task.description)
    }

    const closeEditTaskForm = () => {
        setEditingTaskId(null)
        setDescription('')
    }

    return (
        <div>
            {editingTaskId !== task.id &&
                <button onClick={() => openEditTaskForm(task)} className="edit task">
                    <i className="fa-regular fa-pen-to-square"></i>
                </button>
            }


            {task.id === editingTaskId &&
                <form>
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
