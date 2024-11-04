import {
    List,
    Datagrid,
    TextField, SearchInput, SelectInput, ReferenceInput,
} from 'react-admin';

const searchFilters = [
    <SearchInput placeholder="Пошук типу палива" source="name" alwaysOn />,
    <ReferenceInput source="carFuelType.id" reference="fuel-types"  >
        <SelectInput sx={{width: '190px'}} alwaysOn />
    </ReferenceInput>
];

export const FuelTypeList = () => (
    <List filters={searchFilters}>
        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Тип палива" />
        </Datagrid>
    </List>
);