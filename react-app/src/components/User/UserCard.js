import { useSelector } from 'react-redux'
import IconSelect from './IconSelectModal.js';
import UserEditForm from './UserEditModal.js';
import ShopModal from './ShopModal.js';
import './UserCard.css'

function UserCard() {
    const user = useSelector(state => state.session.user)

    return (
        <div className='user-card'>
            <div id='user-card-header'>
                <div>Welcome to your dashboard</div>
                <div id='user-card-username' >{user.username}</div>
            </div>
            <IconSelect user={user} />
            <div id='points-and-buttons'>
                <div id='user-score'>{user.score} Points</div>
                <div id="user-card-buttons">
                    <UserEditForm />
                    <ShopModal user={user} />
                </div>
            </div>

        </div>

    )
}


export default UserCard;
