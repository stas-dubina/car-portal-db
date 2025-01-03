import {Datagrid, List, NumberField, TextField} from 'react-admin';
import React from "react";
import {NUMBER_FIELD_OPTIONS} from "./utils";

export const SalesByBrandStatistics = () => {
    return (
        <List resource="statistics/sales-by-brand" pagination={false} title='Кількість проданих автомобілів за брендом'>
            <Datagrid rowClick={false} isRowSelectable={() => false}>
                <TextField source="brand_name" label="Марка"/>
                <NumberField source="car_count" label="Кiлькiсть продажiв" />
                <NumberField source="price_on_sale" label="Цiна початкова (середня)" options={NUMBER_FIELD_OPTIONS}/>
                <NumberField source="price_sold" label="Цiна продажу (середня)" options={NUMBER_FIELD_OPTIONS}/>
                <NumberField source="discount" label="Знижка (середня)" options={NUMBER_FIELD_OPTIONS} />
            </Datagrid>
        </List>
    )
}