import { useSelector } from 'react-redux'
import IconSelect from './IconSelectModal.js';
import UserEditForm from './UserEditModal.js';
import ShopModal from './ShopModal.js';
import './UserCard.css'

function UserCard() {
    const user = useSelector(state => state.session.user)

    return (
        <div className='user-card'>
            <div id='username-useredit'>
                <div id='user-card-username' >{user.username}</div>
                <UserEditForm />
            </div>
            <IconSelect user={user} />
            <div id='points-store'>
                <div>{user.score} Points</div>
                <ShopModal user={user} />
            </div>

        </div>

    )
}


export default UserCard;
