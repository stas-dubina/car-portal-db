import {Create, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const CityCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Назва мiста" required={true} />
        </SimpleForm>
    </Create>
);