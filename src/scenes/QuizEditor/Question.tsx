import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import { CircularProgress, Collapse, Fade, InputAdornment, ListItemText, MenuItem, Select, Switch, Table, TableBody, TableHead, TextField } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IQuizQuestionData, QuizQuestionAlignment, QuizQuestionType } from '../../models/QuizQuestion';
import { ActionStatus, defaultAPIAction } from '../../redux/common/actions';
import { IFormItem, newFormItem } from '../../config/formItem';
import { DELETE_QUIZ_QUESTION, UPDATE_QUIZ_QUESTION } from './store/types';
import { useDispatch } from 'react-redux';
import { ModelNamesEnum } from '../../config/models';
import { HttpMethod } from '../../config/httpMethods';
import { QuestionOption } from './QuestionOption';
import { IQuizOptionData } from '../../models/QuizOption';

export interface IQuestionProps{
    index: number;
    data: IQuizQuestionData;
    questions: IQuizQuestionData[];
    setQuestions: React.Dispatch<any>;
}
export const Question = React.memo(
  function QuestionComponent(props: IQuestionProps){
    const dispatch = useDispatch();
    
    const [question, setQuestion] = React.useState<IFormItem<string>>(newFormItem('', false));
    const [type, setType] = React.useState<IFormItem<string>>(newFormItem('', false));
    const [alignment, setAlignment] = React.useState<IFormItem<string>>(newFormItem('', false));
    const [options, setOptions] = React.useState<IQuizOptionData[]>([]);
    const [requestReason, setRequestReason] = React.useState<IFormItem<boolean>>(newFormItem(false, false));
    React.useEffect(() => {
      setQuestion(newFormItem(props.data.question || '', false));
      setType(newFormItem(props.data.type || '', false))
      setAlignment(newFormItem(props.data.alignment || '', false))
      setOptions((props.data.question_options || []).sort((el1, el2) => el1.question_option_id - el2.question_option_id));
      setRequestReason(newFormItem(props.data.request_reason, false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])              
    
    const [isOpen, setOpen] = React.useState<boolean>(false);
    return (
      <>
      <TableRow style={{flex: 1, flexDirection: 'row'}}>
        {/* ID # */}
        <TableCell align="left" style={{width: '1%', padding: '1em', minWidth: '60px'}}>
          {props.index +1}
          <IconButton
            size="small"
            onClick={() => setOpen(!isOpen)}
            style={{marginLeft: '1em'}}
          >
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* Question */}
        <TableCell align="center" style={{width: '35%'}}>
          <TextField 
            // label={'Description'} 
            fullWidth 
            multiline
            value={question.value}
            onChange={(event) => {
              setQuestion(newFormItem(event.currentTarget.value, true));
            }}
            onBlur={(event) => {
              if(question.hasChanged){
                setQuestion({...question, status: ActionStatus.Pending});
                defaultAPIAction({
                  path: `/${ModelNamesEnum.Quiz_Question}/${props.data.question_id}`,
                  method: HttpMethod.PATCH,
                  body: {
                    question: question.value,
                  },
                  onFinish: (success: boolean, result) => {
                    if(success){
                        setQuestion(newFormItem(question.value, false, ActionStatus.Success));
                    }
                    // console.log(result)
                  }
                })(dispatch, UPDATE_QUIZ_QUESTION)  
              }
            }}
            InputProps={{
              endAdornment: (
                <Box style={{position: 'absolute', right: 5, top:'50%', height: '100%', width: 50}}>
                  <InputAdornment position="end">
                    <Fade in={question.status === ActionStatus.Pending}>
                        <CircularProgress/>
                    </Fade>
                  </InputAdornment>
                </Box>
              )
            }}
          />
        </TableCell>
        {/* Question Type */}
        <TableCell align="center" style={{width: '10%'}}>
          <Select
            fullWidth
            value={type.value}
            onChange={(event) => {
              defaultAPIAction({
                path: `/${ModelNamesEnum.Quiz_Question}/${props.data.question_id}`,
                method: HttpMethod.PATCH,
                body: {
                  type: event.target.value
                },
                onFinish: (success, response) => {
                  if(success){
                    setType(newFormItem(event.target.value, true))
                  }
                }
              })(dispatch)
            }}
            style={{height: '56px', boxSizing: 'border-box'}}
          >
            <MenuItem value={QuizQuestionType.TEXT}>
              <ListItemText primary={QuizQuestionType.TEXT}/>
            </MenuItem>
            <MenuItem value={QuizQuestionType.SLIDER}>
              <ListItemText primary={QuizQuestionType.SLIDER}/>
            </MenuItem>
          </Select>
        </TableCell>
        {/* Question Orientation */}
        <TableCell align="center" style={{width: '10%'}}>
          <Select
            fullWidth
            value={alignment.value}
            onChange={(event) => {
              defaultAPIAction({
                path: `/${ModelNamesEnum.Quiz_Question}/${props.data.question_id}`,
                method: HttpMethod.PATCH,
                body: {
                  alignment: event.target.value
                },
                onFinish: (success, response) => {
                  if(success){
                    setAlignment(newFormItem(event.target.value, true))
                  }
                }
              })(dispatch)
            }}
            style={{height: '56px', boxSizing: 'border-box'}}
          >
            <MenuItem value={QuizQuestionAlignment.HORIZONTAL}>
              <ListItemText primary={QuizQuestionAlignment.HORIZONTAL}/>
            </MenuItem>
            <MenuItem value={QuizQuestionAlignment.VERTICAL}>
              <ListItemText primary={QuizQuestionAlignment.VERTICAL}/>
            </MenuItem>
          </Select>
        </TableCell>
        {/* Request Reason */}
        <TableCell align="center" style={{width: '1%', padding: '0.5em', minWidth: '50px'}}>
          <Switch disabled={type.value === QuizQuestionType.SLIDER} checked={requestReason.value} onChange={event => {
            defaultAPIAction({
              path: `/${ModelNamesEnum.Quiz_Question}/${props.data.question_id}`,
              method: HttpMethod.PATCH,
              body: {
                request_reason: event.target.checked
              },
              onFinish: (success, response) => {
                if(success){
                  setRequestReason(newFormItem(event.target.checked, true))
                }
              }
            })(dispatch)
            setRequestReason(newFormItem(event.target.checked, false))
          }}/>
        </TableCell>
        {/* Delete Button */}
        <TableCell align="center" style={{width: '1%', padding: '0.5em', minWidth: '50px'}}>
          <IconButton onClick={(event) => {
            defaultAPIAction({
              path: `/${ModelNamesEnum.Quiz_Question}/${props.data.question_id}`,
              method: HttpMethod.DELETE,
              onFinish: (success: boolean, payload) => {
                if(success){
                  // console.log(data)
                  let newQuestions = props.questions.slice();
                  newQuestions = newQuestions.filter(item => item.question_id !== props.data.question_id)
                  props.setQuestions(newQuestions);
                  // props.onRefresh();
                }
              }
            })(dispatch, DELETE_QUIZ_QUESTION)
          }}>
              <DeleteIcon/>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
      <TableCell colSpan={6} style={{padding: 0, paddingBottom: '1em', paddingLeft: '5em', paddingRight: '5em'}}>
          <Collapse in={isOpen}>
          <TableContainer>
              <Table >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" style={{width: '10%', padding: '1em', minWidth: '60px'}}>ID #</TableCell>
                      <TableCell align='center' style={{width: '50%'}}>option</TableCell>
                      <TableCell align="center" style={{width: '10%', padding: '0.5em', minWidth: '100px'}}>
                          <IconButton onClick={(event) => {
                              defaultAPIAction({
                                path: `/${ModelNamesEnum.Quiz_Option}`,
                                method: HttpMethod.PUT,
                                body: {
                                  question_id: props.data.question_id,
                                  option: "new option"
                                },
                                onFinish: (success: boolean, payload) => {
                                  console.log(payload);
                                  if(success){
                                    const newOptions = options.slice();
                                    newOptions.push(payload.data.response);
                                    setOptions(newOptions);
                                    event.stopPropagation()
                                  }
                                }
                              })(dispatch);
                          }}>
                              <AddIcon />
                          </IconButton>            
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {options.map((el, index) => (
                    <QuestionOption key={index} index={index} option_id={el.question_option_id} option={el.option} options={options} setOptions={setOptions}/>  
                  ))}
                  </TableBody>
              </Table>
          </TableContainer>
          </Collapse>
          </TableCell>
      </TableRow>
      </>
    )
  }
)