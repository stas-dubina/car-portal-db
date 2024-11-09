import {
    List,
    Datagrid,
    TextField, SearchInput, TextInput, ReferenceField, DateField, ReferenceInput, SelectInput,
} from 'react-admin';

const searchFilters = [
    <SearchInput placeholder="Пошук людини" source="lastName" alwaysOn />,
    /* <ReferenceInput name="cityId" source="cityId" reference="cities" alwaysOn>
        <SelectInput label="Місто"/>
    </ReferenceInput>,
     */
];

export const UserList = () => (
    <List filters={searchFilters}>
        <Datagrid>
            <TextField source="id" label="ID" />
            <DateField source="createdAt" label="Дата реєстрації" />
            <TextField source="login" label="Логін" />
            <TextField source="firstName" label="Ім'я" />
            <TextField source="lastName" label="Прізвище" />
            <TextField source="phone" label="Номер телефону" />
            <TextField source="email" label="Пошта" />
            <TextField source="cityName" label="Місто" />
        </Datagrid>
    </List>
);