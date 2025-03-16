import React, { useEffect, useState } from "react";
import { InstanceUrlPost } from "../../services/InstancePost";
import { Card } from "./Card.js";
import "./PostList.css";

const PostList = () => {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const fetchdPosts = async () => {
            try {
                console.log("Fetching Start");
                const response = await InstanceUrlPost.get("/posts");

                if (!response || !response.data) {
                    throw new Error("Bad Response"); // ✅ Fixed Error throwing
                }

                const fetchedPosts = response.data.posts;
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error.message);
            }
        };

        fetchdPosts();
    }, []);

    return (
        <div className="Postlist-container">
            <div className="card-postlist">
                {posts?.map((post) => (
                    <ul key={post._id}>
                        <li key={post._id}>
                            <Card post={post} />
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default PostList;
