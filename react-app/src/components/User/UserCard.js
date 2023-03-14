import { useSelector } from 'react-redux'
import PokeGenerator from '../Pokemon/PokeGenerator.js';
import IconSelect from './IconSelectModal.js';
import UserEditForm from './UserEditModal.js';

function UserCard() {
    const user = useSelector(state => state.session.user)

    return (
        <>
            <IconSelect  user={user}/>
            <div>{user.username}</div>
            <UserEditForm/>
            <div>score: {user.score}</div>
            <PokeGenerator user={user}/>
        </>

    )
}


export default UserCard;
