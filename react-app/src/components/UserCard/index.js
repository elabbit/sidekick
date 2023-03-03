import { useSelector } from 'react-redux'
import ICONS from "../../icons/index.js"
import IconSelect from '../IconSelect/index.js';

function UserCard() {
    const user = useSelector(state => state.session.user)

    return (
        <>
            <img src={ICONS[user.default_icon]} alt=''/>
            <div>{user.username}</div>
            <div>score: {user.score}</div>
            <IconSelect/>
        </>

    )
}


export default UserCard;
