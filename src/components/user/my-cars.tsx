import {List, useGetIdentity} from 'react-admin';
import React from "react";
import {CarList} from "@/components/search/car_list";

export const MyCarsList = () => {

    const { data, isPending, error } = useGetIdentity();

    return (
        <List resource="/cars" title="My Cars" actions={false} sx={{mt: 2}} filter={{userId: data!.id}}>
            <CarList/>
        </List>
    );
}