import { useContext } from "react";
import CalendarContext from "../../context/CalendarContext";
import dayjs from "dayjs";

const DayPicker = ({day, grey = false}) => {
    const { currentDay, setCurrentDay, monthIndex, setTempMonthIndex } = useContext(CalendarContext)

    const getDayClass = (day) => {
        let classString = '';
        if (dayjs().format('DD-MM-YY') === day.format('DD-MM-YY')) {
            classString += "day-today"
        }
        if (currentDay.format('DD-MM-YY') === day.format('DD-MM-YY')) {
            classString += " day-current"
        }
        let currMonthIndex = monthIndex;
        if(monthIndex > 11){
            currMonthIndex = monthIndex%12;
        } else if(monthIndex<0){
            currMonthIndex = monthIndex+12;
                while(currMonthIndex < 0){
                    currMonthIndex = currMonthIndex+12;
                }

        }

        if(grey && currMonthIndex !== day.month()){
            classString += " day-grey"
        }

        return classString
    }

    const selectDay = () => {
        setCurrentDay(day)
        setTempMonthIndex(monthIndex)

    }


    return (
        <button onClick={selectDay} className={`${getDayClass(day)}`}>{day.format("DD")}</button>
    )

}

export default DayPicker;
