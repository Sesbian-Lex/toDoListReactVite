import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ToDo from './toDo.jsx'
import CompletedTask from './completedTasks.jsx'

const router = createBrowserRouter([
  {path: '/', element: <ToDo/>},
  {path: '/completed', element: <CompletedTask/>}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
