import { useSelector } from 'react-redux'
import PokeGenerator from '../Pokemon/PokeGenerator.js';
import IconSelect from './IconSelectModal.js';
import UserEditForm from './UserEditModal.js';

function UserCard() {
    const user = useSelector(state => state.session.user)

    return (
        <div className='user-card'>
            <div className='user-card-username' >{user.username}</div>
            <IconSelect  user={user}/>
            <div>{user.score} Points</div>
            <UserEditForm/>
            <PokeGenerator user={user}/>
        </div>

    )
}


export default UserCard;
