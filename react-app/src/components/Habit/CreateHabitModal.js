import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { addHabit } from "../../store/habits";

const AddHabit = () => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState('');
    const [daily, setDaily] = useState(false);
    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;


        const payload = {
            user_id: sessionUser.id,
            name: name,
            frequency: frequency,
            daily: daily,
            start_date: formattedDate
        }

        const createdHabit = await dispatch(addHabit(payload))

        if (createdHabit) {
            setErrors(createdHabit);
        } else {
            setErrors([]);
            setName('')
            setFrequency('')
            setDaily(false)
            setShowModal(false)
        }
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Add Habit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit}>
                        <h2>Add a new habit</h2>
                        {/* {errors && errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))} */}
                        <label>Habit name</label>
                        <input type="text" value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <label>Goal:</label>
                        {/* will probably change this to not be a drop down later; maybe toggle */}
                        <select value={daily} onChange={(e) => setDaily(e.target.value)}>
                            <option value="">--Select a schedule--</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                        </select>
                        <input type="number" value={frequency}
                            onChange={(e) => setFrequency(e.target.value)} />
                        <button type="submit">Add Habit</button>
                    </form>
                </Modal>
            )}
        </div>
    )

}

export default AddHabit;
