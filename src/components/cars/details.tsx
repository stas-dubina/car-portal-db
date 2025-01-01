import {useParams} from 'react-router-dom';
import {
    BooleanField,
    CreateButton,
    DateField,
    EditButton,
    Labeled,
    List,
    Loading,
    NumberField,
    RecordContextProvider,
    SelectField,
    TextField,
    Title,
    TopToolbar,
    useGetIdentity,
    useGetOne,
    useListContext,
    useRedirect,
    ReferenceArrayField
} from 'react-admin';
import React from "react";
import {DRIVE_TYPES} from "@/components/cars/types";
import {Box, Card, CardContent, CardMedia, Grid, ImageList, ImageListItem, Typography} from "@mui/material";
import {ActionButtons} from "@/components/cars/car_action_buttons";

// @ts-ignore
export const CarImage = ({image}) => {
    return (
        <Card sx={{marginBottom: 2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CardMedia
                component="img"
                image={`uploads/cars/${image.carId}/${image.file}`}
                alt={`Зображення для авто №${image.carId}`}
                sx={{maxWidth: 400, maxHeight: 200}}
            />
        </Card>
    )
}

export const CarImages = () => {
    // images
    const {data} = useListContext();

    if (!data) return null;

    return (
        <ImageList rowHeight={200} cols={5} sx={{m: 2, maxWidth: 1980}}>
            {data.map(image => (
                <ImageListItem
                    key={image.id}
                    sx={{
                        maxWidth: 400,
                        maxHeight: 200
                    }}
                >
                    <CarImage image={image}/>
                </ImageListItem>
            ))}
        </ImageList>
    )
}

export const SectionCard = ({title, children}: { title: string, children: any }) => (
    <Card sx={{marginBottom: 2, width: '900px'}}>
        <CardContent>
            <Typography variant="h6" gutterBottom>{title}</Typography>
            {children}
        </CardContent>
    </Card>
);

// @ts-ignore
export const VehicleDetails = ({car}) => (
    <SectionCard title="Загальна інформація">
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
                <Labeled><TextField source="brandName" label="Марка"/></Labeled>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Labeled><TextField source="modelName" label="Модель"/></Labeled>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Labeled><TextField source="year" label="Рік"/></Labeled>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Labeled><TextField source="fuelTypeName" label="Тип палива"/></Labeled>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Labeled><TextField source="gearTypeName" label="Коробка передач"/></Labeled>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Labeled><NumberField source="mileage" label="Пробіг"/></Labeled>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Labeled>
                    <NumberField
                        source="price"
                        label="Ціна"
                        options={{
                            style: 'currency',
                            currency: 'USD',
                        }}
                    />
                </Labeled>
            </Grid>
        </Grid>
    </SectionCard>
);

// @ts-ignore
export const OwnerDetails = ({car}) => (
    <SectionCard title="Інформація про власника">
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}><Labeled><TextField source="firstName" label="Ім'я"/></Labeled></Grid>
            <Grid item xs={12} sm={6} md={3}><Labeled><TextField source="lastName"
                                                                 label="Прізвище"/></Labeled></Grid>
            <Grid item xs={12} sm={6} md={3}><Labeled><TextField source="phone" label="Телефон"/></Labeled></Grid>
            <Grid item xs={12} sm={6} md={3}><Labeled><TextField source="email" label="Email"/></Labeled></Grid>
        </Grid>
    </SectionCard>
);

// @ts-ignore
export const TechnicalDetails = ({car}) => (
    <SectionCard title="Технічні характеристики">
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}><Labeled><TextField source="colorName" label="Колір"/></Labeled></Grid>
            <Grid item xs={12} sm={6} md={3}><Labeled><DateField source="createdAt"
                                                                 label="Дата створення"/></Labeled></Grid>
            <Grid item xs={12} sm={6} md={3}><Labeled><TextField source="vin" label="VIN-код"/></Labeled></Grid>
            <Grid item xs={12} sm={6} md={3}><Labeled><TextField source="description"
                                                                 label="Опис"/></Labeled></Grid>
            <Grid item xs={12} sm={6} md={3}><Labeled><TextField source="bodyTypeName"
                                                                 label="Тип кузова"/></Labeled></Grid>
            <Grid item xs={12} sm={6} md={3}><Labeled><TextField source="carTypeName"
                                                                 label="Тип автомобіля"/></Labeled></Grid>
            <Grid item xs={12} sm={6} md={3}><Labeled><BooleanField source="accident"
                                                                    label="Був у ДТП"/></Labeled></Grid>
            <Grid item xs={12} sm={6} md={3}><Labeled><BooleanField source="abroad"
                                                                    label="Був за кордоном"/></Labeled></Grid>
            <Grid item xs={12} sm={6} md={3}><Labeled><NumberField source="ownerNumber"
                                                                   label="Кількість власників"/></Labeled></Grid>
            <Grid item xs={12} sm={6} md={3}><Labeled><BooleanField source="inCredit"
                                                                    label="В кредиті"/></Labeled></Grid>
            <Grid item xs={12} sm={6} md={3}><Labeled><NumberField source="power"
                                                                   label="Потужність"/></Labeled></Grid>
            <Grid item xs={12} sm={6} md={3}><Labeled><NumberField source="seat"
                                                                   label="Кількість місць"/></Labeled></Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Labeled><SelectField source="driveType" choices={DRIVE_TYPES} label="Тип приводу"/></Labeled>
            </Grid>
        </Grid>
    </SectionCard>
);

// @ts-ignore
export const StatusDetails = ({car}) => (
    <SectionCard title="Статус">
        <Labeled>
            <SelectField source="status" choices={[
                {id: 'ON_SALE', name: 'ON_SALE'},
                {id: 'SOLD', name: 'SOLD'},
                {id: 'CANCELLED', name: 'CANCELLED'},
            ]} label="Статус"/>
        </Labeled>
    </SectionCard>
);

// @ts-ignore
export const FeaturesList = () => (
    <SectionCard title="Опцiї">
        <Labeled>
            <ReferenceArrayField reference="features" source="featureIds" label='Опцiї'/>
        </Labeled>
    </SectionCard>
);

const Actions = () => (
    <TopToolbar>
        <EditButton/>
    </TopToolbar>
);

const ImagesActions = () => (
    <TopToolbar>
        <CreateButton/>
    </TopToolbar>
);

export const CarShow = () => {
    const {id} = useParams();
    const {data: userData} = useGetIdentity();
    const redirect = useRedirect();
    const {data, isPending} = useGetOne(
        'cars',
        {id},
        {onError: () => redirect('/cars')}
    );

    if (isPending) {
        return <Loading/>;
    }

    return (
        <>
            <Title title={`${data.brandName} ${data.modelName} ${data.year}`}/>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <RecordContextProvider value={data}>
                    <Box sx={{mr: 2}}>
                        <Actions/>
                        <VehicleDetails car={data}/>
                        <OwnerDetails car={data}/>
                        <TechnicalDetails car={data}/>
                        <StatusDetails car={data}/>
                        <FeaturesList/>
                        {data.userId == userData!.id && <ActionButtons/>}
                    </Box>
                </RecordContextProvider>

                <List resource={`cars/${id}/images`} actions={<ImagesActions/>} title={false}>
                    <CarImages/>
                </List>
            </Box>
        </>
    );
};