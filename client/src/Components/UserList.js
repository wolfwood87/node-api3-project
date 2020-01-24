import React, {useState, useEffect} from 'react';
import axios from 'axios';
import User from './User.js';

const UserList = (props) => {
    const [users, setUsers] = useState([{name: '', id: ''}]);
    const [newUser, setNewUser] = useState({name: ''})
    const [userForm, setUserForm] = useState(false);

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
    }, [newUser])

    const setForm = e => {
        e.preventDefault();
        setUserForm(!userForm);
    }

    const handleChange = e => {
        e.preventDefault();
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
      }

      const submitNewUser = e => {
        e.preventDefault();
        axios
            .post(`https://node-project4.herokuapp.com/api/users`, newUser)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <> 
            <div>{userForm && 
                <form>
                    <input
                    type='text'
                    name="name"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={handleChange}
                    />
                <button onClick={submitNewUser}>Submit</button>
                </form>
            }
            {!userForm &&
            <button onClick={setForm}>Add User</button>}
            </div>
            <div>
                {users.map(user => (
                    <User
                        name={user.name}
                        id={user.id}
                        key={user.id}
                        />
                ))}
            </div>
        </>
    )
}

export default UserList;