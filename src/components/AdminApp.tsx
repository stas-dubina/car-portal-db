// in src/components/AdminApp.tsx
"use client"; // remove this line if you choose Pages Router
import {Admin, Resource, ListGuesser, EditGuesser} from "react-admin";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import simpleRestProvider from "ra-data-simple-rest";
import {CarList} from "@/components/cars/list";
import {CarShow} from "@/components/cars/details";

const dataProvider = simpleRestProvider("http://localhost:3000/api");

const AdminApp = () => (
    <Admin dataProvider={dataProvider}>
        <Resource
            name="brands"
            list={ListGuesser}
            edit={EditGuesser}
            icon={CollectionsBookmarkIcon}
        />
        <Resource
            name="models"
            list={ListGuesser}
            edit={EditGuesser}
            icon={LibraryBooksIcon}
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