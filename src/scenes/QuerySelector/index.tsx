import { Fade, Paper, Typography, useTheme } from "@mui/material";
import GridContainer from "../../components/common/GridContainer";
import DataTable from "../../components/common/DataTable";
import * as Configuration from "./configuration";
import SearchBar from "../../components/common/SearchBar";
import { drawerTransitionTime } from "../../navigation";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import React from "react";

const QuerySelector = React.memo(() => {
    const theme = useTheme();
    
    return (
        <Fade in={true} timeout={drawerTransitionTime}>
        <Paper variant={'elevation'} elevation={5} style={{textAlign: 'center', padding: '1em', margin: '1em', backgroundColor: theme.palette.grey[200]}} >
            <Typography variant='h4' paragraph style={{display: 'inline-flex'}}>
                <ManageSearchIcon fontSize={'large'} style={{marginRight: '0.5em'}}/> 
                Query Selector
            </Typography>
            <Typography variant='h6' paragraph>Here, you can view quiz answers</Typography>   <GridContainer lg={4} md={6} xs={12} justify={'flex-end'}>
                <SearchBar/>
            </GridContainer>
            <DataTable data={[]} columns={Configuration.columns}/>
        </Paper>
        </Fade>
    )
})
        
export default QuerySelector;