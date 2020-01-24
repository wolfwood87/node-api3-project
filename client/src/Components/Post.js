import React, {useState} from 'react';
import axios from 'axios';

const Post = props => {
    const [post, setPost] = useState({text: props.text})
    return (
        <>
            <div>
                <p>{post.text}</p>
            </div>
        </>
    )
}

export default Post;