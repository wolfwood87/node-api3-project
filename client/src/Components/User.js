import React, {useState} from 'react';
import axios from 'axios';
import PostList from './PostList.js';


const User = props => {
    const [user, setUser] = useState({name: props.name, user_id: props.user_id})

    return (
        <>
            <div>
                <h3>{user.name}</h3>
                <PostList user_id={user.user_id} />
            </div>
        </>
    )
}
export default User;