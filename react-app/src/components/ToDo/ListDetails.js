import { useState } from "react";
import DeleteToDoList from "./DeleteToDoListModal";
import EditToDoList from './EditToDoList';
import TodoTasks from "./AllToDoTasks";

const ListDetails = ({ list }) => {
    const [displayEditListForm, setDisplayEditListForm] = useState(false)

    return (
        <div>
            {!displayEditListForm ?
                <div>
                    {list.name}
                    <button onClick={() => setDisplayEditListForm(true)}>Edit List Name</button>
                    <DeleteToDoList list={list}/>
                </div>
                : <EditToDoList list={list} hideForm={() => setDisplayEditListForm(false)} />
            }
            <TodoTasks list = {list}/>
        </div>
    )
}

export default ListDetails;
