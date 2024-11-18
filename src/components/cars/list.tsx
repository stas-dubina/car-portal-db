import {
    BooleanField,
    Datagrid,
    DateField,
    Filter,
    List,
    NumberField,
    SelectField,
    TextField,
    TextInput
} from 'react-admin';
import {CarFilter} from "@/components/cars/search";

export const CarList = () => (
    <List aside={<CarFilter/>}>
        <Datagrid>
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
            {/*<TextField source="colorName" label="Колір"/>*/}
            {/*<DateField source="createdAt" label="Дата створення"/>*/}
            {/*<TextField source="vin" label="VIN-код"/>*/}
            {/*<TextField source="description" label="Опис"/>*/}
            {/*<TextField source="bodyTypeName" label="Тип кузова"/>*/}
            {/*<TextField source="carTypeName" label="Тип автомобіля"/>*/}
            {/*<BooleanField source="accident" label="Був у ДТП"/>*/}
            {/*<BooleanField source="abroad" label="Був за кордоном"/>*/}
            {/*<NumberField source="ownerNumber" label="Кількість власників"/>*/}
            {/*<BooleanField source="inCredit" label="В кредиті"/>*/}
            {/*<NumberField source="power" label="Потужність"/>*/}
            {/*<NumberField source="seat" label="Кількість місць"/>*/}
            {/*<SelectField source="driveType" choices={[*/}
            {/*    {id: 'AWD', name: 'AWD'},*/}
            {/*    {id: 'RWD', name: 'RWD'},*/}
            {/*    {id: 'FWD', name: 'FWD'},*/}
            {/*]} label="Тип приводу"/>*/}
        </Datagrid>
    </List>
);