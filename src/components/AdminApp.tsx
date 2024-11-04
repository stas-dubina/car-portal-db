// in src/components/AdminApp.tsx
"use client"; // remove this line if you choose Pages Router
import {Admin, Resource, ListGuesser, EditGuesser, ShowGuesser, defaultDarkTheme} from "react-admin";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import simpleRestProvider from "ra-data-simple-rest";
import {CarList} from "@/components/cars/list";
import {CarShow} from "@/components/cars/details";
import {BrandList} from "@/components/brands/list";
import {ModelList} from "@/components/models/list";
import {BodyTypeList} from "@/components/body-types/list";
import {FuelTypeList} from "@/components/fuel-types/list";
import {GearTypeList} from "@/components/gear-types/list";
import {ColorList} from "@/components/colors/list";

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
            name="body-types"
            list={BodyTypeList}
            show={ShowGuesser}
            icon={LibraryBooksIcon}
        />
        <Resource
            name="cars"
            list={CarList}
            show={CarShow}
            icon={DirectionsCarIcon}
        />
        <Resource
            name="fuel-types"
            list={FuelTypeList}
            show={ShowGuesser}
            icon={LibraryBooksIcon}
        />
        <Resource
            name="gear-types"
            list={GearTypeList}
            show={ShowGuesser}
            icon={LibraryBooksIcon}
        />
        <Resource
            name="colors"
            list={ColorList}
            show={ShowGuesser}
            icon={LibraryBooksIcon}
        />
    </Admin>
);

export default AdminApp;