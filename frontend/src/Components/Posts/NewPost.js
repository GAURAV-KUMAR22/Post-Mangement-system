import React, { useState } from 'react'
import { InstanceUrlPost } from '../../services/InstancePost';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState();
    const [caption, setCaption] = useState("");
    async function handlePost(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('caption', caption);
        const responce = await
            InstanceUrlPost.post('/post', formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            }
            );

        if (responce.status === 200) {
            await navigate('/posts');
        }
    }

    return (
        <div className='container'>
            <div className="form-wrapper">
                <form className='form-container'>
                    <h1>ADD NEW POST</h1>
                    <div className="input-tag">
                        <label>Name</label>
                        <input type='file' name='postImage' onChange={(e) => setImage(e.target.files[0])} accept='image/*' />
                        <label>Caption</label>
                        <input type='text' name='caption' onChange={(e) => setCaption(e.target.value)} />
                    </div>
                    <div className='button-container'>
                        <button type='submit' onClick={handlePost}>Submit</button>
                        <button type='submit' onClick={handlePost}>Cancil</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewPost
