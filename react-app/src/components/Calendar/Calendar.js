import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import CalendarContext from "../../context/CalendarContext";
import { getMonth } from "../../util";
import "./Calendar.css";
import Monthly from "./Monthly";
import Weekly from "./Weekly";


const Calendar = () => {
    const { monthIndex, currentDay } = useContext(CalendarContext)
    const [currentMonth, setCurrentMonth] = useState(getMonth(monthIndex));
    const [showWeekly, setShowWeekly] = useState(true)

    useEffect(()=>{
        setCurrentMonth(getMonth(currentDay.month()))
    }, [showWeekly])


    return (
        <div>
            <div>{dayjs(new Date(currentDay)).format("dddd, MMMM D, YYYY")}</div>
            <Monthly month={currentMonth} setCurrentMonth={setCurrentMonth} />
                <Weekly month={currentMonth} setCurrentMonth={setCurrentMonth}/>

        </div>
    )
}


export default Calendar;
