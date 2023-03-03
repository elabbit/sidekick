import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ICONS from "../../icons/index.js"
import { Modal } from '../../context/Modal.js'
import { updateIcon } from '../../store/session.js'

function IconSelect({user}) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const update = async (ico) =>{
            const data = await dispatch(updateIcon(ico));
            if (data === "success") {
                setShowModal(false)
            }
    }



    return (
        <div>
            <div>{user.name}</div>
            <button onClick={() => setShowModal(true)}>
            <img src={ICONS[user.default_icon]} alt=''/>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                {user.user_icons.map((ico)=>(
                    <button key={ico} onClick={()=>update(ico)}>
                    <img src={ICONS[ico]} alt=''/>
                    </button>
                ))

                }
                </Modal>
            )}
        </div>
    )

}


export default IconSelect;
