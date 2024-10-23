import {
    List,
    Datagrid,
    TextField,
    DateField,
    BooleanField,
    ReferenceField,
    NumberField,
    SelectField, FunctionField
} from 'react-admin';

export const CarList = () => (
    <List>
        <Datagrid>
            <TextField source="id"/>
            <ReferenceField source="modelId" reference="models"/>
            <TextField source="year"/>
            <ReferenceField source="fuelTypeId" reference="fuel-types"/>
            <ReferenceField source="gearTypeId" reference="gear-types"/>
            <NumberField source="mileage"/>
            <NumberField source="price" options={{
                style: 'currency',
                currency: 'USD'
            }}/>
            <ReferenceField source="userId" reference="users">
                <FunctionField
                    render={record => `${record.firstName} ${record.lastName}`}
                />
            </ReferenceField>
            <SelectField source="status" choices={[
                {id: 'ON_SALE', name: 'ON_SALE'},
                {id: 'SOLD', name: 'SOLD'},
                {id: 'CANCELLED', name: 'CANCELLED'},
            ]}/>
            <ReferenceField source="colorId" reference="colors"/>
            <DateField source="createdAt"/>
            <TextField source="vin"/>
            <ReferenceField source="bodyTypeId" reference="body-types"/>
            <BooleanField source="accident"/>
            <BooleanField source="abroad"/>
            <NumberField source="ownerNumber"/>
            <BooleanField source="inCredit"/>
            <NumberField source="power"/>
            <NumberField source="seat"/>
            <SelectField source="driveType" choices={[
                {id: 'AWD', name: 'AWD'},
                {id: 'RWD', name: 'RWD'},
                {id: 'FWD', name: 'FWD'},
            ]}/>
        </Datagrid>
    </List>
);