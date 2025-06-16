
import {useTransaction } from '@query/useTransaction';
import FormProductTransaction from './FormTransaction';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, Grid, Button, CircularProgress, useMediaQuery, useTheme,Link as MuiLink
} from '@mui/material';
export default function UpdateProductTransaction() {
    const param = useParams()
  const {data:transaction, isLoading} = useTransaction(Number(param.id));
  // useEffect(()=>{
  //   setLoading(isLoading)
  // },[isLoading])
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
    <FormProductTransaction transaction ={transaction}/>
  );
}
