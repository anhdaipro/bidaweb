
import CreateProductPage from '@component/product/Create';
import IndexProduct from '@component/product/Index';
import UpdateProductPage from '@component/product/Update';

export const productRoutes = [
  { path: '/product', element: <IndexProduct /> },
  { path: '/product/create', element: <CreateProductPage /> },
  { path: '/product/update/:id', element: <UpdateProductPage /> },
];