import { RouterProvider, createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import MainContent from './components/main-content/MainContent';
import AdventurersTab from './components/adventurers-tab/AdventurersTab';
import App from './App';

export default function Router(props) {

    const router = createBrowserRouter([
        {
            element: <App />,
            children: [
                {
                    element: <MainContent />,
                    children: [
                        {
                            path: "/adventurers",
                            element: <AdventurersTab />,
                        },
                    ],
                },
                {
                    path: "*",
                    element: <Navigate to="/adventurers" />
                }
            ]
        }
    ])

    return (
        <RouterProvider router={ router } />
    )
}