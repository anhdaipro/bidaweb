
import { Box, CircularProgress, Typography } from "@mui/material";
import FormProductPage from "./FormProduct";
import { useProduct } from "@query/useProducts";
import { Product } from "@type/model/Product";
import { useParams } from "react-router-dom";
const UpdateProductPage:React.FC = () => {
    
    const params = useParams();
    const id  = params.id;
    const {data: product, isLoading} = useProduct(Number(id)) as {data:Product, isLoading:boolean};
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
    return (<FormProductPage product={product}/>)
   
  };
  
  export default UpdateProductPage;