import {Link as RouterLink} from 'react-router-dom';
import {Card, Link, Stack} from '@mui/material';

export const StatisticsList = () => (
    <Card sx={{m: 2, p: 2}}>
        <Stack spacing={2}>
            <Link component={RouterLink} to="/statistics/on-sale">
                Кількість активних угод і сума вартості автомобілів
            </Link>
            <Link component={RouterLink} to="/statistics/sales">
                Кількість проданих автомобілів за період
            </Link>
            <Link component={RouterLink} to="/statistics/sales-by-brand">
                Кількість проданих автомобілів за брендом
            </Link>
            <Link component={RouterLink} to="/statistics/mileage-by-brand">
                Кількість автомобілів за пробiгом
            </Link>
        </Stack>
    </Card>
);