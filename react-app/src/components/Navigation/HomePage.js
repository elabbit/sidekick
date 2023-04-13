import SideBar from "./SideBar";
import './HomePage.css'
import AllHabits from "../Habit/AllHabits";
import AddHabit from "../Habit/AddHabitModal";
import Calendar from "../Calendar/Calendar";
import { useState } from "react";
import AllToDoLists from "../ToDo/AllToDoLists";

const HomePage = () => {
    const [showHabit, setShowHabit] = useState(true)
    const [showToDo, setShowToDo] = useState(false)

    const displayHabit = () => {
        setShowHabit(true)
        setShowToDo(false)
    }

    const displayToDo = () => {
        setShowHabit(false)
        setShowToDo(true)
    }

    return (
        <>
            <div id="home-container">
                <div id="side-container">
                    <h3>SIDEBAR</h3>
                    <SideBar />
                    <div>
                        <button type="button" onClick={() => { displayHabit() }}>Go to Habit</button>
                        <button type="button" onClick={() => { displayToDo() }}>Got to Todo lists</button>
                    </div>
                </div>
                <div id="main-container">
                    <h3>MAIN CONTENT</h3>
                    <Calendar />
                    {showHabit && (
                        <div>
                            <AddHabit />
                            <AllHabits />
                        </div>
                    )
                    }
                    {showToDo && (
                        <div>
                            <AllToDoLists />
                        </div>
                    )}

                </div>
                <div id="misc-container">
                    <h3>MISC STATS, ETC</h3>
                </div>
            </div>
        </>
    )


}


export default HomePage;
