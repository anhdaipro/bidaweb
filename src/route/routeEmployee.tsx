import Create from "@component/employee/Create";
import Index from "@component/employee/Index";
import Update from "@component/employee/Update";
export const employeeRoutes = [
  { path: '/employee', element: <Index /> },
  { path: '/employee/create', element: <Create /> },
  { path: '/employee/update/:id', element: <Update /> },
];