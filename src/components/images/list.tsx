import {
    CreateButton,
    Datagrid,
    ImageField,
    List,
    SelectColumnsButton,
    TextField,
    TopToolbar
} from "react-admin";
import {useParams} from "react-router-dom";

const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
    </TopToolbar>
);

export const ImagesList = () => {
    const {carId} = useParams();
    return (
        <List resource={`cars/${carId}/images`} actions={<ListActions/>}
              empty={<CreateButton/>}>
            <Datagrid>
                <TextField source="id" label="ID"/>
                <TextField source="file" label="Тип кузова"/>
            </Datagrid>
        </List>
    );
}