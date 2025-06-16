"use client"
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { useAuthStore } from '@store/useUserStore';
import { ROLE_ADMIN, STATUS_LABELS } from '@form/user';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateCustomer, useUpdateCustomer } from '@query/useUser';
import { useToastStore } from '../../store/toastStore';
import { CustomerForm } from '@typesModel/Customer';
import { RequiredLable } from '../Icon';
import { useNavigate,Link } from 'react-router-dom';
import { generateId } from '@utils/format';
interface Props{
  customer: CustomerForm;
}
const Form: React.FC<Props> = ({ customer }) => {
  const user = useAuthStore(state=>state.user)
  const navigate = useNavigate();
    const addToast = useToastStore(state=>state.addToast)
  useEffect(()=>{
    if(user && user.roleId != ROLE_ADMIN){
      navigate('/customer')
    }
  },[user])  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CustomerForm>({
    values: {
     ...customer
    },
  });
  const { mutate: addCustomer,isPending:isPendingCreate } = useCreateCustomer();
  const { mutate: updateCustomer,isPending:isPendingUpdate } = useUpdateCustomer();
  const handleFormSubmit = (data: CustomerForm) => {
    const payload = {
      ...data
    };
    if (customer.id) {
      const id = customer.id;
      updateCustomer({ id, payload }, {
        onSuccess: () => {
            addToast({
                id: generateId(),
                message: 'Cập nhật thành công',
                type: 'success',
                
              })
            window.location.href = '/customer';
        },
        onError: (error: any) => {
          console.error('Error updating billiard table:', error);
        },
      });
    } else {
        addCustomer(payload, {
        onSuccess: () => {
            addToast({
                id: generateId(),
                message: 'Thêm mới thành công',
                type: 'success',
                
              })
            window.location.href = '/customer';
        },
        onError: (error: any) => {
          console.error('Error creating billiard table:', error);
        },
      });
    }
    
  };
  
  const title = customer.id ? 'Cập nhật' : 'Tạo mới';
  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', p: { xs: 2, sm: 3, md: 4 } }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        
        <Button variant="outlined" size="small" component={Link} to="/customer">
            Danh sách
          </Button>
        
      </Box>

      <Typography variant="h5" align="center" gutterBottom>
        {title} khách hàng
      </Typography>

      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Grid container spacing={2}>
          {/* Tên */}
          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              label={
                <span>
                  Tên khách hàng<RequiredLable required />
                </span>
              }
              {...register('name')}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
          </Grid>

          {/* Trạng thái */}
          <Grid size={{xs:12}}>
          <FormControl fullWidth error={Boolean(errors.status)}>
            <InputLabel id="typeEducation-label">Trạng thái<RequiredLable required/></InputLabel>
              <Select
                labelId="typeEducation-label"
                id="typeEducation"
                label="Trạng thái"
                value={watch('status')}
                {...register('status', {
                  required: 'Trạng thái không để trống',
                  validate: (value) =>
                    value != '0' || 'Vui lòng chọn trạng thái',
                })}
              >
                <MenuItem value='0'>Trạng thái</MenuItem>
                {Object.entries(STATUS_LABELS).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.status?.message}</FormHelperText>
            </FormControl>
          </Grid>

          {/* Số điện thoại */}
          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              label={
                <span>
                  Số điện thoại<RequiredLable required />
                </span>
              }
              {...register('phone', { required: 'SĐT không để trống' })}
              error={Boolean(errors.phone)}
              helperText={errors.phone?.message}
            />
          </Grid>

          {/* Nút Submit */}
          <Grid size={{xs:12}}>
            <Button disabled={isPendingCreate || isPendingUpdate} type="submit" fullWidth variant="contained">
              {title}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Form;