import { createBrowserRouter, Navigate } from 'react-router-dom';
import IdeaPage from '../pages/idea/IdeaPage';
import ExplorePage from '../pages/explore/ExplorePage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/idea" replace />
    },
    {
        path: '/idea',
        element: <IdeaPage />
    },
    {
        path: '/explore',
        element: <ExplorePage />
    }
]); 