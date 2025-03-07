import React, { useEffect, useState } from 'react'
import Card from './Card'
import './Posts.css'
import { InstanceUrlPost } from '../../services/InstancePost'
import Header from '../Ui/Header'
const PostUi = () => {
    const [data, setdata] = useState([]);
    console.log(data)
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await InstanceUrlPost.get('/posts');

                let fetchedData = response.data.data;

                // ✅ If fetchedData is an object, convert it into an array
                if (!Array.isArray(fetchedData)) {
                    fetchedData = [fetchedData];
                }
                console.log(typeof (fetchedData))
                setdata(fetchedData);

            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }

        fetchData();
    }, [])
    return (
        <div className='PostUI-container'>
            <Header />
            {data.map((item) => <Card data={item} />)}

        </div>
    )
}

export default PostUi
