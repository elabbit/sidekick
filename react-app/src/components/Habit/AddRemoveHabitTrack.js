import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHabitTrack, deleteHabitTrack } from "../../store/habits";
import CalendarContext from "../../context/CalendarContext";



const AddRemoveHabitTrack = ({ habitId }) => {
    const dispatch = useDispatch()
    const { currentDay } = useContext(CalendarContext)
    const habitTracks = useSelector(state => state.habits[habitId]["habit_tracks"])

    let dateOnlyString = currentDay.format().substring(0, 10)

    const handleAddTrack = async (e) => {
        e.preventDefault();
        await dispatch(addHabitTrack(habitId, dateOnlyString))
    }

    const handleRemoveTrack = async (habitId, date) => {
        await dispatch(deleteHabitTrack(habitId, date))
    }

    return (
        <div>
            <form onSubmit={handleAddTrack}>
                <button type="submit">
                    +
                </button>
            </form>
            <div>
                <button onClick={() => handleRemoveTrack(habitId, dateOnlyString)}>-</button>
            </div>

        </div>
    )
}


export default AddRemoveHabitTrack;
