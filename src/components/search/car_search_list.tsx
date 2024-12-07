import {List, SortButton, TopToolbar} from 'react-admin';
import React from "react";
import {CarList} from "@/components/search/car_list";
import {CarSearch} from "@/components/search/search";

const ListActions = () => (
    <TopToolbar>
        <SortButton fields={['price', 'mileage', 'year']}/>
    </TopToolbar>
);

export const CarSearchList = () => {
    return (
        <List resource="/cars" filter={{status: 'ON_SALE'}}
              title="Пошук"
              aside={<CarSearch/>}
              actions={<ListActions/>}
              sx={{mt: 2}}
        >
            <CarList showStatus={false}/>
        </List>
    );
}