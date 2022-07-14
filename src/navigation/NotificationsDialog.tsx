import {
    Backdrop,
    Badge,
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Popover,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { HttpMethod } from '../config/httpMethods';
import { ModelNamesEnum } from '../config/models';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { IAlertData } from '../models/Alert';
import { defaultAction, defaultAPIAction } from '../store/common/actions';
import { UPDATE_NOTIFICATION_DETAIL } from '../store/staticReducers/authReducer/types';

interface INotificationListItemProps {
    notification: IAlertData;
}
function NoficationListItem({ notification }: INotificationListItemProps) {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    let bgColor = undefined;
    if (open) {
        bgColor = theme.palette.action.hover;
    } else if (notification.is_read) {
        bgColor = theme.palette.action.disabledBackground;
    }
    return (
        <ListItem disablePadding style={{ marginBottom: '0.2em', width: '100%' }}>
            <ListItemButton
                sx={{
                    borderRadius: 2,
                    background: bgColor,
                    width: '100%',
                }}
                onClick={() => {
                    // console.log(notification);
                    if (!notification.is_read) {
                        defaultAPIAction({
                            path: `/${ModelNamesEnum.Alert}/${notification.alert_id}`,
                            method: HttpMethod.PATCH,
                            body: { is_read: true },
                            onFinish: (suc, res) => {
                                if (suc) {
                                    defaultAction({ data: res.data.response })(dispatch, UPDATE_NOTIFICATION_DETAIL);
                                }
                            },
                        })(dispatch);
                    }
                    setOpen(!open);
                }}
            >
                {/* <ListItemIcon>
                </ListItemIcon> */}
                <Badge
                    badgeContent={'new !'}
                    color={'error'}
                    invisible={notification.is_read}
                    style={{ width: '100%' }}
                >
                    <Stack direction={'column'} style={{ width: '100%' }}>
                        <ListItemText primary={notification.title} secondary={notification.description} />
                        <Collapse in={open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
                            <Box
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Typography paragraph>{notification.message}</Typography>
                            </Box>
                        </Collapse>
                    </Stack>
                </Badge>
            </ListItemButton>
        </ListItem>
    );
}

interface INotificationsDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    anchorEl?: Element;
    notifications: IAlertData[];
}
export function NotificationsDialog({ open, setOpen, anchorEl, notifications }: INotificationsDialogProps) {
    const theme = useTheme();
    const dimensions = useWindowDimensions();

    return (
        <Backdrop open={open}>
            <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 5,
                        [theme.breakpoints.only('xs')]: {
                            width: dimensions.windowWidth,
                        },
                    },
                }}
            >
                <Card
                    style={{ background: theme.palette.grey[50] }}
                    sx={{
                        [theme.breakpoints.up('xs')]: {
                            maxWidth: 'sm',
                            width: '400px',
                        },
                        [theme.breakpoints.only('xs')]: { width: '100%' },
                    }}
                >
                    {/* sx={{borderRadius: 5, border: 4, borderColor: theme.palette.primary.main}}  */}
                    <CardHeader title={<Typography variant={'h5'}>Notifications</Typography>} />
                    <CardContent>
                        <Divider />
                        <List
                            dense
                            // subheader={notifications.length + ' notifications'}
                        >
                            {notifications.map((el, index) => (
                                <NoficationListItem key={index} notification={el} />
                            ))}
                        </List>
                        <Divider />
                    </CardContent>
                    <CardActions>
                        <Box display={'flex'} flex={1}>
                            <Box display={'flex'} flex={1} />
                            <Typography variant={'caption'}>{notifications.length + ' notifications'}</Typography>
                        </Box>
                    </CardActions>
                </Card>
            </Popover>
        </Backdrop>
    );
}
