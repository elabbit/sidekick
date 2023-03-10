const LOAD_HABITS = 'habits/LOAD_HABITS';
const ADD_HABIT = 'habits/ADD_HABIT';
const EDIT_HABIT = 'habits/EDIT_HABIT';
const DELETE_HABIT = 'habits/DELETE_HABIT';
const LOAD_HABIT_TRACKS = 'habit_tracks/LOAD_HABIT_TRACKS';
const ADD_HABIT_TRACK = 'habit_tracks/ADD_HABIT_TRACK';
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


const actionAddHabitTrack = (habitTrack) => ({
  type: ADD_HABIT_TRACK,
  habitTrack
});

const actionDeleteHabitTrack = (ids) => ({
  type: DELETE_HABIT_TRACK,
   ids
});


export const getUserHabits = (userId) => async (dispatch) => {
  const response = await fetch(`/api/habits/${userId}`)

  if (response.ok) {
    const habits = await response.json();
    dispatch(actionLoadHabits(habits));
    return habits;
  }
}

export const addHabit = (payload) => async (dispatch) => {
  console.log("PAYLOAD", payload)
  const response = await fetch('/api/habits/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    const habit = await response.json();
    console.log(habit)
    dispatch(actionAddHabit(habit))
    return habit
  }
  else {
    const error = await response.json();
    console.log("ERROR",error)
    return error
  }
}

export const editHabit = (habitId, frequency) => async (dispatch) => {
  const response = await fetch(`/api/habits/${habitId}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({frequency})
  })

  if (response.ok) {
    const editedHabit = await response.json();
    dispatch(actionEditHabit(editedHabit));
    return editedHabit;
  } else {
    const data = await response.json();
    console.log(data.errors)
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

export const addHabitTrack = (habitId, date) => async (dispatch) => {
  const response = await fetch(`/api/habits/${habitId}/tracks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({date})
  })

  if (response.ok) {
    const habitTrack = await response.json();
    dispatch(actionAddHabitTrack(habitTrack));
    return habitTrack;
  } else {
    const data = await response.json();
    console.log(data.errors)
  }
}

export const deleteHabitTrack = (habitTrackId) => async (dispatch) => {
  const response = await fetch(`/api/habits/tracks/${habitTrackId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    const ids = await response.json();
    dispatch(actionDeleteHabitTrack(ids))
    return ids
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

    case ADD_HABIT_TRACK:
      const newState5 = {...state};
      newState5[action.habitTrack['habit_id']]['habit_tracks'].push(action.habitTrack)
      return newState5;

    case DELETE_HABIT_TRACK:
      const newState6 = {...state};
      const habit_tracks = newState6[action.ids.habit_id]['habit_tracks']
      const trackId = action.ids.track_id
      const newTracks = habit_tracks.filter(track => track.id !== trackId)
      newState6[action.ids.habit_id]['habit_tracks'] = newTracks
      return newState6;


    default:
      return state;
  }
}

export default habitsReducer;
