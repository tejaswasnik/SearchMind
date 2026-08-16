import { RouterProvider } from 'react-router';
import { routes } from '../app/app.routes.jsx';
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
