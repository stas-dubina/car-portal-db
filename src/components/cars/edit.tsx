import {
    AutocompleteArrayInput,
    Button,
    Edit,
    Form,
    Link,
    NumberInput,
    RadioButtonGroupInput,
    ReferenceInput,
    SaveButton,
    SelectInput,
    ShowButton,
    TextInput, Title,
    TopToolbar
} from "react-admin";
import React from "react";
import {Grid} from "@mui/material";
import {BOOLEAN_RADIO_VALUES, DRIVE_TYPES} from "./types";
import {useParams} from "react-router-dom";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {ModelInput} from "./input_model";
import {BodyTypeInput} from "./input_body_type";
import ReferenceManyToManyInput from './input_many_to_many';

const EditActions = () => {
    const {id} = useParams();
    return (
        <TopToolbar>
            <Button
                component={Link}
                to={`/cars/${id}/images`}
                color="primary"
                startIcon={<AddAPhotoIcon/>}
                label="Зображення"
            />
            <ShowButton/>
        </TopToolbar>
    );
}

export const CarEdit = () => {
    const {id} = useParams();
    return (
        <Edit actions={<EditActions/>} mutationMode="pessimistic" title={`Автомобіль №${id}`}>
            <Form>
                <Grid container sx={{m: 2}}>
                    <Grid item xs={3}>
                        <ReferenceInput
                            source="brandId"
                            reference="brands">
                            <SelectInput label="Бренд" required={true}/>
                        </ReferenceInput>
                        <ModelInput/>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                    <Grid item xs={3}>
                        <NumberInput source="year" label="Рік" required={true}/>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                    <Grid item xs={3}>
                        <ReferenceInput source="fuelTypeId" reference="fuel-types">
                            <SelectInput label="Тип палива" required={true}/>
                        </ReferenceInput>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                    <Grid item xs={3}>
                        <ReferenceInput source="gearTypeId" reference="gear-types">
                            <SelectInput label="Коробка передач" required={true}/>
                        </ReferenceInput>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                    <Grid item xs={3}>
                        <NumberInput source="mileage" label="Пробіг" required={true}/>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                    <Grid item xs={3}>
                        <NumberInput source="price" label="Ціна" required={true}/>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                    <Grid item xs={3}>
                        <ReferenceInput source="colorId" reference="colors">
                            <SelectInput label="Колір" required={true}/>
                        </ReferenceInput>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                    <Grid item xs={3}>
                        <TextInput source="vin" label="VIN-код" required={true} disabled={true}/>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                    <Grid item xs={3}>
                        <ReferenceInput
                            source="carTypeId"
                            reference="car-types"
                        >
                            <SelectInput label="Тип авто" required={true}/>
                        </ReferenceInput>
                        <BodyTypeInput/>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                    <Grid item xs={3}>
                        <RadioButtonGroupInput source="accident" label="Був у ДТП" required={true}
                                               choices={BOOLEAN_RADIO_VALUES}/>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                    <Grid item xs={3}>
                        <RadioButtonGroupInput source="abroad" label="Був за кордоном" required={true}
                                               choices={BOOLEAN_RADIO_VALUES}/>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                    <Grid item xs={3}>
                        <RadioButtonGroupInput source="inCredit" label="В кредиті" required={true}
                                               choices={BOOLEAN_RADIO_VALUES}/>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                    <Grid item xs={3}>
                        <NumberInput source="ownerNumber" label="Кількість власників" required={true}/>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>

                    <Grid item xs={3}>
                        <NumberInput source="power" label="Потужність" required={true}/>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>

                    <Grid item xs={3}>
                        <NumberInput source="seat" label="Кількість місць" required={true}/>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>

                    <Grid item xs={3}>
                        <SelectInput source="driveType" choices={DRIVE_TYPES} label="Тип приводу" required={true}/>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>

                    <Grid item xs={3}>
                        <TextInput source="description" label="Опис"/>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                    <Grid item xs={3}>
                        <ReferenceManyToManyInput
                            source="featureIds"
                            reference="features"
                        />
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                    <Grid item xs={12}>
                        <SaveButton/>
                    </Grid>
                </Grid>
            </Form>
        </Edit>
    )
}
