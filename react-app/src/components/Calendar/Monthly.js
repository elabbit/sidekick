import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import CalendarContext from "../../context/CalendarContext";
import { Modal } from "../../context/Modal";
import { getMonth } from "../../util";
import DayPicker from "./DayPicker";

const Monthly = ({ month, setCurrentMonth }) => {
    const [showModal, setShowModal] = useState(false);
    const { currentDay, monthIndex, setMonthIndex, setCurrentDay, tempMonthIndex, setTempMonthIndex } = useContext(CalendarContext)

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex))
    }, [monthIndex, setCurrentMonth, currentDay])

    useEffect(() => {
        setTempMonthIndex(currentDay.month())
    }, [currentDay])

    function handleToday() {
        setMonthIndex(dayjs().month());
        setTempMonthIndex(dayjs().month())
        setCurrentDay(dayjs())
    }

    function handlePrev() {
        setMonthIndex(monthIndex - 1)
    }

    function handleNext() {
        setMonthIndex(monthIndex + 1)
    }

    function handleClose(){
        setMonthIndex(tempMonthIndex)
        setShowModal(false)

    }

    return (
        <>
            <i className="fa-solid fa-calendar-days monthly" onClick={() => setShowModal(true)}/>
            {showModal && (
                <Modal onClose={handleClose}>
                    <div id="month-container">
                        <div id="month-header">{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</div>
                        <div id="month-calendar-nav">
                            <i className="fa fa-arrow-left-long" onClick={handlePrev}></i>
                            <button className="today-button" onClick={handleToday}>Today</button>
                            <i className="fa-solid fa-arrow-right-long" onClick={handleNext}></i>
                        </div>
                        <div id="month-weekdays-container">
                            <div>SUN</div>
                            <div>MON</div>
                            <div>TUE</div>
                            <div>WED</div>
                            <div>THU</div>
                            <div>FRI</div>
                            <div>SAT</div>
                        </div>
                        <div id="month-days-container">
                            {month.map((row, i) => (
                                <React.Fragment key={i}>
                                    {
                                        row.map((day, index) => (
                                            <DayPicker key={day.format("MMDD")} day={day} setShowModal={setShowModal} grey={true}/>
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
