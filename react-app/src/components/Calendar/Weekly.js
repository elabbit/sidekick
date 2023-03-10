import React, { useContext } from "react";
import DayPicker from "./DayPicker";
import dayjs from "dayjs";
import CalendarContext from "../../context/CalendarContext";

const Weekly = ({ month }) => {
    const { monthIndex, setMonthIndex, currentDay, setCurrentDay, tempMonthIndex, setTempMonthIndex} = useContext(CalendarContext)

    function handleToday() {
        setMonthIndex(dayjs().month());
        setTempMonthIndex(dayjs().month())
        setCurrentDay(dayjs())
    }

    const findWeek = () => {
        let weekIndex;
        for(let i=0; i<month.length; i++){
            let week = month[i]
            for(let j=0; j<week.length; j++){
                if(dayjs(currentDay).format('MMDD') === week[j].format('MMDD')){
                    weekIndex = i;
                    break;
                }
            }
            if(weekIndex) break;
        }
        return weekIndex || 0;
    }

    return (
        <div>
            <button onClick={handleToday}>Today</button>
            <div className="weekdays">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
            </div>
            <div className="week-container">
                {month[findWeek()].map((day, i) => (
                    <DayPicker key={day.format("MMDD")} day={day} />
                ))}
            </div>
        </div>
    )

}


export default Weekly;
