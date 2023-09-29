import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import MainContent from './components/main-content/MainContent';

export default function Router(props) {
    const {setIsDrawerOpen} = props;

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainContent setIsDrawerOpen={setIsDrawerOpen} />,
            children: [

            ],
        },
        {
            path: "*",
            element: <Navigate to="/" />
        }
    ])

    return (
        <RouterProvider router={ router } />
    )
}