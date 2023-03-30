import SideBar from "./SideBar";
import './HomePage.css'
import AllHabits from "../Habit/AllHabits";
import AddHabit from "../Habit/AddHabitModal";
import Calendar from "../Calendar/Calendar";

const HomePage = () => {

    return (
        <>
            <div id="home-container">
                <div id="side-container">
                    <h3>SIDEBAR</h3>
                    <SideBar />
                </div>
                <div id="main-container">
                    <div id="main-inner">

                    <h3>MAIN CONTENT</h3>
                    <Calendar/>
                    <AddHabit/>
                    <AllHabits/>

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
