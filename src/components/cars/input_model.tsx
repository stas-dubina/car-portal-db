import {useWatch} from "react-hook-form";
import {ReferenceInput, SelectInput} from "react-admin";
import React from "react";

export const ModelInput = () => {
    const brandId = useWatch({name: 'brandId'});

    return <ReferenceInput source="modelId" reference="models" filter={{brandId: Number(brandId)}}>
        <SelectInput name="modelId" source="modelId" label="Модель" required={true} disabled={!brandId}/>
    </ReferenceInput>
}
