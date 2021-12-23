import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import PostAddIcon from '@mui/icons-material/PostAdd';
import { IQuizQuestionData } from '../../models/QuizQuestion';
import { defaultAPIAction } from '../../redux/common/actions';
import { INSERT_QUIZ_QUESTION } from './store/types';
import { useDispatch } from 'react-redux';
import { ModelNamesEnum } from '../../config/models';
import { HttpMethod } from '../../config/httpMethods';

export interface IQuestionColumns{
    section_id: number;
    questions: IQuizQuestionData[];
    setQuestions:  React.Dispatch<any>;
  }
  export function QuestionColumns(props: IQuestionColumns){
    const dispatch = useDispatch();
  
    return(
    <TableRow>
      <TableCell align="left">ID #</TableCell>
      <TableCell align="center">Question</TableCell>
      <TableCell align="center">Type</TableCell>
      <TableCell align="center">Alignment</TableCell>
      <TableCell align="center">Request Reason</TableCell>
      <TableCell align="center">
        <IconButton onClick={(event) => {
          defaultAPIAction({
            path: `/${ModelNamesEnum.Quiz_Question}`,
            method: HttpMethod.PUT,
            body: {
              section_id: props.section_id,
            },
            onFinish: (success: boolean, result) => {
              if(success){
                // console.log(result)
                let newQuestions = props.questions.slice();
                newQuestions.push(result.data.response);
                props.setQuestions(newQuestions);
                // props.onRefresh();
              } 
            }
          })(dispatch, INSERT_QUIZ_QUESTION)
        }}>
          <PostAddIcon/>
        </IconButton>
      </TableCell>
    </TableRow>
  )}
  