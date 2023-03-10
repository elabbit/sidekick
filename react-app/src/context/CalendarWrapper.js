import React,{useState} from "react";
import dayjs from 'dayjs'
import CalendarContext from "./CalendarContext";


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
