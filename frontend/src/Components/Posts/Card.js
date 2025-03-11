import React from 'react'

import './Card.css'
export const Card = ({ post }) => {
    const imagepath = post.imagename;
    return (
        <div className="card">
            <div className="card-Banner">
                <p className="category-tag-popular">Popular</p>
                <img
                    className="banner-img"
                    src={imagepath}
                    alt='post'
                    typeof='jpeg'
                />
            </div>
            <div className="card-body">
                <div className="card-hastag">#insta #love</div>
                <h2 className="card-title">{post.title}</h2>
                <div className="card-description">{post.content}</div>
                <div className="card-profile">
                    <img
                        className="profile-img"
                        src={post.imagename}
                        alt='profile'
                    />
                    <div className="card-profile-info">
                        <h3 className="profile-name">Gaurav Kumar</h3>
                        <p className="profile-followers">1.2k</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Card;