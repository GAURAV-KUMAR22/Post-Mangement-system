import React, { useEffect, useState } from 'react'
import { InstanceUrlPost } from '../../services/InstancePost'
import { Card } from './Card.js';
import './PostList.css'
const PostList = () => {
    const [posts, setPosts] = useState([{}]);


    useEffect(() => {
        const fetchdPosts = async () => {
            const responce = await InstanceUrlPost.get('/posts');
            if (!responce) {
                throw new Error({ message: 'Bad Responce' })
            }
            const posts = responce.data.posts;
            console.log(posts)
            setPosts(posts)
        };

        fetchdPosts();
    }, []);
    console.log(posts[0].user)
    return (
        <div className='Postlist-container'>
            <div className='card-postlist'>
                {posts.map((post) => (<ul key={post._id}><li key={post._id}><Card post={post} /></li></ul>))}
            </div>
        </div>
    )
}

export default PostList;
