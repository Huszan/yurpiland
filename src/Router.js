import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
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
                            path: "/map",
                            element: <h1>Not implemented yet</h1>,
                        },
                        {
                            path: "/adventurers",
                            element: <AdventurersTab />,
                        },
                        {
                            path: "/guild",
                            element: <h1>Not implemented yet</h1>,
                        },
                        {
                            path: "/staff",
                            element: <h1>Not implemented yet</h1>,
                        },
                        {
                            path: "/alchemy",
                            element: <h1>Not implemented yet</h1>,
                        },
                        {
                            path: "/achievements",
                            element: <h1>Not implemented yet</h1>,
                        },
                        {
                            path: "/settings",
                            element: <h1>Not implemented yet</h1>,
                        },
                    ],
                },
                {
                    path: "*",
                    element: <Navigate to="/map" />
                }
            ]
        }
    ])

    return (
        <RouterProvider router={ router } />
    )
}