import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import List from '@mui/material/List';
import ListIcon from '@mui/icons-material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 240;

interface NavItem {
  label: string;
  target: string;
  isRoute: boolean;
}

const navItems: NavItem[] = [
  { label: 'Expertise', target: 'expertise', isRoute: false },
  { label: 'Experience', target: 'history', isRoute: false },
  { label: 'Projects', target: 'projects', isRoute: false },
  { label: 'Blog', target: '/blog', isRoute: true },
  { label: 'Contact', target: 'contact', isRoute: false }
];

interface NavigationProps {
    parentToChild: {
        mode: string;
    };
    modeChange: () => void;
}

function Navigation({parentToChild, modeChange}: NavigationProps) {
  const {mode} = parentToChild;
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navigation");
      if (navbar) {
        const scrolled = window.scrollY > navbar.clientHeight;
        setScrolled(scrolled);
      }

      // Scroll spy - detect active section
      if (location.pathname === '/') {
        const sections = ['expertise', 'history', 'projects', 'blog', 'contact'];
        const scrollPosition = window.scrollY + 200; // Offset for navbar

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      } else if (location.pathname.startsWith('/blog')) {
        setActiveSection('/blog');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const handleNavClick = (item: NavItem) => {
    if (item.isRoute) {
      navigate(item.target);
    } else {
      // Navigate home first if on blog page
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          scrollToSection(item.target);
        }, 100);
      } else {
        scrollToSection(item.target);
      }
    }
  };

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (item: NavItem): boolean => {
    if (item.isRoute) {
      return activeSection === item.target;
    }
    return activeSection === item.target;
  };

  const drawer = (
    <Box className="navigation-bar-responsive" onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <p className="mobile-menu-top"><ListIcon/>Menu</p>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleNavClick(item)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" id="navigation" className={`navbar-fixed-top${scrolled ? ' scrolled' : ''}`}>
        <Toolbar className='navigation-bar'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {mode === 'dark' ? (
            <LightModeIcon onClick={() => modeChange()} sx={{ cursor: 'pointer' }}/>
          ) : (
            <DarkModeIcon onClick={() => modeChange()} sx={{ cursor: 'pointer' }}/>
          )}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button 
                key={item.label} 
                onClick={() => handleNavClick(item)} 
                className={`nav-button ${isActive(item) ? 'active' : ''}`}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navigation;
