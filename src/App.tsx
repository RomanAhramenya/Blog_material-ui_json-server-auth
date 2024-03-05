
import { jwtDecode } from "jwt-decode";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './components/pages/layout/Layout';
import Blog from './components/pages/blog/Blog';
import Profile from './components/pages/profile/Profile';
import AuthProvider from "./components/hoc/AuthProvider";
import SignIn from "./components/pages/auth/SignIn";
import SignUp from "./components/pages/auth/SignUp";
import { Provider } from "react-redux";
import store from "./store/store";


function App() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZGlhQGdtYWlsLmNvbSIsImlhdCI6MTcwOTQ1NjkxNSwiZXhwIjoxNzA5NDYwNTE1LCJzdWIiOiIyIn0.juN4E_I6ghqdPFGBJS7dBIk0p6h_Z9PWKmR3UgSVohU"
  const decoded = jwtDecode(token);


  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path="auth/signin" element={<SignIn />} />
      <Route path="auth/signup" element={<SignUp />} />
      <Route index element={<Blog />} />
      <Route path='profile' element={<Profile />} />
    </Route>

  ))

  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>

  )
}

export default App
