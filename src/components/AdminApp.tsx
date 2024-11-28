// in src/components/AdminApp.tsx
"use client";
import {Admin, CustomRoutes, defaultDarkTheme, EditGuesser, Layout, Menu, Resource, ShowGuesser} from "react-admin";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import PaletteIcon from '@mui/icons-material/Palette';
import PeopleIcon from '@mui/icons-material/People';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import LocationCityIcon from '@mui/icons-material/LocationCity';
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
import {CityList} from "@/components/cities/list";
import {CarCreate} from "@/components/cars/create";
import {BrandCreate} from "@/components/brands/create";
import {ColorCreate} from "@/components/colors/create";
import {BodyTypeCreate} from "@/components/body-types/create";
import {BodyTypeEdit} from "@/components/body-types/edit";
import {Route} from "react-router";
import {SalesStatistics} from "@/components/statistics/sales";
import {OnSaleStatistics} from "@/components/statistics/on_sale";
import {StatisticsList} from "@/components/statistics/list";
import {BrandEdit} from "@/components/brands/edit";
import {CarEdit} from "@/components/cars/edit";
import {ImagesList} from "@/components/images/list";
import {CreateImage} from "@/components/images/create";
import {dataProvider} from "@/components/dataprovider";
import {CarSearchList} from "@/components/cars/car_search_list";


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

export const MyMenu = () => (
    <Menu>
        <Menu.ResourceItems/>
        <Menu.Item to="/statistics" primaryText="Statistic" leftIcon={<CollectionsBookmarkIcon/>}/>
    </Menu>
);

// @ts-ignore
export const MyLayout = ({children}) => (
    <Layout menu={MyMenu}>
        {children}
    </Layout>
);

const AdminApp = () => (
    <Admin
        theme={AppTheme}
        dataProvider={dataProvider}
        layout={MyLayout}>
        <Resource
            name="brands"
            list={BrandList}
            show={ShowGuesser}
            edit={BrandEdit}
            create={BrandCreate}
            icon={CollectionsBookmarkIcon}
        />
        <Resource
            name="models"
            list={ModelList}
            show={ShowGuesser}
            edit={EditGuesser}
            icon={LibraryBooksIcon}
        />
        <Resource
            name="car-types"
            list={CarTypeList}
            show={ShowGuesser}
            edit={EditGuesser}
            icon={FireTruckIcon}
        />
        <Resource
            name="body-types"
            list={BodyTypeList}
            show={ShowGuesser}
            edit={BodyTypeEdit}
            create={BodyTypeCreate}
            icon={AirportShuttleIcon}
        />
        <Resource
            name="fuel-types"
            list={FuelTypeList}
            show={ShowGuesser}
            edit={EditGuesser}
            icon={LocalGasStationIcon}
        />
        <Resource
            name="gear-types"
            list={GearTypeList}
            show={ShowGuesser}
            edit={EditGuesser}
            icon={SettingsApplicationsIcon}
        />
        <Resource
            name="colors"
            list={ColorList}
            show={ShowGuesser}
            edit={EditGuesser}
            create={ColorCreate}
            icon={PaletteIcon}
        />
        <Resource
            name="users"
            list={UserList}
            show={ShowGuesser}
            edit={EditGuesser}
            icon={PeopleIcon}
        />
        <Resource
            name="cars"
            list={CarSearchList}
            show={CarShow}
            edit={CarEdit}
            create={CarCreate}
            icon={DirectionsCarIcon}
        >
            <Route path=":carId/images" element={<ImagesList/>}/>
            <Route path=":carId/images/create" element={<CreateImage/>}/>
        </Resource>
        <Resource
            name="cities"
            list={CityList}
            show={ShowGuesser}
            edit={EditGuesser}
            icon={LocationCityIcon}
        />
        <CustomRoutes>
            <Route path="/statistics" element={<StatisticsList/>}/>
            <Route path="/statistics/on-sale" element={<OnSaleStatistics/>}/>
            <Route path="/statistics/sales" element={<SalesStatistics/>}/>
        </CustomRoutes>
    </Admin>
);

export default AdminApp;