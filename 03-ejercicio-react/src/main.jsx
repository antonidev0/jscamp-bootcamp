import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { JobCard } from './pages/ejemplo.jsx'

createRoot(document.getElementById("root")).render(
  <JobCard titulo="soy un titulo" empresa="google" />,
);
