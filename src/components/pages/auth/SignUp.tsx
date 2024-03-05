import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { IUser } from "../../../types/user"
import { Box, Button, TextField } from "@mui/material";
import { fetchAuth } from "../../../store/slice/authSlice";
import { useAppDispatch } from "../../../hooks/useRedux";
interface ISignUpProps {

}

const SignUp = (props: ISignUpProps) => {
    const { } = props
    const dispatch = useAppDispatch()
    const { control, handleSubmit } = useForm<IUser>({
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })
    const onSubmit: SubmitHandler<IUser> = (data) => {
        dispatch(fetchAuth({
            user: data,
            variant: 'signup'
        }))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <TextField fullWidth
                        id="filled-basic" label="Name" variant="filled"  {...field} />}
                />
                <Button type="submit" variant="outlined">Зарегестрироваться</Button>
            </Box>


        </form>
    )
}

export default SignUp