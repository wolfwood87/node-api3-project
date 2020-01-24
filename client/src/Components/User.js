import React, {useState} from 'react';
import axios from 'axios';
import PostList from './PostList.js';


const User = props => {
    const [user, setUser] = useState({name: props.name, id: props.id})
    const [form, setForm] = useState(false);

    const userStyle = {
        border: '1px solid black',
        margin: '2% auto',
        padding: '1%',
        width: '70%'
    }
    const formStyle = {
        margin: '2%'
    }
    const deleteUser = e => {
        e.preventDefault();
        axios
            .delete(`https://node-project4.herokuapp.com/api/users/${props.id}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            })
    }
    const editUser = e => {
        e.preventDefault();
        setForm(!form);
    }
    const handleChange = e => {
        e.preventDefault();
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
      }
      const submitEditUser = e => {
        e.preventDefault();
        axios
            .put(`https://node-project4.herokuapp.com/api/users/${props.id}`, user)
            .then(res => {
                console.log(res);
                setForm(false)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <>
            
                <div style={userStyle}>
                {form && 
                    <form style={formStyle}>
                        <input
                        type='text'
                        name="name"
                        placeholder="Name"
                        value={user.name}
                        onChange={handleChange}
                        />
                    <button onClick={submitEditUser}>Submit</button>
                    </form>
                }
                {!form && 
                    <div>
                        <h3>{user.name}</h3>
                    <button onClick={editUser}>Edit</button>
                    <button onClick={deleteUser}>Delete</button></div>}
                <PostList user_id={user.id} />
            </div>
    
        </>
    )
}
export default User;