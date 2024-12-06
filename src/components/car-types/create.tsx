import {Create, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const CarTypeCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Назва типу автомобіля" required={true} />
        </SimpleForm>
    </Create>
);
