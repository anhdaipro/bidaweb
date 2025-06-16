import { useRoutes } from 'react-router-dom';
import { routes } from './route/indexRoute';
import QueryProvider from './QueryProfile';
import Modal from "@component/Modal";
import ToastContainer from "@component/toast/ToastContainer";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "@type/theme";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CssBaseline from '@mui/material/CssBaseline';
export default function App() {
  const element = useRoutes(routes);
  return (
         <ThemeProvider theme={theme}>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <QueryProvider>
                                {element}
                                <Modal/>
                                <ToastContainer/>
                        </QueryProvider>
                </LocalizationProvider>
        </ThemeProvider>
  )
}