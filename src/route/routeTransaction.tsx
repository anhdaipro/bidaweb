

import CreateProductTransaction from "@component/transaction/Create";
import Index from "@component/transaction/Index";
import UpdateProductTransaction from "@component/transaction/Update";
export const transactionRoutes = [
  { path: '/transaction', element: <Index /> },
  { path: '/transaction/create', element: <CreateProductTransaction /> },
  { path: '/transaction/update/:id', element: <UpdateProductTransaction /> },
];