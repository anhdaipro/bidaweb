
import Form from "@component/customer/Form"
import { useGetUser } from "@query/useUser";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Box,
  Stack,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
const Update = () =>{
    const params = useParams();
    const id  = params.id;
    const {data: customer, isLoading} = useGetUser(Number(id));
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
        <Form customer={customer} />
    )
}
export default Update