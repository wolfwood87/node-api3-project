import React, {useState} from 'react';
import axios from 'axios';

const User = props => {
    const [user, setUser] = useState({name: props.name, user_id: props.user_id})

    return (
        <>
            <div>
                <h3>{user.name}</h3>
            </div>
        </>
    )
}
export default User;