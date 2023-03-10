import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHabitTrack, deleteHabitTrack } from "../../store/habits";
import CalendarContext from "../../context/CalendarContext";

const AddRemoveHabitTrack = ({ habitId }) => {
    const dispatch = useDispatch()
    const [tracked, setTracked] = useState(false)
    const { currentDay } = useContext(CalendarContext)
    const habitTracks = useSelector(state => state.habits[habitId]["habit_tracks"])
    const trackedDates = habitTracks.map(item => item['date']) || []
    const formattedDate = currentDay.utc().format('ddd, DD MMM YYYY 00:00:00 [GMT]')
    const habitTrack = habitTracks.filter(item => item['date'] === formattedDate && item['habit_id'] === habitId)


    useEffect(() => {
        let dateToday = currentDay.utc().format('ddd, DD MMM YYYY 00:00:00 [GMT]')
        if (trackedDates.length) {
            if (trackedDates.includes(dateToday))
                setTracked(true)
            else
                setTracked(false)
        } else {
            setTracked(false)
        }
    }, [currentDay, trackedDates])


    const handleAddTrack = async (e) => {
        e.preventDefault();
        let dateOnlyString = currentDay.format().substring(0, 10)
        await dispatch(addHabitTrack(habitId, dateOnlyString))
        setTracked(true)
    }

    const handleRemoveTrack = async (habitTrackId) => {
        await dispatch(deleteHabitTrack(habitTrackId))
        setTracked(false)
    }

    return (
        <div>
            {tracked ? (
                <div>
                    <button onClick={() => handleRemoveTrack(habitTrack[0].id)}>-</button>
                </div>
            ) :

                <form onSubmit={handleAddTrack}>
                    <button type="submit">
                        +
                    </button>
                </form>
            }
        </div>
    )
}


export default AddRemoveHabitTrack;
