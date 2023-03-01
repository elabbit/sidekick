const LOAD_HABIT_TRACKS = 'habit_tracks/LOAD_HABIT_TRACKS';
const ADD_HABIT_TRACK = 'habit_tracks/ADD_HABIT_TRACK';
const EDIT_HABIT_TRACK = 'habit_tracks/EDIT_HABIT_TRACK';
const DELETE_HABIT_TRACK = 'habit_tracks/DELETE_HABIT_TRACK';

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

export const getUserHabitTracks = (username) => async (dispatch) => {
  const response = await fetch(`/api/habitTracks/${username}`)

  if (response.ok) {
    const habitTracks = await response.json();
    dispatch(actionLoadHabitTracks(habitTracks));
    return habitTracks;
  }
}

export const addHabitTrack = (formData) => async (dispatch) => {
  const response = await fetch('/api/habitTracks/new', {
    method: 'POST',
    body: formData
  })

  if (response.ok) {
    const habitTrack = await response.json();
    dispatch(actionAddHabitTrack(habitTrack))
    return habitTrack;
  }
  else {
    const error = await response.json();
    return error;
  }
}

export const editHabitTrack = (habitTrackId, habitTrackInfo) => async (dispatch) => {
  const response = await fetch(`/api/habitTracks/${habitTrackId}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // habitTrackInfo
    })
  })

  if (response.ok) {
    const editedHabitTrack = await response.json();
    dispatch(actionEditHabitTrack(editedHabitTrack));
    return editedHabitTrack;
  }
}

export const deleteHabitTrack = (habitTrackId) => async (dispatch) => {
  const response = await fetch(`/api/habitTracks/${habitTrackId}/delete`, {
    method: 'DELETE'
  })
  if (response.ok) {
    dispatch(actionDeleteHabitTrack(habitTrackId))
    return habitTrackId;
  }
}


const habitTracksReducer = (state = {}, action) => {
  switch(action.type) {
    case LOAD_HABIT_TRACKS:
      const newState1 = {};
      action.habitTracks.habitTracks.forEach(habitTrack => {
        newState1[habitTrack.id] = habitTrack;
      });
      return newState1;

    case ADD_HABIT_TRACK:
      const newState2 = {...state};
      newState2[action.habitTrack.id] = action.habitTrack
      return newState2;

    case EDIT_HABIT_TRACK:
      const newState3 = { ...state };
      newState3[action.editedHabitTrack.id] = action.editedHabitTrack
      return newState3;

    case DELETE_HABIT_TRACK:
      const newState4 = {...state};
      delete newState4[action.habitTrackId]
      return newState4;

    default:
      return state;
  }
}

 export default habitTracksReducer;
