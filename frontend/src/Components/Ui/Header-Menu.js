import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { TiThMenu } from "react-icons/ti";
import { InstanceUrlPost } from "../../services/InstancePost";
import { Navigate, useNavigate } from "react-router-dom";

const Header_menu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const getprofile = async () => {
        // const id = localStorage.getItem('ID');
        const id = 5;
        const Responce = await InstanceUrlPost(`/profile?${id}`);

        if (!Responce) {
            throw new Error({ message: "Responce Failed" })
        }

        const User = Responce.data.User;
        setUser(User);
        navigate('/getuser', { state: user })
    }

    return (
        <div
            style={{
                marginLeft: "40%",
            }}>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                <TiThMenu size={40} />
            </Button>
            <Menu
                keepMounted
                anchorEl={anchorEl}
                onClose={handleClose}
                open={Boolean(anchorEl)}>
                <MenuItem onClick={getprofile}>
                    My Account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
};

export default Header_menu;
