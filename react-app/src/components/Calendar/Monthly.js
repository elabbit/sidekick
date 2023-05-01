import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import CalendarContext from "../../context/CalendarContext";
import { Modal } from "../../context/Modal";
import { getMonth } from "../../util";
import DayPicker from "./DayPicker";

const Monthly = ({ month, setCurrentMonth }) => {
    const [showModal, setShowModal] = useState(false);
    const { monthIndex, setMonthIndex, setCurrentDay, tempMonthIndex, setTempMonthIndex } = useContext(CalendarContext)

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex))
    }, [monthIndex, setCurrentMonth])

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
            <i class="fa-solid fa-calendar-days monthly" onClick={() => setShowModal(true)}/>
            {showModal && (
                <Modal onClose={handleClose}>
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
                                            <DayPicker key={day.format("MMDD")} day={day} setShowModal={setShowModal}/>
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
