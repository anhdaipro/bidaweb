

import CheckInCheckOut from '@component/shift/CheckIn';
import Index from '@component/timeSheet/Index';
export const timeSheetRoutes = [
  { path: '/timesheet', element: <Index /> },
  { path: '/timesheet/checkin', element: <CheckInCheckOut /> },
];