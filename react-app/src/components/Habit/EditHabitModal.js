import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { editHabit } from "../../store/habits";

const EditHabit = ({habit, userId}) => {
    const [showModal, setShowModal] = useState(false);
    const [frequency, setFrequency] = useState(habit.frequency);

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const payload = {
        //     // user_id: userId,
        //     // name: habit.name,
        //     frequency: frequency,
        //     // daily: habit.daily,
        //     // start_date: habit.start_date
        // }

        const editedHabit = await dispatch(editHabit(habit.id, frequency))

        if(editedHabit){
            setFrequency(frequency)
            setShowModal(false)
        }

    }

    const handleCancel = (e) => {
        e.preventDefault();
        setFrequency(habit.frequency)
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
