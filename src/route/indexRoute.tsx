import RootLayout from '@component/Layout';
import Login from '@component/Login';
import { productRoutes } from './routeProduct';
import { tableRoutes } from './routeSetupTable';
import { customerRoutes } from './routeCustomer';
import { employeeRoutes } from './routeEmployee';
import { transactionRoutes } from './routeTransaction';
import { sessionRoutes } from './routeSession';
import { timeSheetRoutes } from './routeTimeSheet';
import TableManager from '@component/tableSession/TableManager';
import Dashboard from '@component/DashBoard';
import ShiftManagement from '@component/shift/ShiftManagement';


export const routes = [
  // ❗ Route riêng không dùng layout
  {
    path: '/login',
    element: <Login />,
  },

  // ✅ Route dùng layout chung
  {
    element: <RootLayout />,
    children: [
      ...productRoutes,
      ...tableRoutes,
      ...customerRoutes,
      ...employeeRoutes,
      ...transactionRoutes,
      ...sessionRoutes,
      ...timeSheetRoutes,
      {
        path: '/manage-table',
        element: <TableManager />,
      },
      {
        path: '/',
        element: <Dashboard />,
      },
       {
        path: '/schedule',
        element: <ShiftManagement />,
      }
    ],
  },
];