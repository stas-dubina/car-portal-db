import {useParams} from 'react-router-dom';
import {
    BooleanField,
    DateField,
    Loading,
    NumberField,
    RecordContextProvider,
    SelectField,
    Show,
    SimpleShowLayout,
    TextField,
    useGetOne,
    useRedirect
} from 'react-admin';
import React from "react";
import {DRIVE_TYPES} from "@/components/cars/types";


export const CarShow = () => {
    const {id} = useParams();
    const redirect = useRedirect();
    const {data, isPending} = useGetOne(
        'cars',
        {id},
        {onError: () => redirect('/cars')}
    );
    if (isPending) {
        return <Loading/>;
    }
    return (
        <RecordContextProvider value={data}>
            <Show>
                <SimpleShowLayout>
                    <TextField source="id" label="ID"/>
                    <TextField source="brandName" label="Марка"/>
                    <TextField source="modelName" label="Модель"/>
                    <TextField source="year" label="Рік"/>
                    <TextField source="fuelTypeName" label="Тип палива"/>
                    <TextField source="gearTypeName" label="Коробка передач"/>
                    <NumberField source="mileage" label="Пробіг"/>
                    <NumberField source="price" label="Ціна" options={{
                        style: 'currency',
                        currency: 'USD'
                    }}/>
                    <TextField source="firstName" label="Ім'я власника"/>
                    <TextField source="lastName" label="Прізвище власника"/>
                    <TextField source="phone" label="Телефон"/>
                    <TextField source="email" label="Email"/>
                    <SelectField source="status" choices={[
                        {id: 'ON_SALE', name: 'ON_SALE'},
                        {id: 'SOLD', name: 'SOLD'},
                        {id: 'CANCELLED', name: 'CANCELLED'},
                    ]} label="Статус"/>
                    <TextField source="colorName" label="Колір"/>
                    <DateField source="createdAt" label="Дата створення"/>
                    <TextField source="vin" label="VIN-код"/>
                    <TextField source="description" label="Опис"/>
                    <TextField source="bodyTypeName" label="Тип кузова"/>
                    <TextField source="carTypeName" label="Тип автомобіля"/>
                    <BooleanField source="accident" label="Був у ДТП"/>
                    <BooleanField source="abroad" label="Був за кордоном"/>
                    <NumberField source="ownerNumber" label="Кількість власників"/>
                    <BooleanField source="inCredit" label="В кредиті"/>
                    <NumberField source="power" label="Потужність"/>
                    <NumberField source="seat" label="Кількість місць"/>
                    <SelectField source="driveType" choices={DRIVE_TYPES} label="Тип приводу"/>
                </SimpleShowLayout>
            </Show>
        </RecordContextProvider>
    );
};