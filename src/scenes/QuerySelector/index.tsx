import { Box, Button, Fade, IconButton, Paper, TextField, Typography, useTheme } from "@mui/material";
import GridContainer from "../../components/common/GridContainer";
import DataTable from "../../components/common/DataTable";
import * as Configuration from "./configuration";
import SearchBar from "../../components/common/SearchBar";
import { drawerTransitionTime } from "../../navigation";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import React, { useState } from "react";
import { useGetAnswerList } from "./store/selectors";
import { useDispatch } from "react-redux";
import { defaultAction, defaultAPIAction } from "../../redux/common/actions";
import { ModelNamesEnum } from "../../config/models";
import { HttpMethod } from "../../config/httpMethods";
import { SET_ANSWER_LIST } from "./store/types";
import { IFormItem, newFormItem } from "../../config/formItem";
import { IQuizAnswerData } from "../../models/QuizAnswer";
import DownloadIcon from '@mui/icons-material/Download';
import Title from "../../components/common/Title";

const arrayHeader=["Index", "Date", "Time", "Question", "Answer"];
function downloadQuery(query: IQuizAnswerData[]){
    let delimiter = ",";
    let header = arrayHeader.join(delimiter) + '\n';
    
  	query = query.sort((el1, el2) => el1.answer_id - el2.answer_id);
    let data = [];
    for(var i=0; i<query.length; i++){      
      const answer = query[i];     
      const date = answer?.date ? new Date(answer.date) : new Date();
      const dateString = date.getDate() +"-"+ date.getMonth()+1 +"-"+ date.getFullYear();
      const timeString = date.getHours()+":"+date.getMinutes();
      data.push(['"'+answer.index+'"', '"'+dateString+'"', '"'+timeString+'"', '"'+answer.quiz_question.question+'"', '"'+answer.answer+'"']);      
    }   

    let csv = header;
    data.forEach( array => {
        csv += array.join(delimiter)+"\n";
    });    

    // var encoded = new TextEncoder("windows-1252",{ NONSTANDARD_allowLegacyEncoding: true }).encode(csv);

    //download encoded
    const donwloadLink = document.createElement('a');
    donwloadLink.href = "data:text/csv;charset=utf-8,%EF%BB%BF"+encodeURIComponent(csv);
    donwloadLink.setAttribute('download', "user_" + query[0].project_participant.authentication_code + "_answers.csv");
    document.body.appendChild(donwloadLink);
    donwloadLink.click();
    document.body.removeChild(donwloadLink);
    
    /*
    //download utf-8 csv
    csvData = new Blob([csv], {type: 'text/csv'}); 
    url = window.URL.createObjectURL(csvData);
    document.getElementById('download').href = url;
    document.getElementById('download').setAttribute('download', "user_"+document.getElementById("user_id_value").innerHTML+"_answers.csv");
    document.getElementById('download').click();
    */
}

const DownloadQueryButton = (props: {data: IQuizAnswerData[]}) => {
    return (
        <IconButton onClick={event => {
            if(props.data) downloadQuery(props.data);
        }}>
            <DownloadIcon/>
        </IconButton>
    )
}

const QuerySelector = React.memo(() => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const answerList = useGetAnswerList();

    const [participantCode, setParticipantCode] = useState<IFormItem<string>>(newFormItem('', false));
    React.useEffect(() => {
        if(participantCode.hasChanged && participantCode.value.length > 0)
            defaultAPIAction({
                path: `/${ModelNamesEnum.Quiz_Answer}/list/${participantCode.value}`,
                method: HttpMethod.GET,
            })(dispatch, SET_ANSWER_LIST)

        return () => {
            defaultAction({data: null})(dispatch, SET_ANSWER_LIST);
        }
    }, [dispatch, participantCode])

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
            <Box style={{display: 'flex', marginTop: '1em', marginBottom: '2em', justifyContent: 'center', alignItems: 'center'}}>
                <TextField 
                    label={'code'} 
                    value={participantCode.value} 
                    onChange={(event) => {
                        if(event.currentTarget.value !== participantCode.value)
                            setParticipantCode(newFormItem(event.currentTarget.value, false));
                    }}
                    onBlur={(event) => {
                        setParticipantCode(newFormItem(participantCode.value, true));
                    }}
                />
            </Box>
            <Box display={'flex'} justifyContent={'flex-end'}>
                {participantCode.hasChanged && (<>{answerList.data?.length || 0} answers found</>)}
            </Box>
            <Box display={answerList?.data?.length && answerList.data.length > 0 ? 'flex' : 'none'} justifyContent={'flex-end'}>
                <DownloadQueryButton data={answerList.data || []}/>
                <Title title={'download CSV'}/>
            </Box>
            <DataTable data={answerList.data || []} columns={Configuration.columns}/>
        </Paper>
        </Fade>
    )
})
        
export default QuerySelector;