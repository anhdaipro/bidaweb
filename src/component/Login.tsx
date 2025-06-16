
import React, { useEffect, useState } from 'react';
import { useLogin } from '../query/useUser';
import { useAuthStore } from '../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
const LoginPage: React.FC = () => {
  const user = useAuthStore(state=>state.user);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  }, [user])
  const {mutate: login, isPending} = useLogin()
  const setUser = useAuthStore(state=>state.setUser)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {identifier,password};
    login(data, {
        onSuccess: (data) => {
            localStorage.setItem('token', data.accessToken); // Lưu token vào localStorage
            localStorage.setItem('refreshToken', data.refreshToken); // Lưu token vào localStorage
            navigate('/'); // Chuyển hướng đến trang Home
            setUser(data.user)
        },
    });
  };

  return (
     <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5', // tuỳ chọn
      }}
    >
      <Container maxWidth="xs">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Đăng nhập
          </Typography>

          <TextField
            label="Tên đăng nhập hoặc Số điện thoại"
            variant="outlined"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Mật khẩu"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
          >
            {isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;