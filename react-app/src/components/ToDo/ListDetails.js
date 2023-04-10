import { useState } from "react";
import DeleteToDoList from "./DeleteToDoListModal";
import EditToDoList from './EditToDoList';



const ListDetails = ({ list, setSelectedList }) => {
    const [displayEditListForm, setDisplayEditListForm] = useState(false)
    return (
        <div>
            {!displayEditListForm ?
                <div>
                    <div onClick={()=> setSelectedList(list.id)}>
                        {list.name}
                    </div>
                    <button onClick={() => setDisplayEditListForm(true)}>Edit List Name</button>
                    <DeleteToDoList list={list} />
                </div>
                : <EditToDoList list={list} hideForm={() => setDisplayEditListForm(false)} />
            }

        </div>
    )
}

export default ListDetails;
