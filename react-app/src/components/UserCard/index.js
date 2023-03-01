import { useSelector } from 'react-redux'
import ICONS from "../../icons/index.js"

function UserCard() {
    const user = useSelector(state => state.session.user)

    return (
        <>
            <img src={ICONS[5]} alt=''/>
            <div>{user.username}</div>
            <div>score: {user.score}</div>
        </>

    )
}


export default UserCard;
