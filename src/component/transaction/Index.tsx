
import React, { useState } from 'react';
import {
  Box, Typography, Grid, Button, CircularProgress, useMediaQuery, useTheme,Link as MuiLink
} from '@mui/material';
import { useTransactions } from '../../query/useTransaction';
import { useProductsSearch } from '../../query/useProducts';
import { formatNumber } from '@utils/format'
import { useControlStore } from '@store/useStore';
import { TRANSACTION_TYPE_LABELS } from '@form/transaction';
import { CATEGORY_LABELS } from '@form/product';
import Search from './Search';
import { useAuthStore } from '@store/useUserStore';
import { Product } from '../../types/model/Product';
import { TransactionDetail, TransactionFormSearch, TransactionIndex } from '@type/model/Transaction';
import dayjs from 'dayjs';
import { ROLE_ADMIN } from '@form/user';
import { Link } from 'react-router-dom';
interface PropsDetail extends TransactionDetail {
  products: Product[];
}

const Detail: React.FC<PropsDetail> = ({ productId, products, quantity, price, totalPrice }) => {
  const product = products.find((p) => p.id === productId);
  const productName = product?.name || '';
  const productImg = product?.image;
  const type = CATEGORY_LABELS[product?.categoryId as keyof typeof CATEGORY_LABELS];

  return (
    <Grid container sx={{ mb: 1,p:{sx:1} }}>
      <Grid size={{xs:5, sm:6}}>
        <Box display="flex" flexDirection={{xs:'column', sm:'row'}} gap={2} alignItems={{xs:'unset',sm:'center'}}>
          <img src={productImg} width={50} height={50} alt={productName} style={{ borderRadius: 4 }} />
          <Box >
            <Typography>{productName}</Typography>
            <Typography variant="body2" color="text.secondary">Loại: {type}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid size={{xs:2, sm:2}}>
        <Typography>{quantity}</Typography>
      </Grid>
      <Grid size={{xs:2, sm:2}}>
        <Typography>{formatNumber(price)}</Typography>
      </Grid>
      <Grid size={{xs:3, sm:2}}>
        <Typography textAlign={'right'}>{formatNumber(totalPrice)}</Typography>
      </Grid>
    </Grid>
  );
};

const Index: React.FC = () => {
  const [formData, setFormData] = useState<TransactionFormSearch>({ 
    status: '', type: '', codeNo: '', dateFrom: '', dateTo: '',
    uidLogin:''
   });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const { data, isLoading, isError } = useTransactions(currentPage, itemsPerPage, formData);
  const { data: products, isLoading: isLoadingProduct } = useProductsSearch();
  const user = useAuthStore((state) => state.user);
  const updateStore = useControlStore(state => state.updateStore);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isLoading || isError || isLoadingProduct) {
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

  const totalPages = data.pagination.totalPages;
  const transactions = data.data;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = (id: number) => {
    updateStore({
      isVisible: true,
      action: 'delete-transaction',
      id,
      title: 'Bạn có chắc chắn muốn xóa giao dịch này không?'
    });
  };

  const setFormSearch = (data: TransactionFormSearch) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <Box sx={{ p: 2, maxWidth:1200,mx:'auto', background:'#fff' }}>
      

      <Search setFormSearch={setFormSearch} form={formData} />

      {user?.roleId === ROLE_ADMIN && (
        <Box display="flex" justifyContent="space-between" alignItems={'center'} my={2}>
            <Typography variant="h2"  fontSize={20} >Giao dịch sản phẩm</Typography>
            <Button to='/transaction/create' component={Link} variant="contained">Tạo mới</Button>
        </Box>
      )}
        
      {/* Header */}
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          p: 2,
          borderRadius: 2,
          fontWeight: 'bold',
          mb: 2,
          
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{xs:5, sm:6}}><Typography fontWeight="bold">Tên SP</Typography></Grid>
          <Grid size={{xs:2, sm:2}}><Typography fontWeight="bold">Số lượng</Typography></Grid>
          <Grid size={{xs:2, sm:2}}><Typography fontWeight="bold">Giá</Typography></Grid>
          <Grid size={{xs:3, sm:2}}><Typography textAlign={'right'} fontWeight="bold">Tổng tiền</Typography></Grid>
        </Grid>
      </Box>

      {transactions.map((transaction: TransactionIndex) => (
        <Box key={transaction.id} mb={4} p={2} border="1px solid #ddd" borderRadius={2}>
          <Box display="flex" justifyContent="space-between" flexDirection={isMobile ? 'column' : 'row'} mb={2}>
            <Box>
              <Typography variant="h6">Mã: {transaction.codeNo}</Typography>
              <Typography>Ngày nhập xuất: {dayjs(transaction.dateDelivery).format('DD/MM/YYYY')}</Typography>
              <Typography>Người tạo: {transaction.rUidLogin?.name}</Typography>
              {transaction.codeSession && (
                <MuiLink href={`/tablesession?codeNo=${transaction.codeSession}`} target="_blank">
                  Phiên chơi: {transaction.codeSession}
                </MuiLink>
              )}
            </Box>
            <Box>
              <Typography>Loại giao dịch: {TRANSACTION_TYPE_LABELS[transaction.type]}</Typography>
              <Typography fontWeight="bold">
                Tổng tiền: {transaction.totalAmount.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          {/* Chi tiết sản phẩm */}
          {transaction.details.map((detail) => (
            <Detail key={detail.id} {...detail} products={products || []} />
          ))}

          {/* Hành động */}
          <Box
  mt={2}
  display="flex"
  // flexDirection={isMobile ? 'column' : 'row'}
  gap={2}
  alignItems="flex-start"
>
 
    <Button
        href={`/transaction/update/${transaction.id}`}
      variant="outlined"
     
      fullWidth={isMobile}
    >
      Chỉnh sửa
    </Button>
  <Button
    variant="contained"
    color="error"
   
    onClick={() => handleDelete(transaction.id)}
    fullWidth={isMobile}
  >
    Xóa
  </Button>
</Box>
        </Box>
      ))}

      {/* Phân trang */}
      <Box display="flex" justifyContent="center" mt={4} gap={1} flexWrap="wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? 'contained' : 'outlined'}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Index;
