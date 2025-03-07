import React from 'react';
import './Posts.css';
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";

const Card = ({ data }) => {
    return (
        <div className='card-container'>
            <h3 className='card-title'>{data.postTitle}</h3>
            <img
                className='card-image'
                src={data.postUrl}
                alt='images'
            />
            <p className='card-caption'>{data.postcontent}</p>

            <div className='card-icons'>
                <AiOutlineLike className='card-icon' />
                <BiDislike className='card-icon' />
                <FaRegComment className='card-icon' />
            </div>
        </div >
    );
}

export default Card;
