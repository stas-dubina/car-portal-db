import {Datagrid, List, SearchInput, TextField} from 'react-admin';

const searchFilters = [
    <SearchInput placeholder="Пошук мiста" source="name" alwaysOn/>
];

export const CityList = () => (
    <List filters={searchFilters}>
        <Datagrid>
            <TextField source="id" label="ID"/>
            <TextField source="name" label="Назва мiста"/>
        </Datagrid>
    </List>
);