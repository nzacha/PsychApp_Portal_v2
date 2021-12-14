import React, { Dispatch } from "react";

import { Box, Fade, Paper, Typography, useTheme } from "@mui/material";
import { drawerTransitionTime } from "../../navigation";
import QuizDatatable from "./QuizDatatable";

import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import { useGetQuizList } from "./store/selectors";
import { defaultAPIAction } from "../../redux/common/actions";

import { useDispatch } from "react-redux";
import { SET_QUIZ_LIST, UPDATE_QUIZ_DETAIL } from "./store/types";
import { ModelNamesEnum } from "../../config/models";
import { HttpMethod } from "../../config/httpMethods";
import Title from '../../components/common/Title';

const refreshQuizList= (dispatch: Dispatch<any>) => {
  defaultAPIAction({
    path: `/${ModelNamesEnum.Quiz}/list/${1}`,
    method: HttpMethod.GET,
  })(dispatch, SET_QUIZ_LIST)
}

const QuizEditor = React.memo(() => {
    const dispatch = useDispatch();
    const theme = useTheme();
    
    const quizList = useGetQuizList();
    React.useEffect(()=>{
        refreshQuizList(dispatch); 
    },[dispatch])
    
    React.useEffect(()=>{
        // console.log(quizList)
    },[quizList])
    
    return (
      <Fade in={true} timeout={drawerTransitionTime}>
        <Box style={{flexGrow: 1, overflowX:'hidden', padding: '1em'}}>
        <Paper variant={'elevation'} elevation={5} style={{textAlign: 'center', padding: '1em', backgroundColor: theme.palette.grey[200]}} >
          <Typography variant='h4' paragraph style={{display: 'inline-flex'}}>
            <DescriptionIcon fontSize={'large'} style={{marginRight: '0.5em'}}/> Quiz Editor
          </Typography>
          <Typography variant='h6' paragraph>Here, you can edit your questionnaire</Typography>
          {quizList?.data?.map((quiz, quizIndex) => {
            return (
              <Box flexGrow={1} key={quiz.quiz_id}>
                <Box display={'flex'} >
                  <Title variant={'h5'} contentEditable={true}
                    onBlur={(event) => {
                      defaultAPIAction({
                        path: `/${ModelNamesEnum.Quiz}/${quiz.quiz_id}`,
                        method: HttpMethod.PATCH,
                        body: {
                            name: event.target.innerHTML
                        },
                      })(dispatch, UPDATE_QUIZ_DETAIL)    
                    }}
                    title={quiz.name}
                  />
                </Box>
                <QuizDatatable index={quizIndex} data={quiz || null} onRefresh={() => {refreshQuizList(dispatch)}}/>
              </Box> 
            )}
          )}
        </Paper>
        </Box>
      </Fade>
    )
})
export default QuizEditor;