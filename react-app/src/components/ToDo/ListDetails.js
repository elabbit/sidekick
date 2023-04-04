import { useState } from "react";
import DeleteToDoList from "./DeleteToDoListModal";
import EditToDoList from './EditToDoList';
import TodoTasks from "./AllToDoTasks";

const ListDetails = ({ list }) => {
    const [displayEditListForm, setDisplayEditListForm] = useState(false)
    const [displayTasks, setDisplayTasks] = useState(false)
    return (
        <div>
            {!displayEditListForm ?
                <div>
                    <div onClick={()=> setDisplayTasks(!displayTasks)}>
                        {list.name}
                    </div>
                    <button onClick={() => setDisplayEditListForm(true)}>Edit List Name</button>
                    <DeleteToDoList list={list} />
                </div>
                : <EditToDoList list={list} hideForm={() => setDisplayEditListForm(false)} />
            }
            {displayTasks && <TodoTasks list={list} />}
        </div>
    )
}

export default ListDetails;
