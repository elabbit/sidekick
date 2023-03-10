import React from 'react'

const CalendarContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index)=>{},
    currentDay: 0,
    setCurrentDay: (day)=>{},
    tempMonthIndex: 0,
    setTempMonthIndex: (index)=>{},
})

export default CalendarContext;
