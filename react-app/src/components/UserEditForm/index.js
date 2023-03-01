import { useState } from "react";
import { useHistory } from "react-router-dom";

const UserEditForm = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push(`/`);
    }

    return (
        <div>
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
        </div>
    )

}

export default UserEditForm
