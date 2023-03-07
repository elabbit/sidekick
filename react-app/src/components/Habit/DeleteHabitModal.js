import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { deleteHabit } from "../../store/habits";

const DeleteHabit = ({habit}) => {
    const [showDeleteModal, setDeleteShowModal] = useState(false);
    const dispatch = useDispatch();

    const deleteSpecificHabit = async(habitId) => {
        await dispatch(deleteHabit(habitId))
    }

    return (
        <>
            <button onClick={() => setDeleteShowModal(true)}>Delete</button>
            {showDeleteModal && (
                <Modal onClose={() => setDeleteShowModal(false)}>
                    <div>
                        <div>
                            <h2>Delete Confirmation</h2>
                        </div>
                        <div>
                            <div>{`Are you sure you want to remove this Habit?`}</div>
                        </div>
                        <div>
                            <button onClick={() => deleteSpecificHabit(habit.id)}>Delete</button>
                        </div>
                        <div>
                            <button onClick={() => setDeleteShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default DeleteHabit;
