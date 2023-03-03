const LOAD_HABITS = 'habits/LOAD_HABITS';
const ADD_HABIT = 'habits/ADD_HABIT';
const EDIT_HABIT = 'habits/EDIT_HABIT';
const DELETE_HABIT = 'habits/DELETE_HABIT';
const LOAD_HABIT_TRACKS = 'habit_tracks/LOAD_HABIT_TRACKS';
const ADD_HABIT_TRACK = 'habit_tracks/ADD_HABIT_TRACK';
const EDIT_HABIT_TRACK = 'habit_tracks/EDIT_HABIT_TRACK';
const DELETE_HABIT_TRACK = 'habit_tracks/DELETE_HABIT_TRACK';

const actionLoadHabits = (habits) => ({
  type: LOAD_HABITS,
  habits
});

const actionAddHabit = (habit) => ({
  type: ADD_HABIT,
  habit
});

const actionEditHabit = (editedHabit) => ({
  type: EDIT_HABIT,
  editedHabit
});

const actionDeleteHabit = (habitId) => ({
  type: DELETE_HABIT,
  habitId
});

const actionLoadHabitTracks = (habitTracks) => ({
  type: LOAD_HABIT_TRACKS,
  habitTracks
});

const actionAddHabitTrack = (habitTrack) => ({
  type: ADD_HABIT_TRACK,
  habitTrack
});

const actionEditHabitTrack = (editedHabitTrack) => ({
  type: EDIT_HABIT_TRACK,
  editedHabitTrack
});

const actionDeleteHabitTrack = (habitTrackId) => ({
  type: DELETE_HABIT_TRACK,
  habitTrackId
});


export const getUserHabits = (userId) => async (dispatch) => {
  const response = await fetch(`/api/habits/${userId}`)

  if (response.ok) {
    const habits = await response.json();
    console.log("HABIT FROM REDUCER", habits)

    dispatch(actionLoadHabits(habits));
    return habits;
  }
}

export const addHabit = (formData) => async (dispatch) => {
  const response = await fetch('/api/habits/new', {
    method: 'POST',
    body: formData
  })

  if (response.ok) {
    const habit = await response.json();
    dispatch(actionAddHabit(habit))
    return habit
  }
  else {
    const error = await response.json();
    return error
  }
}

export const editHabit = (habitId, habitInfo) => async (dispatch) => {
  const response = await fetch(`/api/habits/${habitId}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // habit info
    })
  })

  if (response.ok) {
    const editedHabit = await response.json();
    dispatch(actionEditHabit(editedHabit));
    return editedHabit;
  }
}

export const deleteHabit = (habitId) => async (dispatch) => {
  const response = await fetch(`/api/habits/${habitId}/delete`, {
    method: 'DELETE'
  })
  if (response.ok) {
    dispatch(actionDeleteHabit(habitId))
    return habitId;
  }
}


const habitsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_HABITS:
      const newState1 = {};
      action.habits.habits.forEach(habit => {
        newState1[habit.id] = habit;
      });
      return newState1;

    case ADD_HABIT:
      const newState2 = { ...state };
      newState2[action.habit.id] = action.habit
      return newState2;

    case EDIT_HABIT:
      const newState3 = { ...state };
      newState3[action.editedHabit.id] = action.editedHabit
      return newState3;

    case DELETE_HABIT:
      const newState4 = { ...state };
      delete newState4[action.habitId]
      return newState4;

    default:
      return state;
  }
}

export default habitsReducer;
