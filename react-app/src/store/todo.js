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
    const response = await fetc(`/api/todo/lists/${userId}`);

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

export const updateList = (listData) => async (dispatch) => {
    const response = await fetch(`/api/todo/lists/${listData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: listData.id, name: listData.name})
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

export const createTask = (payload) => async (dispatch) => {
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


export const updateTask = (payload) => async (dispatch) => {
    const response = await fetch(`/api/todo/lists/${payload.listId}/tasks`, {
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

export const deleteTask = (list) => async (dispatch) => {
    const response = await fetch('/api/todo/tasks/', {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(actionUpdateList(list))
        return list
    } else {
        const data = await response.json();
        console.log(data.errors)
    }
}

const todoReducer = (state = {}, action) => {

}

export default todoReducer;
