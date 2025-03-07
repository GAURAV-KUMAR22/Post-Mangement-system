import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import './UserDashboard.css'; // Import CSS file

const UserDashboard = () => {
    const [user, setUser] = useState({
        userName: "GAURAV22",
        userId: "67CADEA81ABC0D6062233BAD",
        profileImage: "https://via.placeholder.com/100", // Replace with actual image URL
    });

    const handleEditProfile = () => {
        alert("Edit Profile Clicked!"); // Replace with actual edit logic
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h2 className="dashboard-title">USER DASHBOARD</h2>

                {/* Profile Image with Edit Icon */}
                <div className="profile-container">
                    <img src={user.profileImage} alt="User Profile" className="profile-image" />
                    <button className="edit-icon" onClick={handleEditProfile}>
                        <FaPencilAlt />
                    </button>
                </div>

                {/* User Details */}
                <div className="user-details">
                    <p>USERNAME: <span>{user.userName}</span></p>
                    <p>USER_ID: <span>{user.userId}</span></p>
                </div>

                {/* Update Profile Button */}
                <button className="update-button">Update Profile</button>
            </div>
        </div>
    );
};

export default UserDashboard;
