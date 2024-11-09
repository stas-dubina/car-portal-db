import {
    List,
    Datagrid,
    TextField, SearchInput,
} from 'react-admin';

const searchFilters = [
    <SearchInput placeholder="Пошук бренду" source="name" alwaysOn />
];

export const BrandList = () => (
    <List filters={searchFilters}>
        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Назва бренду" />
        </Datagrid>
    </List>
);