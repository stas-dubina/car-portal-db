import {
    List,
    Datagrid,
    TextField, SearchInput, TextInput,
} from 'react-admin';

const searchFilters = [
    <SearchInput placeholder="Пошук марки" source="name" alwaysOn />
];

export const BrandList = () => (
    <List filters={searchFilters}>
        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Марка" />
        </Datagrid>
    </List>
);