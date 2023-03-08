import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import CalendarContext from "../../context/CalendarContext";
import { getMonth } from "../../util";
import "./Calendar.css";
import Monthly from "./Monthly";
import Weekly from "./Weekly";


const Calendar = () => {
    const { currentDay } = useContext(CalendarContext)
    const [currentMonth, setCurrentMonth] = useState(getMonth(currentDay.month()));

    return (
        <div>
            <div>{dayjs(new Date(currentDay)).format("dddd, MMMM D, YYYY")}</div>
            <Monthly month={currentMonth} setCurrentMonth={setCurrentMonth} />
                <Weekly month={currentMonth} setCurrentMonth={setCurrentMonth}/>

        </div>
    )
}


export default Calendar;
