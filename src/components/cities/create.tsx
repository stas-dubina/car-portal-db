import {Create, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const CityCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Назва кольору" required={true} />
            <TextInput source="value" label="HTML значення" required={true} />
        </SimpleForm>
    </Create>
);
