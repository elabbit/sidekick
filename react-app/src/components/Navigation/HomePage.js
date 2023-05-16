import './HomePage.css'

import AllHabits from "../Habit/AllHabits";
import AddHabit from "../Habit/AddHabitModal";
import Calendar from "../Calendar/Calendar";
import UserCard from "../User/UserCard";
import LogoutButton from '../Auth/LogoutButton';
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
                <div id="side-outer-container">
                    <div id="side-inner-container">
                        <UserCard />
                        <div id="side-container-bottom">
                            <button type="button" className='side' id="side-habit" onClick={() => { displayHabit() }}>Go to Habit</button>
                            <button type="button" className='side' id="side-todo" onClick={() => { displayToDo() }}>Got to Todo lists</button>
                            <LogoutButton />
                        </div>
                    </div>
                </div>
                <div id="main-container">
                    <div id="main-inner">

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
                </div>
                <div id="misc-container">
                    <h3>MISC STATS, ETC</h3>
                </div>
            </div>
        </>
    )


}


export default HomePage;
