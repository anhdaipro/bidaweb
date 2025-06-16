
import CreateBilliardTable from '@component/billiardTable/Create';
import BilliardTableList from '@component/billiardTable/Index';
import UpdateTablePage from '@component/billiardTable/Update';
export const tableRoutes = [
  { path: '/table', element: <BilliardTableList /> },
  { path: '/table/create', element: <CreateBilliardTable /> },
  { path: '/table/update/:id', element: <UpdateTablePage /> },
];