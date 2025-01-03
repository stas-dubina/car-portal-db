import {
    List,
    Datagrid,
    TextField, SearchInput, SelectInput, ReferenceInput,
} from 'react-admin';

const searchFilters = [
    <SearchInput placeholder="Пошук типу кузова" source="name" alwaysOn />,
    <ReferenceInput source="carType.id" reference="body-types"  >
        <SelectInput sx={{width: '190px'}} alwaysOn />
    </ReferenceInput>
];

export const BodyTypeList = () => (
    <List filters={searchFilters}>
        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Тип кузова" />
            <TextField source="carType.name" label="Тип авто" />
        </Datagrid>
    </List>
);