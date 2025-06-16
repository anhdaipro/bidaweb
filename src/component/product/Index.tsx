
import React, { useState } from 'react';
import { useProducts, useUpdateStatusProduct } from '../../query/useProducts';
import { useControlStore } from '../../store/useStore';
import { CATEGORY_LABELS, STATUS_ACTIVE, STATUS_INACTIVE, STATUS_LABEL } from '@form/product';
import { formatNumber, formatDate } from '@utils/format';
import { useAuthStore } from '../../store/useUserStore';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination,
  Stack,
  useTheme,
  Grid,
  Chip,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';

import Search from './Search';
import { ProductFormSearch, ProductIndex } from '@type/model/Product';
import { ROLE_ADMIN } from '@form/user';
import { Link } from 'react-router-dom';

const IndexProduct:React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [formData, setFormData] = useState<ProductFormSearch>({
    status: '',
    categoryId: '',
    name: '',
    dateFrom: '',
    dateTo: '',
    uidLogin:'',
  });
  const { data, isLoading } = useProducts(currentPage, itemsPerPage, formData);
  const updateStore = useControlStore((state) => state.updateStore);
  const user = useAuthStore((state) => state.user);
  const { mutate: updateStatus } = useUpdateStatusProduct();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
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

  const products = data.data;
  const totalPages = data.pagination.totalPages;

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (id: number) => {
    updateStore({
      isVisible: true,
      action: 'delete-product',
      id,
      title: 'Bạn có chắc chắn muốn xóa sản phẩm này không?',
    });
  };

  const handleUpdate = (id: number, statusCurrent: number) => {
    const status = statusCurrent === STATUS_ACTIVE ? STATUS_INACTIVE : STATUS_ACTIVE;
    updateStatus({ id, status });
  };

  const setFormSearch = (data: ProductFormSearch) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <Box sx={{ backgroundColor: '#fff', p: 2, maxWidth:1200,m:'auto' }}>
      {/* Search form */}
      <Box sx={{ marginBottom: 3 }}>
        <Search setFormSearch={setFormSearch} form={formData} />
      </Box>

      {/* Button Tạo mới */}
      {user?.roleId === ROLE_ADMIN && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems:'center', marginBottom: 2 }}>
          <Typography variant="h2" gutterBottom>
          Danh sách sản phẩm
        </Typography>
          <Button
            component={Link}
            to="/product/create"
            variant="contained"
            color="primary"
            size="large"
          >
            Tạo mới
          </Button>
        </Box>
      )}

      {/* Table */}
      {isMobile ? 
      <Grid container spacing={2}>
      {products.map((product: ProductIndex, index: number) => (
        
          <Grid size={{xs:12, sm:6, md:6,lg:4}} spacing={1}>
            <Paper elevation={2} sx={{ p: 2 }}>
            <Grid container spacing={2}>
            {/* Hình ảnh và thông tin cơ bản */}
            <Grid size={{xs:4}}>
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{ 
                  width: '100%', 
                  height: 80, 
                  objectFit: 'cover', 
                  borderRadius: 1 
                }}
              />
            </Grid>
            <Grid size={{xs:8}}>
              <Typography variant="subtitle1" fontWeight="bold">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {CATEGORY_LABELS[product.categoryId]}
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {formatNumber(product.price)} đ
              </Typography>
              <Chip 
                label={STATUS_LABEL[product.status]} 
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Grid>
  
            {/* Thông tin bổ sung */}
            <Grid size={{xs:12}}>
              <Typography variant="body2">
                Ngày tạo: {formatDate(product.createdAt)}
              </Typography>
              <Typography variant="body2">
                Người tạo: {product.rUidLogin?.name || 'N/A'}
              </Typography>
            </Grid>
  
            {/* Hành động */}
            {user.roleId === ROLE_ADMIN && (
              <Grid size={{xs:12}}>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Button
                    component={Link}
                    to={`/products/update/${product.id}`}
                    variant="outlined"
                    size="small"
                    fullWidth
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleUpdate(product.id, product.status)}
                    fullWidth
                  >
                    Trạng thái
                  </Button>
                </Stack>
              </Grid>
            )}
            </Grid>
            </Paper>
          </Grid>
        
      ))}
    </Grid>
      :<TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell align="right">Giá</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hình</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: ProductIndex, index: number) => (
              <TableRow key={product.id}>
                <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{CATEGORY_LABELS[product.categoryId]}</TableCell>
                <TableCell align="right">{formatNumber(product.price)}</TableCell>
                <TableCell>{STATUS_LABEL[product.status]}</TableCell>
                <TableCell>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
                  />
                </TableCell>
                <TableCell>
                  {formatDate(product.createdAt)}
                  <br />
                  {product.rUidLogin?.name}
                </TableCell>
                <TableCell>
                  <Stack spacing={1}>
                    {user.roleId === ROLE_ADMIN && (
                      <Button
                        component={Link}
                        to={`/product/update/${product.id}`}
                        variant="outlined"
                        size="small"
                      >
                        Chỉnh sửa
                      </Button>
                    )}
                    {user.roleId === ROLE_ADMIN && (
                      // Bạn có thể thêm confirm dialog cho nút này nếu cần
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleUpdate(product.id, product.status)}
                      >
                        Cập nhật trạng thái
                      </Button>
                    )}
                    {/* Nếu cần nút Xóa, bật lại phần này */}
                    {/* {user.roleId === ROLE_ADMIN && (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(product.id)}
                      >
                        Xóa
                      </Button>
                    )} */}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      }
      {/* Pagination */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 3,
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default IndexProduct;
