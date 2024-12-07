import * as React from 'react';
import {AppBar, Logout, UserMenu} from 'react-admin';

export const MyAppBar = () => (
    <AppBar
        userMenu={
            <UserMenu>
                <Logout/>
            </UserMenu>
        }
    />
);