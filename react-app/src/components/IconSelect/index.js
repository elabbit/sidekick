import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ICONS from "../../icons/index.js"

function IconSelect() {
    const user = useSelector(state => state.session.user)
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        async function getIcons() {
          const response = await fetch(`/api/users/icons/${user.id}`);
          const responseData = await response.json();
          setIcons(responseData.icons);
        }
        getIcons();
      }, []);

    return (
        <>
            {icons.map((id)=>(
                <img src={ICONS[id]} alt='' key={id}/>
            ))}
        </>

    )
}


export default IconSelect;
