
import FormProductPage from './FormProduct';
import { STATUS_ACTIVE } from '@form/product';
const CreateProductPage = () => {
  const product = {
    id:0,
    name: "",
    status:STATUS_ACTIVE,
    image: '',
    price: 0,
    categoryId: 0,
    public_image:'',
  };
 

  return (<FormProductPage product={product}/>)
 
};

export default CreateProductPage;
