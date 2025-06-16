
import Form from "@component/employee/Form"
import { useGetEmployee } from "@query/useEmployee";
import { useParams } from "react-router-dom";
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
const Update = () =>{
    const params = useParams();
    const id  = params.id;
    const {data: customer, isLoading} = useGetEmployee(Number(id));
    if(isLoading) return (
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
    );
    return (
        <Form employee={customer} />
    )
}
export default Update