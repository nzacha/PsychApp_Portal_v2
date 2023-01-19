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
import { Icon, Select, Tooltip } from '@mui/material';

import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { playTapSound } from '../config/soundPlayer';
import { useGetProjectList, useGetSelectedProjectID } from '../scenes/MyProjectsPage/store/selectors';
import { defaultAction } from '../store/common/actions';
import { SET_SELECTED_PROJECT } from '../scenes/MyProjectsPage/store/types';
import { useDispatch } from 'react-redux';
import { useSelectAuthData, useSelectNotificationData } from '../store/staticReducers/authReducer/selectors';
import { NotificationsDialog } from './NotificationsDialog';
import useWindowDimensions from '../hooks/useWindowDimensions';

const ToolbarItem = styled('div')(({ theme, style = {} }) => ({
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
    ...style,
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

interface IProps {
    isOpen: boolean;
    handleDrawerChange: (val: boolean) => void;
}
export default function TopBar(props: IProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const theme = useTheme();

    const notifications = useSelectNotificationData();
    const [notificationsOpen, setNotificationsOpen] = React.useState(false);
    const notificationsAnchorEl = React.useRef<any>(null);

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
            <MenuItem
                disabled
                ref={notificationsAnchorEl}
                onClick={() => {
                    setNotificationsOpen(true);
                    handleMobileMenuClose();
                }}
            >
                <IconButton>
                    <Badge badgeContent={(notifications.data || []).filter((el) => !el.is_read).length} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Typography>Notifications</Typography>
            </MenuItem>
            <MenuItem disabled>
                <IconButton disabled size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem disabled onClick={handleProfileMenuOpen}>
                <IconButton
                    disabled
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
    const { isSmallScreen } = useWindowDimensions();

    const projectList = useGetProjectList();
    const selectedProject = useGetSelectedProjectID();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <NotificationsDialog
                anchorEl={notificationsAnchorEl.current}
                open={notificationsOpen}
                setOpen={setNotificationsOpen}
                notifications={notifications.data || []}
            />
            <AppBar position="static" style={{ height: '100%' }}>
                <Toolbar style={{ height: '100%' }}>
                    <ExpandSideBarIcon
                        edge={'start'}
                        size={'large'}
                        color={'inherit'}
                        expand={props.isOpen}
                        onClick={() => {
                            playTapSound();
                            props.handleDrawerChange(!props.isOpen);
                        }}
                    >
                        <ChevronLeftIcon />
                    </ExpandSideBarIcon>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' }, flex: 1 }}
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
                        <StyledInputBase placeholder="Search…" />
                    </ToolbarItem>
                    {selectedProject && projectList?.data && (
                        <ToolbarItem
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
                                value={selectedProject}
                                // label="Age"
                                inputProps={{ border: 'none' }}
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
                                {projectList?.data?.map((el, index) => (
                                    <MenuItem
                                        key={index}
                                        value={el.project_id}
                                        onClick={(event) => {
                                            defaultAction({
                                                data: el.project_id,
                                            })(dispatch, SET_SELECTED_PROJECT);
                                        }}
                                    >
                                        {el.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </ToolbarItem>
                    )}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Tooltip title={'Notifications'}>
                            <span>
                                <IconButton
                                    disabled
                                    size="large"
                                    color="inherit"
                                    onClick={() => setNotificationsOpen(true)}
                                    ref={notificationsAnchorEl}
                                >
                                    <Badge
                                        badgeContent={(notifications.data || []).filter((el) => !el.is_read).length}
                                        color="error"
                                    >
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title={'Messages'}>
                            <span>
                                <IconButton size="large" color="inherit" disabled>
                                    <Badge badgeContent={''} invisible={true} color="error">
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title={'currently unavailable'}>
                            <span>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                    disabled
                                >
                                    <AccountCircle />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" onClick={handleMobileMenuOpen} color="inherit">
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
