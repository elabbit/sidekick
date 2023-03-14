import React,{useState} from "react";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import CalendarContext from "./CalendarContext";

dayjs.extend(utc)

const CalendarWrapper = (props) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [tempMonthIndex, setTempMonthIndex] = useState(monthIndex);
    const [currentDay, setCurrentDay] = useState(dayjs())

    return (
        <CalendarContext.Provider value={{monthIndex, setMonthIndex, currentDay, setCurrentDay, tempMonthIndex, setTempMonthIndex}}>
            {props.children}
        </CalendarContext.Provider>
    )

}

export default CalendarWrapper;
