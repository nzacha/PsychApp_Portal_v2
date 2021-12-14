import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { drawerTransitionTime } from '.';
import { Select } from '@mui/material';

import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { playTapSound } from '../config/soundPlayer';
import { useGetProjectList, useGetSelectedProject } from '../scenes/MyProjectsPage/store/selectors';
import { defaultAction } from '../redux/common/actions';
import { SET_SELECTED_PROJECT } from '../scenes/MyProjectsPage/store/types';
import { useDispatch } from 'react-redux';

const ToolbarItem = styled('div')(({ theme, style={} }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  [theme.breakpoints.up('sm')]: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(4),
  },
  ...(style),  
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '.MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    width: '100%',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: drawerTransitionTime,
    }),
    [theme.breakpoints.up('sm')]: {
      width: '20em',
    },
  },
}));

interface IProps{
    isOpen: boolean;
    handleDrawerChange: (val: boolean) => void;
}
export default function TopBar(props: IProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const theme = useTheme();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const ExpandSideBarIcon = styled((props: any) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        [theme.breakpoints.up('md')]: {
          marginRight: '2em',
        },
        [theme.breakpoints.down('sm')]: {
          marginRight: '0em',
        },
        transition: theme.transitions.create(['transform'], {
          easing: theme.transitions.easing.easeInOut,
          duration: drawerTransitionTime,
        }),
        transform: !expand ? 'rotate(180deg)' : 'rotate(0deg)',
    }));

  const dispatch = useDispatch();
  const projectList = useGetProjectList();
  const selectedProject = useGetSelectedProject();
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <ExpandSideBarIcon 
              edge={'start'}
              size={'large'}
              color={'inherit'}
              expand={props.isOpen} 
              onClick={() => {
                playTapSound();
                props.handleDrawerChange(!props.isOpen)
              }}>
              <ChevronLeftIcon />
          </ExpandSideBarIcon>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, flex: 1}}
          >
              PsychApp Portal
          </Typography>
          <ToolbarItem 
            sx={{
              display: 'none',
              [theme.breakpoints.down('md')]: {
                display: 'none',
              },
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
            />
          </ToolbarItem>
          {projectList?.data && <ToolbarItem 
            sx={{
              marginRight: `2em`, 
              [theme.breakpoints.down('sm')]: {
                width: '100%',
                marginRight: '0em',
                marginLeft: theme.spacing(2),
              },
            }}
          >
            <SearchIconWrapper>
              <AutoAwesomeMotionIcon />
            </SearchIconWrapper>
            <Select
              value={selectedProject || 0}
              // label="Age"
              inputProps={{border: 'none'}}
              sx={{
                color: 'inherit',
                height: '40px',
                padding: theme.spacing(1, 1, 1, 0),
                width: '100%',
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                paddingRight: `calc(1em + ${theme.spacing(1)})`,
                transition: theme.transitions.create(['width'], {
                  easing: theme.transitions.easing.easeInOut,
                  duration: drawerTransitionTime,
                }),
                [theme.breakpoints.up('md')]: {
                  width: '25ch',
                },
              }}
            >
              {
                projectList?.data?.map((el, index) => (
                  <MenuItem 
                    key={index}
                    value={index}
                    onClick={(event) => {defaultAction({data: index})(dispatch, SET_SELECTED_PROJECT)}}
                  >{el.name}</MenuItem>
                ))
              }
            </Select>
          </ToolbarItem>
          }
          {/* <Box sx={{ display: { xs: 'none', sm: 'flex' } }} /> */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}