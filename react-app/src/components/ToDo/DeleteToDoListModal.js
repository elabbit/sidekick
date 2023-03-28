import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { deleteList } from "../../store/todo";

const DeleteToDoList = ({list}) => {
    const [showDeleteToDoModal, setshowDeleteToDoModal] = useState(false);
    const dispatch = useDispatch();

    const deleteSpecificList = async(listId) => {
        await dispatch(deleteList(listId))
        setshowDeleteToDoModal(false)
    }

    return (
        <>
            <button onClick={() => setshowDeleteToDoModal(true)}>Delete</button>
            {showDeleteToDoModal && (
                <Modal onClose={() => setshowDeleteToDoModal(false)}>
                    <div>
                        <div>
                            <h2>Delete Confirmation</h2>
                        </div>
                        <div>
                            <div>{`Are you sure you want to remove this List?`}</div>
                        </div>
                        <div>
                            <button onClick={() => deleteSpecificList(list.id)}>Delete</button>
                        </div>
                        <div>
                            <button onClick={() => setshowDeleteToDoModal(false)}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default DeleteToDoList;
