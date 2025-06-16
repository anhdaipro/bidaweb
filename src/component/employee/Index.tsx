
import React, { useState,useEffect } from 'react';
import { POSITION_LABELS,ROLE_ADMIN,STATUS_LABELS } from '@form/user';
import { formatDate, formatNumber } from '@utils/format';
import { useAuthStore } from '../../store/useUserStore';
import Search from './Search';
import {CustomerFormSearch } from '@type/model/Customer';
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
import { Employee, EmployeeFormSearch, EmployeeIndex } from '@type/model/Employee';
import { usegetAllEmployee } from '@query/useEmployee';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
const Index = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // Số sản phẩm trên mỗi trang
    const [formData, setFormData] = useState<EmployeeFormSearch>({
        status:'',phone: '',dateFrom: '', dateTo:'',
        uidLogin:'',
    });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const { data, isLoading } = usegetAllEmployee(currentPage, itemsPerPage,formData);
    console.log(data);
    const user = useAuthStore(state=>state.user)
    
    if (isLoading || !user) {
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
    const aEmployee = data.data;
    const totalPages = data.pagination.totalPages;
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        }
    };
    
    const setFormSearch = (data:CustomerFormSearch)=>{
        setFormData(prev => ({ ...prev, ...data }));
    }
    return (
        <Box className="product-container" sx={{ p: { xs: 2, md: 4 } }}>
        <Search setFormSearch={setFormSearch} form={formData} />

       
            <Box display="flex" justifyContent="space-between" alignItems={'center'} my={2}>
                <Typography variant="h2" gutterBottom>
                    Danh sách nhân viên
                </Typography>
                {user?.roleId === ROLE_ADMIN && (
                <Button
                    component={Link}
                    to="/employee/create"
                    variant="contained"
                    color="primary"
                    size="large"
                >
                Tạo mới
            </Button>)}
            </Box>
        
        {isMobile ?
        <Grid container spacing={2}>
            {aEmployee.map((customer: EmployeeIndex, index: number) => (
                <Grid size={{xs:12, sm:6, md:6,lg:4}} key={customer.id}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Stack spacing={1}>
                    <Typography variant="subtitle2">STT: {index + 1}</Typography>
                    <Typography variant="subtitle2">Tên nhân viên: {customer.name}</Typography>
                    <Typography variant="subtitle2">Số điện thoại: {customer.phone}</Typography>
                    <Typography variant="subtitle2">Trạng thái: {STATUS_LABELS[customer.status]}</Typography>
                    <Typography variant="subtitle2">Chức vụ: {POSITION_LABELS[customer.roleId]}</Typography>
                    <Typography variant="subtitle2">Ngày tạo: {formatDate(customer.createdAt)}</Typography>
                    <Typography variant="subtitle2">Sinh nhật: {dayjs(customer.dateOfBirth).format('DD/MM/YYYY')}</Typography>
                    
                    {user.roleId === ROLE_ADMIN && (
                        <Box mt={1}>
                        <Button
                            component={Link}
                            to={`/employee/update/${customer.id}`}
                            variant="outlined"
                            size="small"
                        >
                            Chỉnh sửa
                        </Button>
                        </Box>
                    )}
                    </Stack>
                </Paper>
                </Grid>
            ))}
        </Grid>
        :
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table size="small">
        <TableHead>
            <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên Nhân viên</TableCell>
            <TableCell>Số điện thoại</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Chức vụ</TableCell>
            <TableCell>Ngày tạo</TableCell>
            <TableCell>Sinh nhật</TableCell>
            <TableCell>Hành động</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {aEmployee.map((customer: EmployeeIndex, index: number) => (
            <TableRow key={customer.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{STATUS_LABELS[customer.status]}</TableCell>
                <TableCell>{POSITION_LABELS[customer.roleId]}</TableCell>
                <TableCell>{formatDate(customer.createdAt)}</TableCell>
                <TableCell>{dayjs(customer.dateOfBirth).format('DD/MM/YYYY')}</TableCell>
                <TableCell>
                <Stack spacing={1} direction="column">
                    {user.roleId === ROLE_ADMIN && (
                    
                        <Button component={Link} to={`/employee/update/${customer.id}`} variant="outlined" size="small">Chỉnh sửa</Button>
                        
                    )}
                    {/* <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(customer.id)}>Xóa</Button> */}
                </Stack>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
        </TableContainer>
        }
        {/* Phân trang */}
        <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => handlePageChange(page)}
            color="primary"
            />
        </Box>
    </Box>
    );
};

export default Index;
