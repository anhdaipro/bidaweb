import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Box, 
  Menu, 
  MenuItem, 
  Button, 
  Avatar,
  useMediaQuery,
  Theme
} from '@mui/material';
import { useControlStore } from '../store/useStore';
import { useAuthStore } from '../store/useUserStore';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const isLoading = useControlStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
   
      <Toolbar sx={{ justifyContent: 'space-between', width:1000,margin:'auto', alignItems:'center' }}>
        {/* Left side - Logo and menu */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Menu button for mobile */}
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { md: 'none' } }}
            onClick={handleOpenNavMenu}
          >
            <MenuIcon />
          </IconButton> */}

          {/* Logo/Title */}
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            Quán Billiard
          </Typography>

          {/* Desktop menu items */}
          {/* <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                onClick={() => router.push(item.path)}
                sx={{ 
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                  borderRadius: 1
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box> */}
        </Box>

        {/* Mobile menu */}
        {/* <Menu
          id="mobile-menu"
          anchorEl={anchorElNav}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.path}
              onClick={() => {
                router.push(item.path);
                handleCloseNavMenu();
              }}
            >
              <Typography textAlign="center">{item.name}</Typography>
            </MenuItem>
          ))}
        </Menu> */}

        {/* Right side - User info */}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!isMobile && (
              <Typography variant="subtitle1" sx={{ mr: 1 }}>
                {user.name}
              </Typography>
            )}
            
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <MenuItem onClick={handleLogout}>
                <Typography>Đăng xuất</Typography>
              </MenuItem>
            

            
          </Box>
        )}
      </Toolbar>
    
  );
};

export default Header;