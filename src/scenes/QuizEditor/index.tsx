import React, { Dispatch } from "react";

import { Box, Fade, IconButton, Paper, Tooltip, Typography, useTheme } from "@mui/material";
import { drawerTransitionTime } from "../../navigation";
import QuizDatatable from "./QuizDatatable";
import { useGetSelectedProjectID } from '../MyProjectsPage/store/selectors';

import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import { useGetQuizList } from "./store/selectors";
import { defaultAPIAction } from "../../redux/common/actions";

import { useDispatch } from "react-redux";
import { SET_QUIZ_LIST, UPDATE_QUIZ_DETAIL } from "./store/types";
import { ModelNamesEnum } from "../../config/models";
import { HttpMethod } from "../../config/httpMethods";
import Title from '../../components/common/Title';
import AnchoredTooltip from "../../components/Tooltip/AnchoredTooltip";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/PostAdd';

const refreshQuizList= (dispatch: Dispatch<any>, project_id: number) => {
  defaultAPIAction({
    path: `/${ModelNamesEnum.Quiz}/list/${project_id}`,
    method: HttpMethod.GET,
  })(dispatch, SET_QUIZ_LIST)
}

const QuizEditor = React.memo(() => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const selectedProject = useGetSelectedProjectID();
    const quizList = useGetQuizList();
    React.useEffect(()=>{
      if(selectedProject)
        refreshQuizList(dispatch, selectedProject); 
    },[dispatch, selectedProject])
    
    // console.log(quizList);
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
                <AnchoredTooltip message={'Click on the title to modify it'}>
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
                </AnchoredTooltip>
                <IconButton
                  size="small"
                  disabled
                  style={{marginLeft: '1em'}}
                >
                  <EditIcon/>
                </IconButton>
                <Tooltip title={'Add new Section'}>
                  <IconButton
                    // size="small"
                    style={{marginLeft: '1em'}}
                    onClick={() => {
                      defaultAPIAction({
                        path: `/${ModelNamesEnum.Quiz_Section}/`,
                        method: HttpMethod.PUT,
                        body: {
                            quiz_id: quiz.quiz_id,
                            name: 'New Section'
                        },
                        onFinish: (s, r) => {
                          if(s){
                            if(selectedProject) refreshQuizList(dispatch, selectedProject);
                          }
                        }
                      })(dispatch, UPDATE_QUIZ_DETAIL)    
                    }}
                  >
                    <AddIcon/>
                  </IconButton>
                </Tooltip>
                </Box>
                <QuizDatatable index={quizIndex} data={quiz || null} onRefresh={() => {
                  if(selectedProject) refreshQuizList(dispatch, selectedProject)
                }}/>
              </Box> 
            )}
          )}
        </Paper>
        </Box>
      </Fade>
    )
})
export default QuizEditor;
