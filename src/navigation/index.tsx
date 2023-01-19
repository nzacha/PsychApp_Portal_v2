import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import SideBar from './SideBar';
import ToolBar from './ToolBar';
import { Avatar, Backdrop, ClickAwayListener, Fade } from '@mui/material';

import ucyIcon from '../media/static/images/ucy.svg';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useSelectNavBarConfig, useSelectSideBarConfig } from '../store/staticReducers/commonReducer/selectors';
import _ from 'lodash';

const drawerWidth = 240;
export const drawerTransitionTime = 1000;

const closed = (theme: Theme, hideOnClose: boolean): CSSObject => ({
    ...(hideOnClose
        ? {
              width: '0px',
          }
        : {
              width: `calc(${theme.spacing(8)})`,
          }),
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface IAppBarProps extends MuiAppBarProps {
    open: boolean;
    movingAppBar: boolean;
    hideOnClose: boolean;
}
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'movingAppBar' && prop !== 'hideOnClose',
})<IAppBarProps>(({ theme, open, movingAppBar, hideOnClose }) => ({
    zIndex: -1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.easeInOut,
        duration: drawerTransitionTime,
    }),
    height: theme.spacing(8),
    ...(movingAppBar && open
        ? {
              marginLeft: drawerWidth,
              width: `calc(100% - ${drawerWidth}px)`,
          }
        : hideOnClose
        ? {
              marginLeft: 0,
              width: '100%',
          }
        : {
              marginLeft: theme.spacing(8),
              width: `calc(100% - ${theme.spacing(8)})`,
          }),
}));

interface IAppDrawerProps {
    hideOnClose: boolean;
}
const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'hideOnClose',
})<IAppDrawerProps>(({ theme, open, hideOnClose }) => ({
    overflow: 'hidden',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    alignItems: 'center',
    alignContent: 'center',
    transition: theme.transitions.create(['transform', 'margin', 'height', 'width', 'top', 'left'], {
        easing: theme.transitions.easing.easeInOut,
        duration: drawerTransitionTime,
    }),
    ...(open
        ? {
              width: drawerWidth,
              '& .MuiDrawer-paper': {
                  width: drawerWidth,
              },
          }
        : {
              ...closed(theme, hideOnClose),
              '& .MuiDrawer-paper': closed(theme, hideOnClose),
          }),
}));

export type DrawerType = 'grow' | 'layer';
interface IDrawerProps {
    renderSideBar: boolean;
    renderNavBar: boolean;
    children: React.ReactElement;
}
export default function MiniDrawer({ renderSideBar, renderNavBar, children }: IDrawerProps) {
    const theme = useTheme();

    const sideBarConfig = useSelectSideBarConfig();
    const { windowWidth, windowHeight, isSmallScreen } = useWindowDimensions();

    const hideOnClose = sideBarConfig.hideOnClose || isSmallScreen;
    const shouldGrow = !isSmallScreen;

    const navBarConfig = useSelectNavBarConfig();
    const movingAppBar = !navBarConfig.isStatic;

    const [_open, _setOpen] = React.useState(false);
    const open = _open && renderSideBar;
    const handleOpenChange = _.debounce((val) => _setOpen(val), 20);

    return (
        <Box style={{ height: '100%' }}>
            {renderNavBar && (
                <AppBar
                    position="static"
                    open={renderNavBar && open}
                    movingAppBar={movingAppBar && !isSmallScreen}
                    hideOnClose={hideOnClose}
                >
                    <ToolBar isOpen={renderNavBar && open} handleDrawerChange={(val) => handleOpenChange(val)} />
                </AppBar>
            )}
            {renderSideBar && (
                <Drawer
                    variant={'permanent'}
                    open={renderSideBar && open}
                    hideOnClose={hideOnClose}
                    onClose={() => handleOpenChange(false)}
                    PaperProps={{
                        style: {
                            transition: theme.transitions.create(
                                ['transform', 'margin', 'height', 'width', 'top', 'left'],
                                {
                                    easing: theme.transitions.easing.easeInOut,
                                    duration: drawerTransitionTime,
                                }
                            ),
                        },
                    }}
                >
                    <ClickAwayListener
                        onClickAway={() => {
                            if (open && isSmallScreen) {
                                handleOpenChange(false);
                            }
                        }}
                    >
                        <Box
                            style={{
                                flexGrow: 1,
                                backgroundColor: theme.palette.action.disabledBackground,
                            }}
                        >
                            {(hideOnClose || !movingAppBar) && <DrawerHeader />}
                            <Box
                                style={{
                                    transition: theme.transitions.create(['height'], {
                                        easing: theme.transitions.easing.easeInOut,
                                        duration: drawerTransitionTime,
                                    }),
                                    ...(!hideOnClose && !open
                                        ? {
                                              height: `calc(${theme.spacing(8)} + 1em)`,
                                          }
                                        : {
                                              height: 'calc(180px + 3em)',
                                          }),
                                }}
                            >
                                <Avatar
                                    sx={{
                                        backgroundColor: theme.palette.background.default,
                                        boxShadow: theme.shadows[5],
                                        transition: theme.transitions.create(['width', 'height', 'margin'], {
                                            easing: theme.transitions.easing.easeInOut,
                                            duration: drawerTransitionTime,
                                        }),
                                        ...(!hideOnClose && !open
                                            ? {
                                                  marginLeft: `${theme.spacing(0.5)}`,
                                                  marginRight: `${theme.spacing(0.5)}`,
                                                  marginTop: movingAppBar ? '4em' : '1em',
                                                  marginBottom: '0em',
                                                  width: `${theme.spacing(6)}`,
                                                  height: `${theme.spacing(6)}`,
                                              }
                                            : {
                                                  marginLeft: '30px',
                                                  marginRight: '0px',
                                                  marginTop: '2em',
                                                  marginBottom: '2em',
                                                  width: 180,
                                                  height: 180,
                                              }),
                                    }}
                                    src={ucyIcon}
                                />
                            </Box>
                            <SideBar isOpen={renderSideBar && open} />
                        </Box>
                    </ClickAwayListener>
                </Drawer>
            )}
            <Box
                style={{
                    height: `calc(100% - ${theme.spacing(8)}})`,
                    width: `calc(100vw -${
                        renderSideBar && open ? `${drawerWidth}px` : hideOnClose ? '0px' : `${theme.spacing(8)}`
                    })`,
                    marginLeft:
                        renderSideBar && open && shouldGrow
                            ? `${drawerWidth}px`
                            : hideOnClose
                            ? '0px'
                            : `${theme.spacing(8)}`,
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.easeInOut,
                        duration: drawerTransitionTime,
                    }),
                }}
            >
                <Backdrop
                    open={isSmallScreen && open}
                    onClick={() => handleOpenChange(false)}
                    transitionDuration={drawerTransitionTime}
                />
                <Box alignItems={'center'}>{children}</Box>
            </Box>
        </Box>
    );
}
