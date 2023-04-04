import { useState } from "react";
import { createTask } from "../../store/todo";


const AddTask = () => {
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState('')

    const createTask = async (e) => {
        e.preventDefault();
        let whitespace = /^\s*$/;
        if (description.length < 0 || whitespace.test(description)) {
            setErrors(["Cannot submit an empty task"])
            return
        };
        let task = await dispatch(createTask({
            listId: list.id,
            description: description,
            completionStatus: false
        }))
        if (task) {
            setErrors([])
            setDescription('')
        }
    }

    return (
        <div>
            {errors && errors.map((error) => (error))}
            <form onSubmit={createTask}>
                        <input
                            type='text'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder='Add a new task...'
                        />
                        <button type="submit">
                            <i className="fa-solid fa-circle-plus"></i>
                        </button>
                    </form>
        </div>
    )
}


export default AddTask;
