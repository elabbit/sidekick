import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadLists } from '../../store/todo';

const AllToDoLists = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        const loadToDoLists = async () => {
            await dispatch(loadLists(sessionUser.id))
        }
        loadToDoLists()
    }, [dispatch]);

    return (
        <div>

        </div>
    )
}

export default AllToDoLists;
