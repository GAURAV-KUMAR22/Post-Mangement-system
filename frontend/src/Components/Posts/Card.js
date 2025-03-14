import React from 'react'
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import './Card.css'
export const Card = ({ post }) => {
    if (!post) return null;
    return (
        <div className="card">
            <img
                className="banner-img"
                src={post.imagename}
                alt='post'
            />
            <div className="card-Banner">
                <p className="category-tag-popular">Popular</p>
            </div>
            <div className="card-body">
                <div className="card-hastag">#insta #love</div>
                <h2 className="card-title">{post.title}</h2>
                <div className="card-description">{post.content}</div>
                <div className="card-profile">
                    <img
                        className="profile-img"
                        src={post.user.profileImage}
                        alt='profile'
                    />
                    <div className="card-profile-info">
                        <h3 className="profile-name">{post.user.userName}</h3>
                        <p className="profile-followers">1.2k</p>
                    </div>
                    <div className='icons'>
                        <p><SlLike /> <SlDislike /></p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Card;