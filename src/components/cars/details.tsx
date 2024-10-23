import {useParams} from 'react-router-dom';
import {
    useGetOne,
    useRedirect,
    Title,
    Loading,
    TextField,
    ReferenceField,
    NumberField,
    FunctionField, SelectField, DateField, BooleanField, RecordContextProvider, Labeled, Show, SimpleShowLayout
} from 'react-admin';
import React from "react";


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
                    <Labeled label="ID">
                        <TextField source="id"/>
                    </Labeled>
                    <Labeled label="Модель">
                        <ReferenceField source="modelId" reference="models"/>
                    </Labeled>
                    <Labeled label="Рiк">
                        <TextField source="year"/>
                    </Labeled>
                    <Labeled label="Тип палива">
                        <ReferenceField source="fuelTypeId" reference="fuel-types"/>
                    </Labeled>
                    <Labeled label="Тип коробки передач">
                        <ReferenceField source="gearTypeId" reference="gear-types"/>
                    </Labeled>
                    <Labeled label="Пробіг">
                        <NumberField source="mileage"/>
                    </Labeled>
                    <Labeled label="Ціна">
                        <NumberField source="price" options={{
                            style: 'currency',
                            currency: 'USD'
                        }}/>
                    </Labeled>
                    <Labeled label="Власник">
                        <ReferenceField source="userId" reference="users">
                            <FunctionField
                                render={record => `${record.firstName} ${record.lastName}`}
                            />
                        </ReferenceField>
                    </Labeled>
                    <Labeled label="Статус">
                        <SelectField source="status" choices={[
                            {id: 'ON_SALE', name: 'ON_SALE'},
                            {id: 'SOLD', name: 'SOLD'},
                            {id: 'CANCELLED', name: 'CANCELLED'},
                        ]}/>
                    </Labeled>
                    <Labeled label="Колір">
                        <ReferenceField source="colorId" reference="colors"/>
                    </Labeled>
                    <Labeled label="Дата створення">
                        <DateField source="createdAt"/>
                    </Labeled>
                    <Labeled label="VIN-код">
                        <TextField source="vin"/>
                    </Labeled>
                    <Labeled label="Тип кузова">
                        <ReferenceField source="bodyTypeId" reference="body-types"/>
                    </Labeled>
                    <Labeled label="Був у ДТП">
                        <BooleanField source="accident"/>
                    </Labeled>
                    <Labeled label="Був за кордоном">
                        <BooleanField source="abroad"/>
                    </Labeled>
                    <Labeled label="Кількість власників">
                        <NumberField source="ownerNumber"/>
                    </Labeled>
                    <Labeled label="В кредиті">
                        <BooleanField source="inCredit"/>
                    </Labeled>
                    <Labeled label="Потужність">
                        <NumberField source="power"/>
                    </Labeled>
                    <Labeled label="Кількість місць">
                        <NumberField source="seat"/>
                    </Labeled>
                    <Labeled label="Тип приводу">
                        <SelectField source="driveType" choices={[
                            {id: 'AWD', name: 'AWD'},
                            {id: 'RWD', name: 'RWD'},
                            {id: 'FWD', name: 'FWD'},
                        ]}/>
                    </Labeled>
                    <Labeled label="Опис">
                        <TextField source="description"/>
                    </Labeled>
                </SimpleShowLayout>
            </Show>
        </RecordContextProvider>
    );
};