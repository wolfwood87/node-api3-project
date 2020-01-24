import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Post from './Post';

const PostList = (props) => {
    const [posts, setPosts] = useState([{text: ''}])
    const [newPost, setNewPost] = useState({text: ''});

    useEffect(() => {
        axios
            .get(`https://node-project4.herokuapp.com/api/users/${props.user_id}/posts`)
            .then(res => {
                console.log(res);
                setPosts(res.data)
            })
    }, [newPost])

    return (
        <>
            {posts.map((post,index) => (
                <Post 
                    text={post.text}
                    id={post.id}
                    key={index}
                />
            ))}
        </>
    )
}

export default PostList;