import {Datagrid, List, SearchInput, TextField} from 'react-admin';

const searchFilters = [
    <SearchInput placeholder="Пошук типу авто" source="name" alwaysOn/>
];

export const CarTypeList = () => (
    <List filters={searchFilters}>
        <Datagrid>
            <TextField source="id" label="ID"/>
            <TextField source="name" label="Тип кузова"/>
        </Datagrid>
    </List>
);