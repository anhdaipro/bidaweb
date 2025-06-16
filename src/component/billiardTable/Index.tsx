
import { useBilliardTables } from '@query/useBilliardTable';
import React from 'react';
import { formatNumber } from '@utils/format';
import { STATUS_LABELS, TYPE_LABELS } from '@form/billiardTable';
import { useAuthStore } from '@store/useUserStore';
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
import { ROLE_ADMIN } from '@form/user';
import { useNavigate,Link } from 'react-router-dom';

const BilliardTableList: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const { data: tables, isLoading } = useBilliardTables() as {
    data: {
      id: number;
      tableNumber: string;
      status: number;
      type: number;
      hourlyRate: number;
    }[];
    isLoading: boolean;
  };

  // Responsive breakpoint for actions buttons layout
  const isMobile = useMediaQuery('(max-width:600px)');

  if (isLoading) {
    return (
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
  }

  const linkUpdate = (id: number) => {
    navigate(`/table/update/${id}`);
  };
  
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        mb: 4,
        bgcolor: '#fff',
        p: 3,
        borderRadius: 2,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {user?.roleId === ROLE_ADMIN && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems:'center', my: 2 }}>
          <Typography variant="h2" gutterBottom sx={{ color: '#333' }}>
            Quản lý bàn billiard
          </Typography>
          <Button
            component={Link}
            to="table/create"
            variant="contained"
            color="success"
            sx={{ minWidth: 120 }}
          >
            Tạo mới
          </Button>
        </Box>
      )}


      <Table sx={{ minWidth: 320 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f4f4f4' }}>Số bàn</TableCell>
            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f4f4f4' }}>Trạng thái</TableCell>
            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f4f4f4' }}>Loại bàn</TableCell>
            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f4f4f4', textAlign: 'right' }}>
              Giá theo giờ
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f4f4f4', textAlign: 'center' }}>
              Hành động
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tables.map(table => (
            <TableRow
              key={table.id}
              sx={{
                '&:nth-of-type(even)': { bgcolor: '#f9f9f9' },
                '&:hover': { bgcolor: '#f1f1f1', cursor: 'pointer' },
              }}
            >
              <TableCell>{`Bàn ${table.tableNumber}`}</TableCell>
              <TableCell>{STATUS_LABELS[table.status]}</TableCell>
              <TableCell>{TYPE_LABELS[table.type]}</TableCell>
              <TableCell sx={{ textAlign: 'right' }}>{formatNumber(table.hourlyRate)}</TableCell>

              <TableCell sx={{ textAlign: 'center' }}>
                <Stack
                  direction={isMobile ? 'column' : 'row'}
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => linkUpdate(table.id)}
                    sx={{ minWidth: 80 }}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    // onClick={() => handleDelete(table.id)}
                    sx={{ minWidth: 80 }}
                  >
                    Xóa
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default BilliardTableList;
