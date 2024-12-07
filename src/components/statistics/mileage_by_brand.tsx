import {Datagrid, List, NumberField, TextField} from 'react-admin';
import React from "react";

export const MileageByBrandStatistics = () => {
    return (
        <List resource="statistics/mileage-by-brand" pagination={false} title='Кількість автомобілів за пробiгом'>
            <Datagrid rowClick={false} isRowSelectable={() => false}>
                <TextField source="id" label="Рiк"/>
                <TextField source="mileage_group" label="Пробiг"/>
                <TextField source="car_count" label="Кiлькiсть авто"/>
            </Datagrid>
        </List>
    )
}