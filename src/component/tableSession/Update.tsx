
import FormTableSession from './Form';
import { useTableSession } from '@query/useTableSession';
import { useParams } from 'react-router-dom';
import {
    Box,
    Button,
    
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Pagination,
    Grid,
    Stack,
    useTheme,
    useMediaQuery,
    CircularProgress,
  } from '@mui/material';
export default function UpdateTableSession() {
    const param = useParams()
  const {data:tableSession, isLoading} = useTableSession(Number(param.id));
  if (isLoading) {
    return(
      <Box
                    sx={{
                      height: '100vh',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <CircularProgress color="primary" />
                    <Typography variant="h6" color="primary">
                      Đang tải dữ liệu...
                    </Typography>
                  </Box>
    )
  }
  return (
    <FormTableSession tableSession ={tableSession}/>
  );
}
