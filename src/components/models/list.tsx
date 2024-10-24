import {
    List,
    Datagrid,
    TextField, SearchInput, TextInput, ReferenceField,
} from 'react-admin';

const searchFilters = [
    <SearchInput placeholder="Пошук моделi" source="name" alwaysOn />
];

export const ModelList = () => (
    <List filters={searchFilters}>
        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Модель" />
            <ReferenceField source="brandId" reference="brands" label="Марка" />
        </Datagrid>
    </List>
);