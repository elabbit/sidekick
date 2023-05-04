import React,{useState} from "react";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import CalendarContext from "./CalendarContext";

dayjs.extend(utc)

const CalendarWrapper = (props) => {
    const [currentDay, setCurrentDay] = useState(dayjs())
    const [monthIndex, setMonthIndex] = useState(currentDay.month());
    const [tempMonthIndex, setTempMonthIndex] = useState(monthIndex);


    return (
        <CalendarContext.Provider value={{monthIndex, setMonthIndex, currentDay, setCurrentDay, tempMonthIndex, setTempMonthIndex}}>
            {props.children}
        </CalendarContext.Provider>
    )

}

export default CalendarWrapper;
