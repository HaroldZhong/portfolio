import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
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
  to: string;
  section: string;
}

const navItems: NavItem[] = [
  { label: 'Home', to: '/', section: 'home' },
  { label: 'Projects', to: '/projects', section: 'projects' },
  { label: 'Experience', to: '/#history', section: 'history' },
  { label: 'Expertise', to: '/#expertise', section: 'expertise' },
  { label: 'Education', to: '/#education', section: 'education' },
  { label: 'Publications', to: '/#publications', section: 'publications' },
  { label: 'Articles', to: '/blog', section: 'blog' },
  { label: 'Contact', to: '/#contact', section: 'contact' }
];

interface NavigationProps {
  parentToChild: {
    mode: string;
  };
  modeChange: () => void;
}

function Navigation({ parentToChild, modeChange }: NavigationProps) {
  const { mode } = parentToChild;
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, '') || '/';

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const restoreMenuFocus = useRef(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navigation");
      const offset = (navbar?.clientHeight || 64) + 32;
      setScrolled(window.scrollY > offset);

      if (pathname === '/') {
        const current = navItems.find(item => {
          const bounds = document.getElementById(item.section)?.getBoundingClientRect();
          return bounds && bounds.top <= offset && bounds.bottom > offset;
        });
        setActiveSection(current?.section || '');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [pathname]);

  const isActive = (item: NavItem): boolean => {
    if (pathname === '/') return activeSection === item.section;
    if (pathname === '/projects' || pathname.startsWith('/project/')) return item.section === 'projects';
    return (pathname === '/blog' || pathname.startsWith('/blog/')) && item.section === 'blog';
  };
  const currentLocation = (item: NavItem) => isActive(item) ? pathname === '/' ? 'location' as const : 'page' as const : undefined;

  const drawer = (
    <Box className="navigation-bar-responsive" id="mobile-navigation" sx={{ textAlign: 'center' }}>
      <p className="mobile-menu-top"><ListIcon />Menu</p>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: 'center', justifyContent: 'center' }} component={Link} to={item.to} onClick={() => setMobileOpen(false)} selected={isActive(item)} aria-current={currentLocation(item)}>
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
            ref={menuButton}
            color="inherit"
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: 'inline-flex', lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className="nav-brand">Harold Zhong</Link>
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link} to={item.to} onClick={() => setMobileOpen(false)}
                className={`nav-button ${isActive(item) ? 'active' : ''}`}
                aria-current={currentLocation(item)}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            onClick={() => modeChange()}
            aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            sx={{ ml: { lg: 1 } }}
          >
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => { restoreMenuFocus.current = true; setMobileOpen(false); }}
          ModalProps={{
            keepMounted: true,
            disableRestoreFocus: true,
            onTransitionExited: () => {
              if (restoreMenuFocus.current) menuButton.current?.focus();
              restoreMenuFocus.current = false;
            },
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
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
