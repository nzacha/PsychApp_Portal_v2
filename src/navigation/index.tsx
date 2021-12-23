import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import SideBar from './SideBar';
import ToolBar from './ToolBar';
import { Avatar } from '@mui/material';

import ucyIcon from '../media/static/images/ucy.svg'
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useSelectNavBarConfig, useSelectSideBarConfig } from '../redux/staticReducers/commonReducer/selectors';

const drawerWidth = 240;
export const drawerTransitionTime = 1000;

const closed = (theme: Theme, hideOnClose: boolean): CSSObject => ({
  ...(hideOnClose ? {
    width: '0px',
  } : {
    width: `calc(${theme.spacing(7)})`,
  })
})

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
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'movingAppBar',
})<IAppBarProps>(({ theme, open, movingAppBar }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.easeInOut,
    duration: drawerTransitionTime,
  }),
  ...( movingAppBar && open ? {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    } : {
      marginLeft: 0,
      width: '100%',}),
}));

interface IAppDrawerProps{
  hideOnClose: boolean;
}
const Drawer = styled(MuiDrawer, { 
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'hideOnClose' 
})<IAppDrawerProps>(({ theme, open, hideOnClose }) => ({
    // width: drawerWidth,
    overflow: 'hidden',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    alignItems: 'center',
    alignContent: 'center',
    ...(open ? {
      width: drawerWidth,
      // [theme.breakpoints.up('sm')]: {
      //   width: drawerWidth,
      // },
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        // [theme.breakpoints.up('sm')]: {
        //   width: drawerWidth,
        // }
      }
    } : {
      ...closed(theme, hideOnClose),
      '& .MuiDrawer-paper': closed(theme, hideOnClose),
    }),
  }),
);

interface IDrawerProps{
  renderSideBar: boolean;
  renderNavBar: boolean;
  children: React.ReactElement;
}
export default function MiniDrawer(props: IDrawerProps) {
  const {renderSideBar, renderNavBar} = props;
  
  const theme = useTheme();

  const sideBarConfig = useSelectSideBarConfig();
  const {width, height} = useWindowDimensions();
  const hideOnClose = sideBarConfig.hideOnClose || width <= 500 || !renderSideBar ;
  
  const navBarConfig = useSelectNavBarConfig();
  const movingAppBar = !navBarConfig.isStatic;

  const [open, setOpen] = React.useState(false);
  const handleDrawerChange = (val: boolean) => {
    setOpen(val);
  };
  
  return (
    <Box style={{height: '100vh'}}>
      {renderNavBar && (
        <AppBar position="fixed" open={renderNavBar && open} movingAppBar={movingAppBar}>
            <ToolBar isOpen={renderNavBar && open} handleDrawerChange={handleDrawerChange}/>
        </AppBar>
      )}
      {renderSideBar && (
        <Drawer 
          variant="permanent" 
          open={renderSideBar && open}
          hideOnClose={hideOnClose}
          PaperProps = {{
            style: {
              transition: theme.transitions.create(['transform', 'margin', 'height', 'width', 'top', 'left'], {
                easing: theme.transitions.easing.easeInOut,
                duration: drawerTransitionTime,
              }),
            },
          }}       
        >
          <Box style={{
            height: '100%', 
            backgroundColor: theme.palette.action.disabledBackground,
          }}
          >
            {!movingAppBar && <DrawerHeader />}
            <Box style={{
                transition: theme.transitions.create(['height'], {
                  easing: theme.transitions.easing.easeInOut,
                  duration: drawerTransitionTime,
                }),
                ...((!hideOnClose && !open) ? {
                    height: `calc(${theme.spacing(6)} + 1em)`,
                  } : {
                    height: 'calc(180px + 3em)',
                  }),
              }}>
              <Avatar 
                sx={{ 
                  backgroundColor: theme.palette.background.default,
                  boxShadow: theme.shadows[5],
                  transition: theme.transitions.create(['width', 'height', 'margin'], {
                    easing: theme.transitions.easing.easeInOut,
                    duration: drawerTransitionTime,
                  }),
                  ...(!hideOnClose && !open ? { 
                      marginLeft: `${theme.spacing(0.5)}`,
                      marginRight: `${theme.spacing(0.5)}`,
                      marginTop: movingAppBar ? '4em' : '1em', 
                      marginBottom: '0em',
                      width: `${theme.spacing(6)}`,
                      height: `${theme.spacing(6)}`,
                    } : {
                      marginLeft: '30px', 
                      marginRight: '0px', 
                      marginTop: '2em', 
                      marginBottom: '2em', 
                      width: 180, 
                      height: 180,
                    })
                }}
                src={ucyIcon} />
            </Box>
            <SideBar isOpen={renderSideBar && open}/>
          </Box>
        </Drawer>
      )}
      <Box 
        component="main" 
        style={{
          height: `calc(100vh - 64px)`,
          width: `calc(100vw -${(renderSideBar && open) ? `${drawerWidth}px` : 
            hideOnClose ? '0px' : `${theme.spacing(7)}`})`,
          marginLeft: (renderSideBar && open) ? `${drawerWidth}px` : 
            hideOnClose ? '0px' : `${theme.spacing(7)}`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeInOut,
            duration: drawerTransitionTime,
          }),
        }}
      >
        {renderSideBar && (
          <DrawerHeader/>
        )}
        {props.children}
      </Box>
    </Box>
  )
}