import  /*ReactDOM,*/ { createRoot } from 'react-dom/client';
/*import { createBrowserRouter, RouterProvider } from 'react-router-dom';*/
import App from './App';
import { StrictMode } from 'react';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);