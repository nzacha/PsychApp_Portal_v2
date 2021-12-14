import { Box, List, ListItemIcon, ListItem, ListItemText, Divider, useTheme, Collapse, ListItemButton, Fade } from "@mui/material"
import { useHistory } from "react-router-dom";

import QueryIcon from '@mui/icons-material/QueryStats';
import PeopleIcon from '@mui/icons-material/People';
import QuizIcon from '@mui/icons-material/Quiz';
import ProjectIcon from '@mui/icons-material/AccountTree';
import AccountIcon from '@mui/icons-material/AccountCircle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

import _ from 'lodash';
import { useState } from "react";
import React from "react";
import { drawerTransitionTime, hideOnClose } from ".";
import { playTapSound } from "../config/soundPlayer";

interface ISideMenuItem{
    id: number;
    label: string;
    pagePath: string;
    icon: JSX.Element;
    subItems?: ISideMenuItem[]; 
}

const sideBarItems: ISideMenuItem[][] = [
    [
        {
            id: 1,
            label: 'Query',
            pagePath: 'querySelector',
            icon: <QueryIcon/>
        },{
            id: 8,
            label: 'Participants',
            pagePath: 'participationManagement',
            icon: <PeopleIcon/>,
        },{
            id: 3,
            label: 'Quiz',
            pagePath: 'quiz',
            icon: <QuizIcon/>
        },{
            id: 4,
            label: 'My Projects',
            pagePath: 'myProjects',
            icon: <ProjectIcon/>
        },
    ],[ {
            id: 2,
            label: 'Administration',
            pagePath: 'userManagement',
            icon: <PeopleIcon/>,
            subItems: [{
                id: 9,
                label: 'User Management',
                pagePath: 'userManagement',
                icon: <></>,
            }, {
                id: 10,
                label: 'All Projects',
                pagePath: 'projectManagement',
                icon: <ProjectIcon/>
            },]
        },
        {   
            id: 5,
            label: 'Account',
            pagePath: 'account',
            icon: <AccountIcon/>,
            subItems: [{
                id: 6,
                label: 'Profile',
                pagePath: 'account',
                icon: <></>,
            },{
                id: 11,
                label: 'Settings',
                pagePath: 'settings',
                icon: <SettingsIcon/>,
            },{
                id: 7,
                label: 'Log Out',
                pagePath: 'login',
                icon: <LogoutIcon/>,
            }]
        },
    ]
]

interface IMenuItemProps{
    listItem: ISideMenuItem;
    isOpen: boolean;
    menuStates: {};
    alterState: (id: number) => void;
    renderIcon?: boolean;
}

function MenuItem(props: IMenuItemProps){
    const {listItem, alterState, menuStates, renderIcon = true} = props;
    const history = useHistory();
    const theme = useTheme();

    return (
    <ListItem 
        button 
        onClick={(event) => {
            playTapSound();
            (listItem?.subItems && props.isOpen)
                ? alterState(listItem.id)
                : history.push(listItem.pagePath)
        }}
        style={{
            paddingRight: '0em', 
            marginBottom: '0.5em', 
            marginTop: '0.5em',
            transition: theme.transitions.create('padding', {
                easing: theme.transitions.easing.easeInOut,
                duration: drawerTransitionTime,
            }),                                        
            ...(!hideOnClose && !props.isOpen
                ? {
                    paddingLeft: '1em',
                }: {
                    paddingLeft: '2em', 
                }
            )
        }}
    >
        {renderIcon && <ListItemIcon>
            {listItem.icon}
        </ListItemIcon>}
        <Box
            style={{
                display: 'flex',
                flexGrow: 1,
                transition: theme.transitions.create('opacity', {
                    easing: theme.transitions.easing.easeInOut,
                    duration: drawerTransitionTime,
                }),
                ...(props.isOpen ? {
                    opacity: 1,
                }: {
                    opacity: 0,
                })                
            }}
        >
            <ListItemText primary={listItem.label} />
            {listItem?.subItems && (
                <Box flexGrow={1}>
                    {_.get(menuStates, listItem.id) ? <ExpandMore /> : <ExpandLess />}
                </Box>
            )}
        </Box>
    </ListItem>
    )
}

interface IMenuSubItemProps extends Omit<IMenuItemProps, 'listItem'>{
    subItem: ISideMenuItem;
}

function MenuSubItem(props: IMenuSubItemProps){
    const {subItem, renderIcon = true} = props;
    const history = useHistory();
    const theme = useTheme();

    return (
        <Box
            style={{
                display: 'flex',
                flexGrow: 1,
                transition: theme.transitions.create('opacity', {
                    easing: theme.transitions.easing.easeInOut,
                    duration: drawerTransitionTime,
                }),
                ...(props.isOpen ? {
                    opacity: 1,
                }: {
                    opacity: 0,
                })                
            }}
        >
            <ListItemButton 
                style={{ 
                    boxSizing: 'border-box',
                    paddingLeft: '4em',
                }}
                onClick={(event) => {
                    playTapSound();
                    history.push(subItem.pagePath);
                }}
            >
                <ListItemText 
                    primary={subItem.label} 
                    style={{    
                        overflow: 'hidden',
                    }}
                />
                {renderIcon && (
                    <ListItemIcon >
                        {subItem.icon}
                    </ListItemIcon>)}
            </ListItemButton>
        </Box>
    )
}

interface IProps{
    isOpen: boolean;
}
export default function SideBar(props: IProps){
    const theme = useTheme();
    // console.log(theme);
  
    const [menuStates, setMenuStates] = useState<{}>({});
    React.useEffect(()=>{
        const states = {};
        sideBarItems.map(section => 
            section.map(val => {
                if(val?.subItems?.length) {
                    _.set(states, val.id, 'false');
                }
                return val;
            })
        )
        setMenuStates(states);
    }, []);
    
    // React.useEffect(()=>{console.log(menuStates)}, [menuStates])
    function alterState(id: number){
        const state = JSON.parse(JSON.stringify(menuStates));
        _.set(state, id, !_.get(state, id));
        setMenuStates(state);
    }
    return(
        <List style={{
            backgroundColor: theme.palette.background.paper,
            overflow: 'hidden',
        }}>
            <Divider/>
            {sideBarItems.map((sections, sectionIndex) => {
                return (
                    <Box key={sectionIndex}>
                        {sections.map((listItem, listItemIndex) => {
                            return (
                                <Box key={sectionIndex+'_'+listItemIndex}>
                                    <MenuItem 
                                        listItem={listItem} 
                                        isOpen={props.isOpen} 
                                        menuStates={menuStates} 
                                        alterState={alterState} 
                                    />  
                                    {listItem?.subItems && (
                                        <Collapse in={!_.get(menuStates, listItem.id) && props.isOpen} timeout={drawerTransitionTime/2} unmountOnExit>
                                            <Fade in={!_.get(menuStates, listItem.id) && props.isOpen} timeout={drawerTransitionTime}>
                                            <List component="div" disablePadding>
                                                {listItem.subItems.map((subItem, subItemIndex) => {
                                                    return(
                                                        <MenuSubItem
                                                            key={subItemIndex}
                                                            subItem={subItem} 
                                                            isOpen={props.isOpen} 
                                                            menuStates={menuStates} 
                                                            alterState={alterState} 
                                                        />
                                                    )}
                                                )}
                                            </List>
                                            </Fade>
                                        </Collapse>
                                    )}
                                </Box>
                            )    
                        })}
                        <Divider/>
                    </Box>
                )
            })}
        </List>
    )
}