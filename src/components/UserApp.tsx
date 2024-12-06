"use client";
import {Admin, CustomRoutes, defaultDarkTheme, Layout, Menu, Resource} from "react-admin";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import {Route} from "react-router";
import {dataProvider} from "@/components/dataprovider";
import {CarSearchList} from "@/components/search/car_search_list";
import {authProvider} from "@/components/authprovider";
import {MyAppBar} from "@/components/appbar/appbar";
import {MyCarsList} from "@/components/user/my-cars";
import {CarList} from "@/components/cars/list";
import {CarShow} from "@/components/cars/details";
import {CarEdit} from "@/components/cars/edit";
import {CarCreate} from "@/components/cars/create";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import {ImagesList} from "@/components/images/list";
import {CreateImage} from "@/components/images/create";


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
        <Menu.DashboardItem primaryText="Пошук"/>
        <Menu.Item to="/cars" primaryText="Мої авто" leftIcon={<CollectionsBookmarkIcon/>}/>
    </Menu>
);

// @ts-ignore
export const MyLayout = ({children}) => (
    <Layout menu={MyMenu} appBar={MyAppBar}>
        {children}
    </Layout>
);

const UserApp = () => (
    <Admin
        theme={AppTheme}
        dataProvider={dataProvider}
        authProvider={authProvider}
        layout={MyLayout}
        dashboard={CarSearchList}
    >
        <Resource
            name="cars"
            list={MyCarsList}
            show={CarShow}
            edit={CarEdit}
            create={CarCreate}
            icon={DirectionsCarIcon}
        >
            <Route path=":carId/images" element={<ImagesList/>}/>
            <Route path=":carId/images/create" element={<CreateImage/>}/>
        </Resource>
    </Admin>
);

export default UserApp;