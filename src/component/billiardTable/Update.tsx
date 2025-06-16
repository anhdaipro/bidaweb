
import Form from "@component/billiardTable/Form";
import { useBilliardTable } from "@query/useBilliardTable";
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
const UpdateTablePage:React.FC = () => {
    const params = useParams();
    const id  = params.id;
    const {data: table, isLoading} = useBilliardTable(Number(id));
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
    return (<Form table={table}/>)
   
  };
  
  export default UpdateTablePage;