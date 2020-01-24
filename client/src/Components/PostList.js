import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Post from './Post';

const PostList = (props) => {
    const [posts, setPosts] = useState([{text: ''}])
    const [list, setList] = useState(false);
    const [newPost, setNewPost] = useState({user_id: props.user_id, text: ''});

    useEffect(() => {
        axios
            .get(`https://node-project4.herokuapp.com/api/users/${props.user_id}/posts`)
            .then(res => {
                console.log(res);
                setPosts(res.data)
            })
    }, [newPost])

    const openList = () => {
        setList(!list)
    }
    const handleChange = e => {
        e.preventDefault();
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
        console.log(newPost)
      }
      const submitNewPost = e => {
        e.preventDefault();
        console.log(newPost)
        axios
            .post(`https://node-project4.herokuapp.com/api/users/${props.user_id}/posts`, newPost)
            .then(res => {
                console.log(res);
                setNewPost({user_id: props.user_id, text: ''})
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <>
            {list &&
            <div>{posts.map(post => (
                <Post 
                    text={post.text}
                    id={post.id}
                    key={post.id}
                />
            ))}
            <form>
                    <input
                    type='text'
                    name="text"
                    placeholder="Write a Post"
                    value={newPost.text}
                    onChange={handleChange}
                    />
                <button onClick={submitNewPost}>Submit</button>
                </form>
                </div>
            }
                <p onClick={openList}>&#709;</p>
        </>
    )
}

export default PostList;