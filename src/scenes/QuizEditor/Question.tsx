import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import { CircularProgress, Collapse, Fade, InputAdornment, ListItemText, MenuItem, Select, Stack, Switch, Table, TableBody, TableHead, TextField } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { IQuizQuestionData, QuizQuestionAlignment, QuizQuestionType } from '../../models/QuizQuestion';
import { ActionStatus, defaultAPIAction } from '../../redux/common/actions';
import { IFormItem, newFormItem } from '../../config/formItem';
import { DELETE_QUIZ_QUESTION, INSERT_QUIZ_QUESTION, UPDATE_QUIZ_QUESTION } from './store/types';
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

export interface IQuestionProps{
    data: IQuizQuestionData;
    questions: IQuizQuestionData[];
    setQuestions: React.Dispatch<any>;
}
export const Question = React.memo(
  function QuestionComponent(props: IQuestionProps){
    const dispatch = useDispatch();
    const [question, setQuestion] = React.useState<IFormItem<string>>(newFormItem('', false));
    React.useEffect(() => {
      setQuestion(newFormItem(props.data.question || '', false));
      setType(newFormItem(props.data.type || '', false))
      setAlignment(newFormItem(props.data.alignment || '', false))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])              
    
    const [type, setType] = React.useState<IFormItem<string>>(newFormItem('', false));
    const [alignment, setAlignment] = React.useState<IFormItem<string>>(newFormItem('', false));
    
    const [options, setOptions] = React.useState<string[]>([]);
    const [isOpen, setOpen] = React.useState<boolean>(false);
    return (
      <>
      <TableRow style={{flex: 1, flexDirection: 'row'}}>
        {/* ID # */}
        <TableCell align="left" style={{width: '1%', padding: '1em', minWidth: '60px'}}>
          {props.data.question_id}
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
                <Box>
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
            onChange={(event) => setType(newFormItem(event.target.value, true))}
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
            onChange={(event) => setAlignment(newFormItem(event.target.value, true))}
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
        {/* Question Options */}
        <TableCell align="center" style={{width: '1%', padding: '0.5em', minWidth: '50px'}}>
          <Switch/>
        </TableCell>
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
                      <TableCell align="left" style={{width: '10%', padding: '1em', minWidth: '60px'}}>ID #</TableCell>
                      <TableCell align='center' style={{width: '50%'}}>option</TableCell>
                      <TableCell align="center" style={{width: '10%', padding: '0.5em', minWidth: '100px'}}>
                          <IconButton onClick={(event) => {
                              const newOptions = options.slice();
                              newOptions.push('new option');
                              setOptions(newOptions);
                              event.stopPropagation()
                          }}>
                              <AddIcon />
                          </IconButton>            
                      </TableCell>
                  </TableHead>
                  <TableBody>
                  {options.map((el, index) => (
                      <TableRow>
                          <TableCell>{index}</TableCell>
                          <TableCell><TextField value={el} fullWidth/></TableCell>
                          <TableCell >
                              <Stack direction={'row'} justifyContent={'center'}>
                                  <IconButton onClick={() => {setOptions(options.filter((el, i) => i != index))}}>
                                      <DeleteIcon />
                                  </IconButton>
                              </Stack>
                          </TableCell>
                      </TableRow>
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