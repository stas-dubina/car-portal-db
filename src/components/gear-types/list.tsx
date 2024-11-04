import {
    List,
    Datagrid,
    TextField, SearchInput, SelectInput, ReferenceInput,
} from 'react-admin';

const searchFilters = [
    <SearchInput placeholder="Пошук типу КПП" source="name" alwaysOn />,
    <ReferenceInput source="carGearType.id" reference="gear-types"  >
        <SelectInput sx={{width: '190px'}} alwaysOn />
    </ReferenceInput>
];

export const GearTypeList = () => (
    <List filters={searchFilters}>
        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Тип КПП" />
        </Datagrid>
    </List>
);