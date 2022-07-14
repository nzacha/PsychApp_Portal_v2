import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
} from '@mui/material';

import { IProjectData } from '../../models/Project';
import Title from '../../components/common/Title';
import GridContainer from '../../components/common/GridContainer';
import { IUserData } from '../../models/Users';
import { useGetUserList } from '../UserManager/store/selectors';
import { ActionStatus, defaultAPIAction } from '../../store/common/actions';
import { ModelNamesEnum } from '../../config/models';
import { HttpMethod } from '../../config/httpMethods';
import { useDispatch } from 'react-redux';

import { UPDATE_PROJECT_USER_LINKS } from './store/types';
import { useGetProjectUserLinks } from './store/selectors';
import { IProjectUserLinkData } from '../../models/ProjectUserLink';

interface IProjectProps {
    data: IProjectData;
}
const Project = React.memo((props: IProjectProps) => {
    const { data } = props;
    const dispatch = useDispatch<any>();
    // const theme = useTheme();

    const userList = useGetUserList();
    const users: IUserData[] = userList.data || [];
    const projectUserLinks = useGetProjectUserLinks();
    const [selected, setSelected] = React.useState<number[]>([]);

    React.useEffect(() => {
        if (
            userList.status === ActionStatus.Success &&
            projectUserLinks.status === ActionStatus.Success
        ) {
            const temp: number[] = [];
            // eslint-disable-next-line array-callback-return
            projectUserLinks?.data?.map((el) => {
                if (el.project_id === data.project_id) temp.push(el.user_id);
            });

            const newUsers: number[] = [];
            // eslint-disable-next-line array-callback-return
            temp.map((el) => {
                // eslint-disable-next-line array-callback-return
                users.find((user, index) => {
                    if (user.user_id === el) newUsers.push(index);
                });
            });
            setSelected(newUsers);
        }
        // eslint-disable-next-line
    }, [userList, projectUserLinks]);

    return (
        <Card>
            <CardHeader
                title={
                    <Title
                        title={data.name}
                        variant={'h5'}
                        style={{ display: 'inline-flex' }}
                    />
                }
                subheader={data.description}
            />
            <CardActions disableSpacing>
                {/* <IconButton onClick={(event)=>{
                }}>
                    <PostAddIcon/>
                </IconButton>
                <IconButton onClick={(event)=>{
                }}>
                    <PostAddIcon/>
                </IconButton> */}
            </CardActions>
            <CardContent>
                <GridContainer>
                    <FormControl style={{ margin: 1, minWidth: 200 }}>
                        <InputLabel shrink>Managers</InputLabel>
                        <Select
                            multiple
                            value={selected}
                            onChange={(event) => {
                                const newValues = event.target
                                    .value as any as number[];
                                setSelected(newValues);
                            }}
                            input={<OutlinedInput label="Managers" />}
                            renderValue={(selected) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 0.5,
                                    }}
                                >
                                    {selected.map((userIndex) => {
                                        const user = users[userIndex];
                                        return (
                                            <Chip
                                                key={userIndex}
                                                label={`${user?.first_name} ${user?.last_name}`}
                                            />
                                        );
                                    })}
                                </Box>
                            )}
                            onBlur={(event) => {
                                let newLinks: IProjectUserLinkData[] = [];
                                // eslint-disable-next-line array-callback-return
                                for (let el of selected) {
                                    newLinks.push({
                                        project_id: data.project_id,
                                        user_id: users[el].user_id,
                                        can_edit: true,
                                    });
                                }

                                defaultAPIAction({
                                    path: `/${ModelNamesEnum.Project_User_Link}/update/by_project/${data.project_id}`,
                                    method: HttpMethod.POST,
                                    body: newLinks,
                                })(dispatch, UPDATE_PROJECT_USER_LINKS);
                            }}
                        >
                            {users.map((user, index) => (
                                <MenuItem key={user.user_id} value={index}>
                                    {`${user.email}- ${user.first_name} ${user.last_name}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </GridContainer>
            </CardContent>
        </Card>
    );
});

interface IProjectDatatableProps {
    data: IProjectData[];
}
function ProjectDatatable(props: IProjectDatatableProps) {
    return (
        <Box>
            {props.data.map((project, projectIndex) => (
                <Paper
                    key={project.project_id}
                    variant={'elevation'}
                    elevation={3}
                    style={{ flexGrow: 1, marginBottom: '1em' }}
                >
                    <Project data={project} />
                </Paper>
            ))}
        </Box>
    );
}

export default React.memo(ProjectDatatable);
