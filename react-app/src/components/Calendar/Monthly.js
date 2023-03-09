import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import CalendarContext from "../../context/CalendarContext";
import { Modal } from "../../context/Modal";
import { getMonth } from "../../util";
import DayPicker from "./DayPicker";

const Monthly = ({ month, setCurrentMonth }) => {
    const [showModal, setShowModal] = useState(false);
    const { monthIndex, setMonthIndex, currentDay, setCurrentDay } = useContext(CalendarContext)

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex))
    }, [monthIndex, setCurrentMonth])

    useEffect(()=>{
        setCurrentMonth(getMonth(currentDay.month()))
        setMonthIndex(currentDay.month())
    }, [showModal, currentDay, setCurrentMonth, setMonthIndex])

    function handleToday() {
        setMonthIndex(dayjs().month());
        setCurrentDay(dayjs())
    }

    function handlePrev() {
        setMonthIndex(monthIndex - 1)
    }

    function handleNext() {
        setMonthIndex(monthIndex + 1)
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Calendar</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div>
                        <div>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</div>
                        <div>
                            <button onClick={handlePrev}>Prev</button>
                            <button onClick={handleToday}>Today</button>
                            <button onClick={handleNext}>Next</button>
                        </div>
                        <div className="weekdays">
                            <div>SUN</div>
                            <div>MON</div>
                            <div>TUE</div>
                            <div>WED</div>
                            <div>THU</div>
                            <div>FRI</div>
                            <div>SAT</div>
                        </div>
                        <div className="month-container">
                            {month.map((row, i) => (
                                <React.Fragment key={i}>
                                    {
                                        row.map((day, index) => (
                                            <DayPicker key={day.format("MMDD")} day={day} />
                                        ))
                                    }
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}


export default Monthly;