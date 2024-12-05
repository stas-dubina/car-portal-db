import {Create, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const GearTypeCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Назва типу КПП" required={true} />
        </SimpleForm>
    </Create>
);
