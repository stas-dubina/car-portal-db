import {
    List,
    Datagrid,
    TextField, SearchInput,
} from 'react-admin';

const searchFilters = [
    <SearchInput placeholder="Пошук кольору" source="name" alwaysOn />
];

export const ColorList = () => (
    <List filters={searchFilters}>
        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Назва кольору" />
            <TextField source="value" label="HTML значення" />
        </Datagrid>
    </List>
);