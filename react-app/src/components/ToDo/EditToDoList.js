import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateList } from "../../store/todo";

const EditToDoList = ({ list, hideForm }) => {
    const [name, setName] = useState(list.name);


    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedList = await dispatch(updateList(list.id, name))

        if (editedList) {
            setName(name);
            hideForm();
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        hideForm();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name}
                    onChange={(e) => setName(e.target.value)} />
                <button type="submit">Edit List Name</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )

}

export default EditToDoList;
