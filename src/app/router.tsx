import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@pages/HomePage';
import { RoadmapPage } from '@pages/RoadmapPage';
import { RoadmapResultPage } from '@pages/RoadmapResultPage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { App } from './App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'roadmap',
        element: <RoadmapPage />,
      },
      {
        path: 'roadmap-result',
        element: <RoadmapResultPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
