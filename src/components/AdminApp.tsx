// in src/components/AdminApp.tsx
"use client"; // remove this line if you choose Pages Router
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

const dataProvider = jsonServerProvider("http://localhost:3000/api");

const AdminApp = () => (
    <Admin dataProvider={dataProvider}>
        <Resource
            name="brands"
            list={ListGuesser}
            edit={EditGuesser}
        />
        <Resource
            name="models"
            list={ListGuesser}
            edit={EditGuesser}
        />
    </Admin>
);

export default AdminApp;