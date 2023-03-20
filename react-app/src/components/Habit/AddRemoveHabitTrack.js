import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHabitTrack, deleteHabitTrack } from "../../store/habits";
import CalendarContext from "../../context/CalendarContext";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const AddRemoveHabitTrack = ({ habit }) => {
    const dispatch = useDispatch()
    const { currentDay } = useContext(CalendarContext)
    const dateOnlyString = currentDay.format().substring(0, 10)
    const startDate = dayjs(currentDay.startOf('week')) //first day of week
    const habitTracks = useSelector(state => state.habits[habit.id]["habit_tracks"])

    //Object.entries() converts object to array of key-value pairs
    //Object.fromEntries() converts the filtered array back to an object.
    const filteredDates = Object.fromEntries(
        Object.entries(habitTracks).filter(([key]) => (dayjs(key).isBetween(startDate, currentDay, null, '[]')))
    )
    
    const sum = Object.values(filteredDates).reduce((acc, val) => acc + val, 0)

    const handleAddTrack = async (e) => {
        e.preventDefault();
        await dispatch(addHabitTrack(habit.id, dateOnlyString))
    }

    const handleRemoveTrack = async (habitId, date) => {

        if (sum > 0) await dispatch(deleteHabitTrack(habitId, date))
    }

    return (
        <div>
            <div>{sum}/{habit.frequency}x</div>
            <form onSubmit={handleAddTrack}>
                <button type="submit">
                    +
                </button>
            </form>
            {sum > 0 && (
                <div>
                    <button onClick={() => handleRemoveTrack(habit.id, dateOnlyString)}>-</button>
                </div>
            )}
        </div>
    )
}


export default AddRemoveHabitTrack;
