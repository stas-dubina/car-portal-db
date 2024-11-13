// in src/components/AdminApp.tsx
"use client";
import {Admin, Resource, ListGuesser, EditGuesser, ShowGuesser, defaultDarkTheme} from "react-admin";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import PaletteIcon from '@mui/icons-material/Palette';
import PeopleIcon from '@mui/icons-material/People';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import simpleRestProvider from "ra-data-simple-rest";
import {CarList} from "@/components/cars/list";
import {CarShow} from "@/components/cars/details";
import {BrandList} from "@/components/brands/list";
import {ModelList} from "@/components/models/list";
import {BodyTypeList} from "@/components/body-types/list";
import {FuelTypeList} from "@/components/fuel-types/list";
import {GearTypeList} from "@/components/gear-types/list";
import {ColorList} from "@/components/colors/list";
import {UserList} from "@/components/users/list";
import {CarTypeList} from "@/components/car-types/list";

const dataProvider = simpleRestProvider("http://localhost:3000/api");

const AppTheme = {
    ...defaultDarkTheme,
    components: {
        ...defaultDarkTheme.components,
        MuiTextField: {
            defaultProps: {
                variant: 'outlined' as const,
                fullWidth: true,
            },
        }
    },
};

const AdminApp = () => (
    <Admin
        theme={AppTheme}
        dataProvider={dataProvider}>
        <Resource
            name="brands"
            list={BrandList}
            edit={EditGuesser}
            icon={CollectionsBookmarkIcon}
        />
        <Resource
            name="models"
            list={ModelList}
            show={ShowGuesser}
            icon={LibraryBooksIcon}
        />
        <Resource
            name="car-types"
            list={CarTypeList}
            show={ShowGuesser}
            icon={FireTruckIcon}
        />
        <Resource
            name="body-types"
            list={BodyTypeList}
            show={ShowGuesser}
            icon={AirportShuttleIcon}
        />
        <Resource
            name="fuel-types"
            list={FuelTypeList}
            show={ShowGuesser}
            icon={LocalGasStationIcon}
        />
        <Resource
            name="gear-types"
            list={GearTypeList}
            show={ShowGuesser}
            icon={SettingsApplicationsIcon}
        />
        <Resource
            name="colors"
            list={ColorList}
            show={ShowGuesser}
            icon={PaletteIcon}
        />
        <Resource
            name="users"
            list={UserList}
            show={ShowGuesser}
            icon={PeopleIcon}
        />
        <Resource
            name="cars"
            list={CarList}
            show={CarShow}
            icon={DirectionsCarIcon}
        />
    </Admin>
);

export default AdminApp;