import { Outlet } from 'react-router-dom'
import Nav from './nav/Nav'
import UserAuthControlls from '../auth/UserAuthControlls'

const Layout = () => {


    return (
        <>
            <header>
                <UserAuthControlls />
                <Nav />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>

            </footer>
        </>
    )
}

export default Layout