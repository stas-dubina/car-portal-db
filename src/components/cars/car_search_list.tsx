import {List, useListContext} from 'react-admin';
import {CarFilter} from "@/components/cars/search";
import {Box, ImageList, ImageListItem, useMediaQuery, useTheme} from "@mui/material";
import CarCrashIcon from '@mui/icons-material/CarCrash';

const useColsForWidth = () => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const xl = useMediaQuery(theme.breakpoints.up('xl'));
    // there are all dividers of 24, to have full rows on each page
    if (xl) return 8;
    if (lg) return 6;
    if (md) return 4;
    if (sm) return 3;
    return 2;
};

export const CarList = () => {
    const {data} = useListContext();
    const cols = useColsForWidth();

    if (!data) return null;

    return (
        <ImageList rowHeight={180} cols={cols} sx={{m: 2, maxWidth: 1980}}>
            {data.map(car => (
                <ImageListItem
                    key={car.id}
                    sx={{
                        maxWidth: 180,
                        maxHeight: 180,
                        width: 180
                    }}
                >
                    {car.imageFile &&
                        <img src={`/uploads/cars/${car.id}/${car.imageFile}`} alt={`Зображення для авто №${car.id}`}/>
                    }
                    {!car.imageFile && <Box margin={'auto'}><CarCrashIcon sx={{fontSize: 72}}/></Box>}
                </ImageListItem>
            ))
            }
        </ImageList>
    );
}

export const CarSearchList = () => {
    return (
        <List aside={<CarFilter/>}>
            <CarList/>
        </List>
    );
}