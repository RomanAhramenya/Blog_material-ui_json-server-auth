import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { logout } from '../../../store/slice/authSlice';
import { Avatar } from '@mui/material';


const UserAuthControlls = () => {
    const dispatch = useAppDispatch()
    const { isLoading, user } = useAppSelector(state => state.auth)
    const path = useLocation().pathname
    const handlerLogout = () => {
        dispatch(logout())
    }
    return (
        <Box
            p={2}
            sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: "solid 1px #55b3f2",
                justifyContent: "flex-end",
            }}
        >
            <ButtonGroup sx={{
                alignItems: 'center', gap: '18px'
            }} variant="outlined" aria-label="Basic button group" size='small'>
                {!user && <>
                    <Link to='/auth/signin'>  <Button disabled={path === '/auth/signin'}>Войти</Button></Link>
                    <Link to='/auth/signup'> <Button disabled={path === '/auth/signup'}>Регистрация</Button></Link>
                </>}
                {user && <>
                    <Avatar  sx={{ bgcolor: '#ff5722' }} >{user.email[0].toUpperCase()}</Avatar>
                    <Button onClick={handlerLogout}>Выйти</Button>

                </>}
            </ButtonGroup>

        </Box>
    )
}

export default UserAuthControlls