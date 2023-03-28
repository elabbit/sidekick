import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";

const AddToDoList = ({userId}) => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: userId,
            name: name
        }
    }

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Add To-Do List</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit}>
                        <h2>Add a new List</h2>
                        <label>List name</label>
                        <input type="text" value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <button type="submit">Add List</button>
                    </form>
                </Modal>
            )}
        </div>
    )
}

export default AddToDoList;
