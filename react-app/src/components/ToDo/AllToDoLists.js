import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadLists } from '../../store/todo';
import AddToDoList from './AddToDoListModal';
import ListDetails from './ListDetails';


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
    }, [dispatch, sessionUser.id]);

    return (
        <div>
            <h2>To Do Lists</h2>
            <AddToDoList userId={sessionUser.id} />
            {listsArr && listsArr.map((list) => {
                return (
                    <div key={list.id}>
                        <ListDetails list={list}/>
                    </div>

                    
                )
            })}
            <div>
            </div>
        </div>
    )
}

export default AllToDoLists;
