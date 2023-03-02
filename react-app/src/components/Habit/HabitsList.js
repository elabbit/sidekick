import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const AllHabits = (/* {date} */) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // const habits = useSelector(state => state.habits);
    // const habitsList = habits ? Object.values(habits) : null;
    // const dailyHabits = habitsList && habitsList.filter(habit => (habit.daily === true))
    // const weeklyHabits = habitsList && habitsList.filter(habit => (habit.daily !== true))

    useEffect(() => {
        const loadHabits = async () => {
            //await dispatch(thunkGetHabits(sessionUser.id))
        }
        loadHabits();
    }, [dispatch])


    return (
        <div>
            <div className='weekly habits container'>
                {/* {weeklyHabits && weeklyHabits.map((habit) => {

                    //if conditional here to display only habits w/ start dates before current date
                    return (
                        <div>
                            <div>{habit.name}</div>
                            <div>{habit.frequency} times a week</div>
                        </div>
                    )
                })} */}
            </div>

            <div className='daily habits container'>
                {/* {dailyHabits && dailyHabits.map((habit) => {

                    //if conditional here to display only habits w/ start dates before current date

                    return (
                        <div>
                            <div>{habit.name}</div>
                            <div>{habit.frequency} times a day</div> 
                        </div>
                    )
                })} */}
            </div>
        </div>
    )
}

export default AllHabits;
