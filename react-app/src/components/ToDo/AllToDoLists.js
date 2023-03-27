import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadLists } from '../../store/todo';

const AllToDoLists = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const lists = useSelector(state => state.todolists)
    const listsArr = lists ? Object.values(lists) : null;

    useEffect(() => {
        const loadToDoLists = async () => {
            await dispatch(loadLists(sessionUser.id))
        }
        loadToDoLists()
    }, [dispatch]);

    return (
        <div>
            <h2>ToDo Lists</h2>
            {listsArr && listsArr.map((list) => {
                return(
                    <div key={list.id}>
                        {list.name}
                    </div>
                )
            })}
            <div>
            </div>
        </div>
    )
}

export default AllToDoLists;
