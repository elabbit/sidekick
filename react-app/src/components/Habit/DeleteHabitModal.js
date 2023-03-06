import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { deleteHabit } from "../../store/habits";

const DeleteHabit = ({habit}) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const deleteHabit = async(habitId) => {
        await dispatch(deleteHabit(habitId))
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div>
                        <div>
                            <h2>Delete Confirmation</h2>
                        </div>
                        <div>
                            <div>{`Are you sure you want to remove this Habit?`}</div>
                        </div>
                        <div>
                            <button onClick={() => deleteHabit(habit.id)}>Delete</button>
                        </div>
                        <div>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default DeleteHabit;
