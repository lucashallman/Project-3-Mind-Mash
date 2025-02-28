
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Trivia from './pages/Trivia';
import App from './App';
//import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Riddle from './pages/Riddles';
import Profile from './pages/Profile'
import Signup from './pages/Signuplogin';
import Stats from './pages/Stats';
import Leaderboard from './pages/Leaderboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // Default route for "/"
        element: <Home />
      },
      {
        path: 'Trivia',
        element: <Trivia />
      },
      {
        path: 'Riddle',
        element: <Riddle />
      },
      {
        path: 'Profile',
        element: <Profile />
      },
      {
        path: 'Signup',
        element: <Signup />
      },
      {
        path: 'Stats',
        element: <Stats />
      },
      {
        path: 'Leader',
        element: <Leaderboard />
      }

    ]
  }
]);

// Rendering the application
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
