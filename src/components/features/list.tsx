import {Datagrid, List, SearchInput, TextField} from 'react-admin';

const searchFilters = [
    <SearchInput placeholder="Пошук опції" source="name" alwaysOn/>
];

export const FeatureList = () => (
    <List filters={searchFilters}>
        <Datagrid>
            <TextField source="id" label="ID"/>
            <TextField source="name" label="Назва опції"/>
        </Datagrid>
    </List>
);