import Create from '@component/customer/Create';
import Index from '@component/customer/Index';
import Update from '@component/customer/Update';
export const customerRoutes = [
  { path: '/customer', element: <Index /> },
  { path: '/customer/create', element: <Create /> },
  { path: '/customer/update/:id', element: <Update /> },
];