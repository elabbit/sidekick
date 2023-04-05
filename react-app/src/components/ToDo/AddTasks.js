import { useState } from "react";
import { thunkCreateTask } from "../../store/todo";
import { useDispatch } from "react-redux";


const AddTask = ({list}) => {
    const dispatch = useDispatch();
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState('')

    console.log("LIST ID", list.id)

    const createTask = async (e) => {
        e.preventDefault();
        let whitespace = /^\s*$/;
        if (description.length < 0 || whitespace.test(description)) {
            setErrors(["Cannot submit an empty task"])
            return
        };
        let task = await dispatch(thunkCreateTask({
            list_id: list.id,
            description: description,
            status: 'false'
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
                            Add Task
                        </button>
                    </form>
        </div>
    )
}


export default AddTask;
