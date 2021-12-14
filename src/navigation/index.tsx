import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import SideBar from './SideBar';
import ToolBar from './ToolBar';
import { Avatar } from '@mui/material';

import ucyIcon from '../media/static/images/ucy.svg'

const drawerWidth = 240;
export const drawerTransitionTime = 1000;
export const hideOnClose = false;
export const movingAppBar = true;

const closed = (theme: Theme): CSSObject => ({
  ...(hideOnClose ? {
    width: '0px',
    // [theme.breakpoints.up('sm')]: {
    //   width: '0px'
    // }
  } : {
    width: `calc(${theme.spacing(7)})`,
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(${theme.spacing(9)} + 1px)`
    // }
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
      ...closed(theme),
      '& .MuiDrawer-paper': closed(theme),
    }),
  }),
);

interface IDrawerProps{
  renderSiderBar: boolean;
  renderNavBar: boolean;
  children: React.ReactElement;
}
export default function MiniDrawer(props: IDrawerProps) {
  const {renderSiderBar, renderNavBar} = props;

  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleDrawerChange = (val: boolean) => {
    setOpen(val);
  };
  
  return (
    <Box style={{height: '100vh'}}>
      {renderNavBar && (
        <AppBar position="fixed" open={renderNavBar && open}>
            <ToolBar isOpen={renderNavBar && open} handleDrawerChange={handleDrawerChange}/>
        </AppBar>
      )}
      {renderSiderBar && (
        <Drawer 
          variant="permanent" 
          open={renderSiderBar && open}
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
            <SideBar isOpen={renderSiderBar && open}/>
          </Box>
        </Drawer>
      )}
      <Box 
        component="main" 
        style={{
          height: `calc(100vh - 64px)`,
          width: `calc(100vw -${(renderSiderBar && open) ? `${drawerWidth}px` : 
            hideOnClose ? '0px' : `${theme.spacing(7)}`})`,
          marginLeft: (renderSiderBar && open) ? `${drawerWidth}px` : 
            hideOnClose ? '0px' : `${theme.spacing(7)}`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeInOut,
            duration: drawerTransitionTime,
          }),
        }}
      >
        {renderSiderBar && (
          <DrawerHeader/>
        )}
        {props.children}
      </Box>
    </Box>
  )
}