// in src/components/AdminApp.tsx
"use client"; // remove this line if you choose Pages Router
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

const dataProvider = simpleRestProvider("http://localhost:3000/api");

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