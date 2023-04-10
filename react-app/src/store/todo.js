const LOAD_LISTS = 'lists/loadLists'
const CREATE_LIST = 'lists/createList'
const UPDATE_LIST = 'lists/updateList'
const DELETE_LIST = 'lists/deleteList'

const actionLoadLists = (lists) => {
    return {
        type: LOAD_LISTS,
        lists
    }
}
const actionCreateList = (list) => {
    return {
        type: CREATE_LIST,
        list
    }
}
const actionUpdateList = (list) => {
    return {
        type: UPDATE_LIST,
        list
    }
}
const actionDeleteList = (listId) => {
    return {
        type: DELETE_LIST,
        listId
    }
}

export const loadLists = (userId) => async (dispatch) => {
    const response = await fetch(`/api/todo/lists/${userId}`);

    if (response.ok) {
        const lists = await response.json();
        dispatch(actionLoadLists(lists));
        return response;
    } else {
        return response.json()
    }
}

export const createList = (listData) => async (dispatch) => {
    const response = await fetch('/api/todo/lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listData)
    });

    if (response.ok) {
        const list = await response.json()
        dispatch(actionCreateList(list))
        return list;
    }

}

export const updateList = (listId, name) => async (dispatch) => {
    const response = await fetch(`/api/todo/lists/${listId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    })


    if (response.ok) {
        const list = await response.json()
        dispatch(actionUpdateList(list))
        return list;
    }
}

export const deleteList = (listId) => async (dispatch) =>{
    const response = await fetch(`/api/todo/lists/${listId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const listId = await response.json()
        dispatch(actionDeleteList(listId))
        return listId
    }
}

export const thunkCreateTask = (payload) => async (dispatch) => {
    const response = await fetch('/api/todo/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const list = await response.json()
        dispatch(actionUpdateList(list))
        return list;
      }
}


export const thunkUpdateTask = (payload, task) => async (dispatch) => {
    const response = await fetch(`/api/todo/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const list = await response.json()
        dispatch(actionUpdateList(list))
        return list;
      }
}

export const thunkDeleteTask = (taskId) => async (dispatch) => {
    const response = await fetch(`/api/todo/tasks/${taskId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const list = await response.json()
        dispatch(actionUpdateList(list))
        return list
    } else {
        const data = await response.json();
        console.log(data.errors)
    }
}

const todoReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_LISTS:
            const newState1 = {};
            console.log(action)
            action.lists.todoLists.forEach(list => {
                newState1[list.id] = list;
            });
            return newState1;

        case CREATE_LIST:
            const newState2 = {...state};
            newState2[action.list.id] = action.list
            return newState2;

        case UPDATE_LIST:
            const newState3 = {...state};
            newState3[action.list.id] = action.list;
            return newState3;

        case DELETE_LIST:
            const newState4 = {...state};
            delete newState4[action.listId]
            return newState4;

        default:
            return state;
    }
}

export default todoReducer;
