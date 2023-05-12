import { useState } from 'react'
import { Modal } from '../../context/Modal.js'
import PokeGenerator from '../Pokemon/PokeGenerator.js';


function ShopModal({ user }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                <i class="fa-solid fa-store"></i>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div id="shop-container">
                        <div id="shop-header">
                            <div>Shop</div>
                            <div>Points: {user.score}</div>
                        </div>
                        <PokeGenerator user={user} />
                        <button id="shop-done" onClick={()=>{setShowModal(false)}} >Done</button>
                    </div>
                </Modal>
            )}
        </>
    )

}


export default ShopModal;
