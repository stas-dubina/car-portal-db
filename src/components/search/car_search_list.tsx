import {List} from 'react-admin';
import {CarFilter} from "@/components/cars/search";
import React from "react";
import {CarList} from "@/components/search/car_list";

export const CarSearchList = () => {
    return (
        <List resource="/cars" aside={<CarFilter/>} title="Search" actions={false} sx={{mt: 2}} >
            <CarList/>
        </List>
    );
}