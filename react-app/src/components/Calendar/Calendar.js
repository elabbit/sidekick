import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import CalendarContext from "../../context/CalendarContext";
import { getMonth } from "../../util";
import "./Calendar.css";
import Monthly from "./Monthly";
import Weekly from "./Weekly";


const Calendar = () => {
    const { setMonthIndex, currentDay, setCurrentDay, setTempMonthIndex} = useContext(CalendarContext)
    const [currentMonth, setCurrentMonth] = useState(getMonth(currentDay.month()));

    useEffect(() => {
        setMonthIndex(currentDay.month())
    }, [currentDay])

    function handleToday() {
        setMonthIndex(dayjs().month());
        setTempMonthIndex(dayjs().month())
        setCurrentDay(dayjs())
    }

    return (
        <div id="calendar-container">
            <div id="calendar-header">
                {dayjs(new Date(currentDay)).format("dddd, MMMM D, YYYY")}
                <div id="calendar-header-right">
                <button className="today-button" onClick={handleToday}>Today</button>
                <Monthly month={currentMonth} setCurrentMonth={setCurrentMonth} />
                </div>
            </div>
            <Weekly month={currentMonth} setCurrentMonth={setCurrentMonth} />
        </div>
    )
}


export default Calendar;
