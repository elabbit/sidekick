import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";

const EditHabit = ({freq, habitId}) => {
    const [showModal, setShowModal] = useState(false);
    const [frequency, setFrequency] = useState(freq);

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {

    }

    const handleCancel = (e) => {
        e.preventDefault();
        setShowModal(false);
    }

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Edit Habit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit}>
                        <h2>Edit habit</h2>
                        <label>Frequency:</label>
                        <input type="number" value={frequency}
                            onChange={(e) => setFrequency(e.target.value)} />
                        <button type="submit">Edit Habit</button>
                        <button type='button' onClick={handleCancel}>Cancel</button>
                    </form>
                </Modal>
            )}
        </div>
    )
}

export default EditHabit;
