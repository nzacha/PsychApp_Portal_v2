import { Box, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import GridLayout from "../../components/common/GridLayout";
import Title from "../../components/common/Title";
import { IFormItem, newFormItem } from "../../config/formItem";
import { HttpMethod } from "../../config/httpMethods";
import { ModelNamesEnum } from "../../config/models";
import { IProjectData } from "../../models/Project";
import { defaultAPIAction } from "../../redux/common/actions";
import { ProjectScheduleDetails } from "./ProjectScheduleDetails";

interface IProjectDetailProps{
    data: IProjectData;
}
export function ProjectDetail(props: IProjectDetailProps){
    const dispatch = useDispatch();
    
    const [description, setDescription] = useState<IFormItem<string>>(newFormItem(props.data.description, false));
    
    return (
        <Paper elevation={5} style={{padding: '1em'}}>
            <Title title={'Project Details'} textAlign={'left'}/>
            <GridLayout elements={[
                {
                    id: 'description',
                    element: <TextField multiline rows={3} label={'Description'} fullWidth value={description.value} onChange={event => {
                        setDescription(newFormItem(event.target.value, true));
                    }} onBlur={event => {
                        defaultAPIAction({
                            path: `/${ModelNamesEnum.Project}/${props.data.project_id}`,
                            method: HttpMethod.PATCH,
                            body:{
                                description: event.target.value
                            },
                            onFinish: (success, res) => {
                                setDescription(newFormItem(event.target.value, false));
                            }
                        })(dispatch, '') 
                    }} style={{marginBottom: '1em'}}/>,
                    lg: 4,
                    md: 6,
                    xs: 12
                },
                {
                    id: 'details',
                    element: (
                        <Box display={'flex'} flexGrow={1} justifyContent={'center'}>
                            <ProjectScheduleDetails data={props.data}/>
                        </Box>
                    ),
                    xs: 12
                }
            ]}/>
        </Paper>
    )
}