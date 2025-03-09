import React from 'react'
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";
import './Card.css'
export const Card = ({ post }) => {
    console.log(post.imagename)
    return (
        <div className="card">
            <div className="card-Banner">
                <p className="category-tag-popular">Popular</p>
                <img
                    className="banner-img"
                    src={post.imagename}
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
                        alt='image'
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



{/* <div className='card-container'>
    <h3 className='card-title'>{post.title}</h3>
    <img
        className='card-image'
        src={post.imagename}
        alt='images'
    />
    <p className='card-caption'>{post.content}</p>

    <div className='card-icons'>
        <AiOutlineLike />
        <FaRegComment className='card-icon' />
        <LiaCommentSolid />
    </div>
</div > */}