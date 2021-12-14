import { Paper, TextField } from "@mui/material";
import GridLayout from "../../components/common/GridLayout";
import Title from "../../components/common/Title";
import { IProjectData } from "../../models/Project";

interface IProjectDetailProps{
    data: IProjectData;
}
export function ProjectProjectDetail(props: IProjectDetailProps){
    return (
        <Paper elevation={5} style={{padding: '1em'}}>
            <Title title={'Project Details'} textAlign={'left'}/>
            <GridLayout elements={[
                {
                    id: 'description',
                    element: <TextField label={'Description'} fullWidth/>
                }
            ]}/>
        </Paper>
    )
}