import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material';

import {
  Menu,
  LibraryMusic,
  HomeOutlined,
  Equalizer,
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Songs', icon: <HomeOutlined />, to: '/' },
  { label: 'Dashboard', icon: <Equalizer />, to: '/dashboard' },
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static" sx={{ background: '#5a5a5a' }}>
      <Toolbar>
        <LibraryMusic sx={{ color: 'white', mr: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
          Addis Music
        </Typography>

        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <Menu />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
              >
                <List>
                  {navItems.map(({ label, icon, to }) => (
                    <NavLink
                      to={to}
                      key={label}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <ListItem>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={label} />
                      </ListItem>
                    </NavLink>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex' }}>
            {navItems.map(({ label, icon, to }) => (
              <NavLink
                key={label}
                to={to}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  marginLeft: '1rem',
                  padding: '0.5rem 1rem',
                  borderBottom: isActive ? '2px solid #fff' : 'none',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  transition: '0.3s',
                  borderRadius: 4,
                })}
              >
                {icon}
                <Typography variant="body1" sx={{ ml: 0.5 }}>
                  {label}
                </Typography>
              </NavLink>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
