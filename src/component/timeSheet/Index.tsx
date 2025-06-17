// app/products/page.tsx
'use client';
import React, { useState,useEffect } from 'react';
import { POSITION_LABELS,ROLE_ADMIN,STATUS_LABELS } from '@form/user';
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
import dayjs from 'dayjs';
import { useGetTimeSheets } from '@query/useTimesheet';
import { TimeSheetFormSearch, TimeSheetIndex } from '@type/model/TimeSheet';
import { usegetAllShift } from '@query/useShift';
import { Shift } from '@type/model/Shift';
import { Link } from 'react-router-dom';
const Index = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // Số sản phẩm trên mỗi trang
    const [formData, setFormData] = useState<TimeSheetFormSearch>({
        status:'',shiftId: '',dateFrom: '', dateTo:'',employeeId:''
        
    });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const { data, isLoading } = useGetTimeSheets(currentPage, itemsPerPage,formData);
    const {data:shifts, isLoading:isLoadingShift} = usegetAllShift()
    const user = useAuthStore(state=>state.user)
    
    if (isLoading || !user || isLoadingShift) {
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
    const aTimeSheet = data.data;
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
        <Search />

       
            <Box display="flex" justifyContent="space-between" alignItems={'center'} my={2}>
                <Typography variant="h2" gutterBottom>
                    Danh sách chấm công
                </Typography>
                {user?.roleId === ROLE_ADMIN && (
                <Button
                    component={Link}
                    to="/timesheet/create"
                    variant="contained"
                    color="primary"
                    size="large"
                >
                Tạo mới
            </Button>)}
            </Box>
        
        {isMobile ?
        <Grid container spacing={2}>
            {aTimeSheet.map((timesheet: TimeSheetIndex, index: number) => {
                const shift = shifts.find((item:Shift) => item.id == timesheet.shiftId)
                const nameShift = shift ? `${shift.name} ${shift.startTime} - ${shift.endTime}` : ''
                return (
                <Grid size={{xs:12, sm:6, md:6,lg:4}} key={timesheet.id}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Stack spacing={1}>
                    <Typography variant="subtitle2">STT: {index + 1}</Typography>
                    <Typography variant="subtitle2">Tên nhân viên: {timesheet?.rEmployee.name}</Typography>
                    <Typography variant="subtitle2">Chức vụ: {timesheet.rEmployee ? POSITION_LABELS[timesheet.rEmployee.roleId] : ''}</Typography>
                    <Typography variant="subtitle2">Checkin: {dayjs(timesheet.checkInTime).format('DD/MM/YYYY HH:ii')}</Typography>
                    <Typography variant="subtitle2">Checkout: {dayjs(timesheet.checkOutTime).format('DD/MM/YYYY HH:ii')}</Typography>
                    <Typography variant="subtitle2">Ca làm: {nameShift}</Typography>
                    <Typography variant="subtitle2">Số giờ làm thực tế: {timesheet.actualHours}</Typography>
                    <Typography variant="subtitle2">Ngày làm: {timesheet.date}</Typography>
                    
                    {user.roleId === ROLE_ADMIN && (
                        <Box mt={1}>
                        <Button
                            component={Link}
                            to={`/employee/update/${timesheet.id}`}
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
            )})
            }
        </Grid>
        :
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table size="small">
        <TableHead>
            <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên Nhân viên</TableCell>
            <TableCell>Chức vụ</TableCell>
            <TableCell>Check in</TableCell>
            <TableCell>Check out</TableCell>
            <TableCell>Ca làm việc</TableCell>
            <TableCell>Số giờ làm thức tế</TableCell>
            <TableCell>Ngày làm việc</TableCell>
            <TableCell>Hành động</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {aTimeSheet.map((timesheet: TimeSheetIndex, index: number) => {
                const shift = shifts.find((item:Shift) => item.id == timesheet.shiftId)
                const nameShift = shift ? `${shift.name} ${shift.startTime} - ${shift.endTime}` : ''
                return (
                <TableRow key={timesheet.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{timesheet?.rEmployee.name}</TableCell>
                    <TableCell>{timesheet.rEmployee ? POSITION_LABELS[timesheet.rEmployee.roleId] : ''}</TableCell>
                    <TableCell>{dayjs(timesheet.checkInTime).format('DD/MM/YYYY HH:mm')}</TableCell>
                    <TableCell>{dayjs(timesheet.checkOutTime).format('DD/MM/YYYY HH:mm')}</TableCell>
                    <TableCell>{nameShift}</TableCell>
                    <TableCell>{timesheet.actualHours}</TableCell>
                    <TableCell>{dayjs(timesheet.date).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>
                    <Stack spacing={1} direction="column">
                        {user.roleId === ROLE_ADMIN && (
                        
                            <Button component={Link} to={`/employee/update/${timesheet.id}`} variant="outlined" size="small">Chỉnh sửa</Button>
                            
                        )}
                        {/* <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(customer.id)}>Xóa</Button> */}
                    </Stack>
                    </TableCell>
                </TableRow>
            )})}
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
