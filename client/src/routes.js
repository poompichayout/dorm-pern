import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import RoomList from 'src/pages/RoomList';
import FreeRoomList from 'src/pages/FreeRoomList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import AdminPage from 'src/pages/Admin';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import CheckBill from 'src/pages/CheckBill';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'rooms', element: <RoomList /> },
      { path: 'freerooms', element: <FreeRoomList /> },
      { path: 'checkbill', element: <CheckBill /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'admin', element: <AdminPage /> },
      { path: 'request', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
