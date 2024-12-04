import {Edit, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const GearTypeEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" label="Назва типу КПП" required={true} />
        </SimpleForm>
    </Edit>
);
