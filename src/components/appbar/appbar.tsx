import * as React from 'react';
import { AppBar, Logout, UserMenu, useUserMenu } from 'react-admin';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";

// It's important to pass the ref to allow Material UI to manage the keyboard navigation
const SettingsMenuItem = React.forwardRef<HTMLAnchorElement>((props, ref) => {
    const userMenuContext = useUserMenu();
    if (!userMenuContext) {
        throw new Error("<SettingsMenuItem> should be used inside a <UserMenu>");
    }
    const { onClose } = userMenuContext;
    return (
        <MenuItem
            onClick={onClose}
            ref={ref}
            component={Link}
            to="/settings"
            // It's important to pass the props to allow Material UI to manage the keyboard navigation
            {...props}
        >
            <ListItemIcon>
                <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Customize</ListItemText>
        </MenuItem>
    );
});

export const MyAppBar = () => (
    <AppBar
        userMenu={
            <UserMenu>
                <SettingsMenuItem />
                <Logout />
            </UserMenu>
        }
    />
);