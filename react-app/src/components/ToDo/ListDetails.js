import { useState } from "react";
import DeleteToDoList from "./DeleteToDoListModal";
import EditToDoList from './EditToDoList';
import TodoTasks from "./AllToDoTasks";
import { Modal } from "../../context/Modal";


const ListDetails = ({ list }) => {
    const [displayEditListForm, setDisplayEditListForm] = useState(false)
    const [displayTasks, setDisplayTasks] = useState(false)
    return (
        <div>
            {!displayEditListForm ?
                <div>
                    <div onClick={()=> setDisplayTasks(true)}>
                        {list.name}
                    </div>
                    <button onClick={() => setDisplayEditListForm(true)}>Edit List Name</button>
                    <DeleteToDoList list={list} item={'list'} />
                </div>
                : <EditToDoList list={list} hideForm={() => setDisplayEditListForm(false)} />
            }
            {displayTasks &&
            <Modal onClose={()=> setDisplayTasks(false)}>
                <TodoTasks list={list} />
            </Modal>

            }
        </div>
    )
}

export default ListDetails;
