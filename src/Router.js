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
                            path: "/adventurers",
                            element: <AdventurersTab />,
                        },
                        {
                            path: "/guild",
                            element: <h1>Not implemented yet</h1>,
                        },
                        {
                            path: "/achievements",
                            element: <h1>Not implemented yet</h1>,
                        },
                        {
                            path: "/info",
                            element: <h1>Not implemented yet</h1>,
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