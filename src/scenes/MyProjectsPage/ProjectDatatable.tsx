import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, useTheme} from '@mui/material';

import { grey } from '@mui/material/colors';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IProjectData } from '../../models/Project';
import { ExpandMoreWrapper } from '../../components/common/ExpandMore';
import { useGetSelectedProject } from './store/selectors';
import { useDispatch } from 'react-redux';
import { defaultAction, defaultAPIAction } from '../../redux/common/actions';
import { SET_SELECTED_PROJECT, UPDATE_PROJECT } from './store/types';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Title from '../../components/common/Title';
import { ProjectProjectDetail } from './ProjectDetails';
import { ModelNamesEnum } from '../../config/models';
import { HttpMethod } from '../../config/httpMethods';

interface IProjectProps{
    index: number;
    data: IProjectData;
    selectedProject: number;
    setSelectedProject: React.Dispatch<any>;
}
function Project(props: IProjectProps){
    const { index, data } = props;
    const dispatch = useDispatch();
    const theme = useTheme();

    const [isOpen, setOpen] = React.useState(false)
    const selectedProject = useGetSelectedProject();

    return (
        <Card style={{flexGrow: 1}}>
            {/* backgroundColor: selectedProject == index ? theme.palette.primary.light : undefined */}
            <CardHeader
                style={{flexGrow: 1}}
                avatar={
                    <Box flexDirection={'row'} style={{display: 'flex', alignItems: 'center'}}>
                        <Avatar 
                            // eslint-disable-next-line eqeqeq
                            style={{display: 'flex-inline', width: '56px', height: '56px', backgroundColor: selectedProject == index ? theme.palette.primary.light : grey[300]}}>
                            <IconButton onClick={(event) => defaultAction({data: index})(dispatch, SET_SELECTED_PROJECT)}>
                                <DoubleArrowIcon/>
                            </IconButton>
                        </Avatar>
                    </Box>
                }
                action={
                    <>
                        {/* <IconButton onClick={(event) => event.stopPropagation()}>
                            <MoreVertIcon />
                        </IconButton> */}
                    </>
                }
                title={
                    <Box flexGrow={1} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Title 
                            title={data.name} 
                            variant={'h5'} 
                            style={{display: 'inline-flex'}} 
                            contentEditable={true} 
                            onBlur={(event) => {
                                defaultAPIAction({
                                    path: `/${ModelNamesEnum.Project}/${data.project_id}`,
                                    method: HttpMethod.PATCH,
                                    body: {
                                        name: event.target.innerHTML
                                    },
                                })(dispatch, UPDATE_PROJECT)    
                            }}/>
                        <ExpandMoreWrapper
                            expand={isOpen}
                            onClick={(event) => {
                                setOpen(!isOpen)
                                event.stopPropagation()
                            }}
                            style={{marginLeft: '1em'}}
                        >
                            <ExpandMoreIcon />
                        </ExpandMoreWrapper>
                    </Box>
                }
                // subheader={data.description}
            />
            <CardActions disableSpacing>
                {/* <IconButton onClick={(event)=>{
                }}>
                    <PostAddIcon/>
                </IconButton> */}
            </CardActions>
            <Collapse in={isOpen} timeout="auto" unmountOnExit={false}>
                <CardContent>
                    <ProjectProjectDetail data={data}/>
                </CardContent>
            </Collapse>
        </Card>
    )
}

interface IProjectDatatableProps{
    data: IProjectData[];
}
export default function ProjectDatatable(props: IProjectDatatableProps) {
    const [selectedProject, setSelectedProject] = React.useState(0);

    return (
    <Box>
        {props.data.map((project, projectIndex)=>(
            <Paper key={projectIndex} variant={'elevation'} elevation={3} style={{flexGrow: 1, marginBottom: '1em'}}>
                <Project index={projectIndex} data={project} selectedProject={selectedProject} setSelectedProject={setSelectedProject}/>
            </Paper>
        ))}
    </Box>
  );
}