
import CreateTableSession from "@component/tableSession/Create";
import Index from "@component/tableSession/Index";
import UpdateTableSession from "@component/tableSession/Update";
export const sessionRoutes = [
  { path: '/session', element: <Index /> },
  { path: '/session/create', element: <CreateTableSession /> },
  { path: '/session/update/:id', element: <UpdateTableSession /> },
];