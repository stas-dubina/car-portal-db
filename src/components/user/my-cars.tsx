import {CreateButton, List, TopToolbar, useGetIdentity} from 'react-admin';
import React from "react";
import {CarList} from "@/components/search/car_list";

const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
    </TopToolbar>
);


export const MyCarsList = () => {

    const { data, isPending, error } = useGetIdentity();

    return (
        <List resource="/cars" title="Мої авто" actions={false} sx={{mt: 2}} filter={{userId: data!.id}} actions={<ListActions/>}>
            <CarList showStatus={true}/>
        </List>
    );
}