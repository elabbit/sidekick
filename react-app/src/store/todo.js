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

const todoReducer = (state = {}, action) => {

}

export default todoReducer;
