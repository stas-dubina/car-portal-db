import {Create, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const FuelTypeCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Назва типу палива" required={true} />
        </SimpleForm>
    </Create>
);
