import React, {useState, useEffect} from 'react';
import axios from 'axios';
import User from './User.js';

const UserList = () => {
    const [users, setUsers] = useState([{name: '', user_id: ''}]);

    useEffect(() => {
        axios 
            .get('https://node-project4.herokuapp.com/api/users')
            .then(res => {
                console.log(res)
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <>
            {users.map((user, index) => (
                <User
                    name={user.name}
                    user_id={user.id}
                    key={index}
                    />
            ))}
        </>
    )
}

export default UserList;