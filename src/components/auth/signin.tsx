import {
    Form,
    PasswordInput,
    ReferenceInput,
    SaveButton, SelectInput,
    TextInput,
    useLogin,
    useNotify,
    useRedirect
} from 'react-admin';
import {Box, Card, Grid} from '@mui/material';
import {useState} from "react";
import Button from "@mui/material/Button";

export const SignInForm = () => {

    const notify = useNotify();
    const redirect = useRedirect();
    const [isSingUp, setSingUp] = useState(false)

    const login = useLogin();

    const signIn = async (data) => {
        try {
            const result = await login({username: data.login, password: data.password})
            redirect("/")
        } catch (err) {
            notify("Помилка, спробуйте ще раз", {type: 'error'})
        }
    }

    const signUp = async (data) => {
        const resp = await fetch("/api/auth/signup", {
            method: "POST",
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            body: JSON.stringify(data),
        })
        if (!resp.ok) {
            notify("Помилка, спробуйте ще раз", {type: 'error'})
            return
        }
        await signIn(data)
    };

    const onSubmit = async (data) => {
        if (isSingUp) {
            await signUp(data)
        } else {
            await signIn(data)
        }
    }

    return (
        <Box sx={{justifyContent: 'center', display: 'flex'}}>
            <Card sx={{m: 2, p: 2, maxWidth: 600}}>
                <Form onSubmit={onSubmit}>
                    <Grid container>
                        <Grid item xs={6} style={{paddingLeft: 5}}>
                            {isSingUp ? 'Реєстрація' : 'Вхiд'}
                        </Grid>
                        <Grid item xs={6} style={{justifyContent: 'right', display: 'flex'}}>
                            <Button variant="text" style={{marginLeft: 10}} onClick={() => setSingUp(!isSingUp)}>
                                {isSingUp ? 'На вхiд' : 'На реєстрацію'}
                            </Button>
                        </Grid>
                        <Grid item xs={6} style={{paddingRight: 10}}>
                            <TextInput source="login" required={true}/>
                        </Grid>
                        <Grid item xs={6}>
                            <PasswordInput source="password" required={true}/>
                        </Grid>
                        {isSingUp &&
                            <Grid item xs={6} style={{paddingRight: 10}}>
                                <TextInput source="firstName" required={true}/>
                            </Grid>
                        }
                        {isSingUp &&
                            <Grid item xs={6}>
                                <TextInput source="lastName" required={true}/>
                            </Grid>
                        }
                        {isSingUp &&
                            <Grid item xs={6} style={{paddingRight: 10}}>
                                <TextInput source="phone" required={true} type="tel"/>
                            </Grid>
                        }
                        {isSingUp &&
                            <Grid item xs={6}>
                                <TextInput source="email" required={true} type="email"/>
                            </Grid>
                        }
                        {isSingUp &&
                            <Grid item xs={6} style={{paddingRight: 10}}>
                                <ReferenceInput name="cityId" source="cityId" reference="cities">
                                    <SelectInput label="Мiсто" required={true}/>
                                </ReferenceInput>
                            </Grid>
                        }
                        {isSingUp &&
                            <Grid item xs={6} style={{paddingRight: 10}}>

                            </Grid>
                        }
                        <Grid item xs={6}>
                            <SaveButton label={isSingUp ? 'Створити' : 'Увiйти'}/>
                        </Grid>
                    </Grid>
                </Form>
            </Card>
        </Box>
    );
}