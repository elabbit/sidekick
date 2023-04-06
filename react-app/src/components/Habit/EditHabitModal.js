import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { editHabit } from "../../store/habits";
import DeleteHabit from "./DeleteHabitModal";
import EditIcon from '../../icons/edit-icon.png';
import './Habit.css';

const EditHabit = ({habit}) => {
    const [showModal, setShowModal] = useState(false);
    const [frequency, setFrequency] = useState(habit.frequency);

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            <button className='edit-habit-btn' onClick={() => setShowModal(true)}><img src={EditIcon} className='edit-icon' /></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit}>
                        <h2>Edit habit</h2>
                        <label>Frequency:</label>
                        <input type="number" value={frequency}
                            onChange={(e) => setFrequency(e.target.value)} />
                        <button type="submit">Save</button>
                        <button type='button' onClick={handleCancel}>Cancel</button>
                    </form>
                    <DeleteHabit habit={habit}/>
                </Modal>
            )}
        </div>
    )
}

export default EditHabit;
