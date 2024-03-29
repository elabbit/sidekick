// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password, repeatPassword, birthday) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      repeatPassword,
      birthday
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const editUser = (id, username, email) => async (dispatch) => {
  const response = await fetch(`/api/auth/edit/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id, username, email
    })
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return 'success';
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const updateIcon = (icon) => async (dispatch) => {
  const response = await fetch(`/api/auth/icon/${icon}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return 'success';
  }
}

export const updateScore = (score) => async (dispatch) => {
  const response = await fetch(`/api/auth/score/${score}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return 'success';
  }
}

export const updatePokemon = (pokeId) => async (dispatch) => {
  const response = await fetch(`/api/auth/poke/${pokeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return 'success';
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    default:
      return state;
  }
}
