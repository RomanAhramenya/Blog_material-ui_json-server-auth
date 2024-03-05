import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { IUser } from "../../../types/user"
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { fetchAuth } from "../../../store/slice/authSlice";
import { Link } from "react-router-dom";

const SignIn = () => {
    const dispatch = useAppDispatch()
    const { isLoading, user } = useAppSelector(state => state.auth)
    const { control, handleSubmit } = useForm<IUser>({
        defaultValues: {
            email: "",
            password: "",

        }
    })
    const onSubmit: SubmitHandler<IUser> = (data) => {

        dispatch(fetchAuth({
            user: data,
            variant: 'signin'
        }))

    }
    return (
        <>
            {!user && <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    gap={2}
                    width={350}

                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 auto"
                    }}
                >
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: "Введите Email",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Неверный формат email"
                            }
                        }}
                        render={({ field, fieldState }) => <TextField
                            fullWidth
                            required
                            id="filled-basic"
                            label="Email"
                            variant="filled"
                            error={!!fieldState.error}
                            helperText={fieldState.error ? fieldState.error.message : null}
                            {...field} />}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "Пароль обязателен",
                            minLength: 3
                        }}
                        render={({ field, fieldState }) => (
                            <TextField
                                fullWidth
                                required
                                id="filled-basic"
                                label="Password"
                                variant="filled"
                                type="password"
                                error={!!fieldState.error}
                                helperText={fieldState.error ? fieldState.error.message : null}
                                {...field}
                            />
                        )}
                    />
                    <Button type="submit" variant="outlined">Войти</Button>
                </Box>
            </form>}
            {user && <>
                <Typography variant="h4" color={'green'} p={2} textAlign={'center'}>Вы успешно вошли в систему</Typography>
                <Box>
                    <Link to='/'>на главную</Link>
                </Box>
            </>}
        </>


    )
}

export default SignIn