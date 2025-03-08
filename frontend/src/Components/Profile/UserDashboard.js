import { useEffect, useRef, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import "./UserDashboard.css"; // Import CSS file
import InstanceUrl from "../../services/Instance";
import { useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const UserDashboard = () => {
    const fileInputRef = useRef();
    const { id } = useParams();

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [user, setUser] = useState({
        userName: "",
        userId: "",
        profileImage: "", // Default profile image placeholder
    });
    console.log(user)
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await InstanceUrl.get(`/profile/${id}`);
                const data = response.data.user;
                console.log(data)
                setUser(() => ({
                    userId: data._id,
                    userName: data.userName,
                    profileImage: `http://localhost:5000/uploads/${data.profileImage}`
                }));
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserDetails();
    }, [id]);

    // Handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile)); // Show preview before uploading
    };

    const handleEditProfile = () => {
        fileInputRef.current.click();
    };

    // Handle profile update
    const handleUpdateProfile = async () => {
        if (!file) {
            toast.warning("Please select an image first!", { transition: Bounce });
            return;
        }

        const formData = new FormData();
        formData.append("profileImage", file);

        try {
            const response = await InstanceUrl.put(`/profile/update/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                toast.success("Profile updated successfully!", { transition: Bounce });
                setUser({ ...user, profileImage: response.data.imageUrl }); // Update state with new image
            } else {
                throw new Error("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile!");
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h2 className="dashboard-title">USER DASHBOARD</h2>

                {/* Profile Image with Edit Icon */}
                <div className="profile-container">
                    <img
                        src={preview || user.profileImage || "/default-profile.png"}
                        alt="User Profile"
                        className="profile-image"
                    />
                    <button className="edit-icon" onClick={handleEditProfile}>
                        <FaPencilAlt />
                    </button>

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </div>

                {/* User Details */}
                <div className="user-details">
                    <p>USERNAME: <span>{user.userName}</span></p>
                    <p>USER_ID: <span>{user.userId}</span></p>
                </div>

                {/* Update Profile Button */}
                <button className="update-button" onClick={handleUpdateProfile}>
                    Update Profile
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;
