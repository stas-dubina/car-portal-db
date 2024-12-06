import {Link,  useListContext} from 'react-admin';
import {Box, Card, CardContent, CardMedia, ImageList, ImageListItem, useMediaQuery, useTheme} from "@mui/material";
import CarCrashIcon from '@mui/icons-material/CarCrash';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import React from "react";

// @ts-ignore
const CarImage = ({car}) => {
    return (
        <div style={{display: "flex"}}>
            {car.imageFile &&
                <img src={`/uploads/cars/${car.id}/${car.imageFile}`}
                     alt={`Зображення для авто №${car.id}`}
                     style={{maxWidth: 300, maxHeight: 200}}/>
            }
            {!car.imageFile && <Box margin={'auto'}><CarCrashIcon sx={{fontSize: 72}}/></Box>}
        </div>
    )
}

export const CarList = () => {
    const {data} = useListContext();
    const cols = 3;

    if (!data) return null;

    return (
        <ImageList rowHeight={200} cols={cols} sx={{m: 2, maxWidth: 1980}}>
            {data.map(car => (
                <ImageListItem
                    key={car.id}
                    sx={{
                        maxWidth: 600,
                        maxHeight: 200
                    }}
                >
                    <Card sx={{display: 'flex'}}>
                        <CardMedia
                            component={CarImage}
                            sx={{width: 151}}
                            car={car}
                        />
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <CardContent sx={{flex: '1 0 auto'}}>
                                <Link
                                    sx={{textDecoration: 'none'}}
                                    to={`/cars/${car.id}/show`}
                                >
                                    {`${car.brandName} ${car.modelName} ${car.year}`}
                                </Link>
                                <h4 style={{color: '#3c9806', margin: 0}}>
                                    {`${(car.price).toLocaleString('en-us', {minimumFractionDigits: 0})} $`}
                                </h4>
                                <Box sx={{display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center'}}>
                                    <SpeedIcon/>
                                    <div style={{paddingTop: 5}}>{car.mileage / 1000} тис. км</div>
                                </Box>
                                <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
                                    <LocalGasStationIcon/>
                                    <div style={{paddingTop: 1}}>{car.fuelTypeName} </div>
                                </Box>
                                <Box sx={{display: 'flex', flexDirection: 'row', gap: 1, paddingTop: '3px'}}>
                                    <SettingsApplicationsIcon/>{car.gearTypeName}
                                </Box>
                                <Box sx={{display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center'}}>
                                    <LocationCityIcon/>
                                    <div style={{paddingTop: 5}}>{car.cityName} </div>
                                </Box>
                            </CardContent>
                        </Box>
                    </Card>
                </ImageListItem>
            ))
            }
        </ImageList>
    );
}
