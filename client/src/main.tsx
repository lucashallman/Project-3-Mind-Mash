import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Trivia from './pages/Trivia';
import App from './App';
//import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Riddle from './pages/Riddles';
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
        path: 'trivia',
        element: <Trivia />
      },
      {
        path: 'riddles',
        element: <Riddle />
      }
    ]
  }
]);

// Rendering the application
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}