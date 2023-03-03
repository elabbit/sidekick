import { useSelector } from 'react-redux'
import IconSelect from './IconSelect.js';
import UserEditForm from './UserEditForm.js';

function UserCard() {
    const user = useSelector(state => state.session.user)

    return (
        <>
            <IconSelect  user={user}/>
            <div>{user.username}</div>
            <UserEditForm/>
            <div>score: {user.score}</div>
        </>

    )
}


export default UserCard;
