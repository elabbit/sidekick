import { useState } from "react";
import EditToDoList from './EditToDoList';

const ListDetails = ({ list }) => {
    const [displayEditListForm, setDisplayEditListForm] = useState(false)

    return (
        <div>
            {!displayEditListForm ?
                <div>
                    {list.name}
                    <button onClick={() => setDisplayEditListForm(true)}>Edit List Name</button>
                </div>
                : <EditToDoList list={list} hideForm={() => setDisplayEditListForm(false)} />
            }
        </div>
    )
}

export default ListDetails;
