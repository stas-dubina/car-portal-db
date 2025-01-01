import {Edit, SimpleForm, TextInput} from "react-admin";
import React from "react";
import {FeatureCreate} from "@/components/features/create";

export const FeatureEdit = () => (
    <Edit mutationMode="pessimistic">
        <SimpleForm>
            <TextInput source="name" label="Назва опції" required={true} />
        </SimpleForm>
    </Edit>
);
