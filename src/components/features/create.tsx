import {Create, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const FeatureCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Назва опції" required={true} />
        </SimpleForm>
    </Create>
);
