import SideBar from "./SideBar";
import './HomePage.css'

const HomePage = () => {

    return (
        <>
            <div id="home-container">
                <div id="side-container">
                    <h3>SIDEBAR</h3>
                    <SideBar />
                </div>
                <div id="main-container">
                    <h3>MAIN CONTENT</h3>
                </div>
                <div id="misc-container">
                    <h3>MISC STATS, ETC</h3>
                </div>
            </div>
        </>
    )


}


export default HomePage;
