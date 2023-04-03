import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserHabits } from '../../store/habits';
import AddRemoveHabitTrack from './AddRemoveHabitTrack';
import EditHabit from './EditHabitModal';

const AllHabits = (/* {date} */) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const habits = useSelector(state => state.habits);
    const habitsList = habits ? Object.values(habits) : null;
    const dailyHabits = habitsList && habitsList.filter(habit => (habit.daily === true))
    const weeklyHabits = habitsList && habitsList.filter(habit => (habit.daily !== true))

    useEffect(() => {
        const loadHabits = async () => {
            await dispatch(getUserHabits(sessionUser.id))
        }
        loadHabits();
    }, [dispatch])


    return (
        <div>
            <div className='weekly habits container'>
                <h2>Weekly habits</h2>
                {weeklyHabits && weeklyHabits.map((habit) => {

                    //if conditional here to display only habits w/ start dates before current date
                    return (
                        <div key={habit.id}> {/* on click opens edit habit modal */}
                            <div>{habit.name}</div>

                            <AddRemoveHabitTrack habit={habit} />
                            <EditHabit habit={habit} userId={sessionUser.id}/>
                        </div>
                    )
                })}
            </div>

            <div className='daily habits container'>
            <h2>Daily habits</h2>
                {dailyHabits && dailyHabits.map((habit) => {

                    //if conditional here to display only habits w/ start dates before current date

                    return (
                        <div key={habit.id}>
                            <div>{habit.name}</div>
                            <AddRemoveHabitTrack habit={habit} />
                            <EditHabit habit={habit} userId={sessionUser.id}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AllHabits;
