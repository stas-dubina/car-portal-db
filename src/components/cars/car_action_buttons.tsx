import {fetchUtils, useNotify, useRecordContext, useRefresh} from 'react-admin';
import {Box} from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useState} from "react";

const CancelButton = () => {
    const car = useRecordContext();
    const [inProgress, setInProgress] = useState(false);
    const notify = useNotify();
    const refresh = useRefresh();

    const handleClick = () => {
        setInProgress(true)
        fetchUtils.fetchJson(`/api/cars/${car!.id}/status`,
            {
                method: "PUT",
                body: JSON.stringify({status: 'CANCELLED'})
            })
            .then(() => {
                setInProgress(false)
                notify('Авто знято з продажу')
                refresh()
            })
            .catch(() => {
                setInProgress(false)
                notify('Помилка', {type: 'error'})
                refresh()
            })
    }
    return (<Button
        variant="contained"
        color="error"
        onClick={handleClick}
        disabled={inProgress || car!.status != 'ON_SALE'}
    >
        Зняти з продажу
    </Button>)
};

const SoldButton = () => {
    const car = useRecordContext();
    const notify = useNotify();

    const [price, setPrice] = useState(0);
    const [inProgress, setInProgress] = useState(false);
    const refresh = useRefresh();

    const handleClick = () => {
        setInProgress(true)
        fetchUtils.fetchJson(`/api/cars/${car!.id}/status`,
            {
                method: "PUT",
                body: JSON.stringify({
                    status: 'SOLD',
                    price: price
                })
            })
            .then(() => {
                setInProgress(false)
                notify('Авто продано')
                refresh()
            })
            .catch(() => {
                setInProgress(false)
                notify('Помилка', {type: 'error'})
                refresh()
            })
    }
    return (
        <Box sx={{display: "flex", flexDirection: "row"}}>
            <TextField id="outlined-required"
                       label="Цiна продажу"
                       variant="outlined"
                       style={{marginRight: 15}}
                       type="number"
                       disabled={car!.status != 'ON_SALE'}
                       onChange={e => setPrice(Number(e.target.value))}/>
            <Button
                sx={{minWidth: 140}}
                variant="contained"
                color="success"
                onClick={handleClick}
                disabled={inProgress || !price || car!.status != 'ON_SALE'}
            >
                Продано
            </Button>
        </Box>
    )
};

export const ActionButtons = () => {
    return (
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <CancelButton/>
            <SoldButton/>
        </Box>
    )
}