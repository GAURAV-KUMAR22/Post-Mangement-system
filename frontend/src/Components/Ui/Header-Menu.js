import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { TiThMenu } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import InstanceUrl from "../../services/Instance";

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
        const id = localStorage.getItem('Id');

        if (!id) {
            throw new Error({ message: 'id does not found' })
        }
        const responce = await InstanceUrl.get(`/profile/${id}`);

        if (!responce) {
            throw new Error({ message: "Responce Failed" })
        }
        const User = responce.data.user;

        setUser(User);
        console.log(user)
        navigate(`/getuser/${id}`, { state: user })
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
