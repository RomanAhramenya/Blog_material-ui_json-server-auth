import { useLocation, useNavigate } from 'react-router-dom';

import { Tabs, Tab, Box } from '@mui/material';
import { useEffect, useState } from 'react';

type ITabs = "/" | "/profile"
const Nav = () => {

    const location = useLocation()
    const path = location.pathname
    const navigate = useNavigate()

    const [value, setValue] = useState<ITabs>('/');

    useEffect(() => {
        if (path === '/' || path === '/profile') {
            setValue(path)
        }

    }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: ITabs) => {
        setValue(newValue);
        navigate(newValue)
    };

    return (
        <Box pl={2}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Главная" value="/" />
                <Tab label="Профиль" value="/profile" />
            </Tabs>
        </Box>



    )
}

export default Nav