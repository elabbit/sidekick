import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../store/session";
import { Modal } from '../../context/Modal';

const UserEditForm = () => {
    const user = useSelector(state => state.session.user);
    const id = user.id
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();


    const onSubmit = async (e) => {
        e.preventDefault();
        const errorsArray = [];
        const data = await dispatch(editUser(id, username, email));
        if (data === "success") {
            setErrors([])
            setShowModal(false)
        }
        else if (data) {
            setErrors(data)
            if (data) {
                errorsArray.push(...data)
            }
            if (errorsArray.length) {
                setErrors(errorsArray)
                return setShowModal(true);
            }
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setShowModal(false);
        setUsername(user.username)
        setEmail(user.email)
        setErrors([])
    }

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Edit User</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {errors && (
                        <div>
                            {errors}
                        </div>
                    )}
                    <form onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type='text'
                                name='email'
                                maxLength='255'
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                placeholder='Email'
                                required
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type='text'
                                name='username'
                                maxLength='30'
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                                placeholder='Username'
                                required
                            ></input>
                        </div>
                        <button type='submit'>Submit</button>
                        <button type='button' onClick={handleCancel}>Cancel</button>

                    </form>
                </Modal>
            )}
        </div>
    )

}

export default UserEditForm
