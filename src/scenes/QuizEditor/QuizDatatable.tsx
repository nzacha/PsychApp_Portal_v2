import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CircularProgress, Fade, InputAdornment, TextField } from '@mui/material';
import GridLayout from '../../components/common/GridLayout';

import { IQuizData } from '../../models/Quiz';
import { IQuizSectionData } from '../../models/QuizSection';
import { IQuizQuestionData } from '../../models/QuizQuestion';
import { ActionStatus, defaultAPIAction } from '../../redux/common/actions';
import { IFormItem, newFormItem } from '../../config/formItem';
import { ModelNamesEnum } from '../../config/models';
import { UPDATE_QUIZ_DETAIL, UPDATE_QUIZ_SECTION } from './store/types';
import { useDispatch } from 'react-redux';
import { Question } from './Question';
import { HttpMethod } from '../../config/httpMethods';
import Title from '../../components/common/Title';
import EditIcon from '@mui/icons-material/Edit';
import AnchoredTooltip from '../../components/Tooltip/AnchoredTooltip';
import { QuestionColumns } from './QuestionColumns';
import { Delete } from '@mui/icons-material';

interface ISectionProps{
  index: number;
  quizIndex: number;
  data: IQuizSectionData;
  onRefresh: () => void;
}
function Section(props: ISectionProps){
  const dispatch = useDispatch();
  const [isOpen, setOpen] = React.useState(props.index === 0 && props.quizIndex === 0);
  const [name, setName] = React.useState<IFormItem<string>>(newFormItem('', false));
  const [description, setDescription] = React.useState<IFormItem<string>>(newFormItem('', false));
  const [questions, setQuestions] = React.useState<IQuizQuestionData[]>([]);
  
  //called the first time when data is fetched to save state
  React.useEffect(() => {
    setName(newFormItem(props.data.name || '', false));
    setDescription(newFormItem(props.data.description || '', false));
    setQuestions(props.data.quiz_questions || []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  //called every time the data changes to sort it
  React.useEffect(() => {
    questions.sort((el1, el2) => el1.question_id - el2.question_id)
  }, [questions]);

  return (
    <TableContainer style={{marginBottom: '2em'}}>
    <Table> 
    {/* stickyHeader  */}
      <TableHead>
        <TableRow>
          <TableCell align="left">
            <Box flexGrow={1} display={'flex'} style={{alignItems: 'center', justifyItems: 'center'}}> 
              <AnchoredTooltip message={'Click on the title to modify it'}>
                <Title variant={'h5'} contentEditable={true}
                  onBlur={(event) => {
                    defaultAPIAction({
                      path: `/${ModelNamesEnum.Quiz_Section}/${props.data.section_id}`,
                      method: HttpMethod.PATCH,
                      body: {
                          name: event.target.innerHTML
                      },
                    })(dispatch, UPDATE_QUIZ_DETAIL)    
                  }}
                  title={props.data.name}
                />
              </AnchoredTooltip>
              <IconButton
                size="small"
                disabled
                style={{marginLeft: '1em'}}
              >
                <EditIcon/>
              </IconButton>
              <IconButton
                onClick={() => setOpen(!isOpen)}
                style={{marginLeft: '1em'}}
              >
                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              <IconButton
                style={{marginLeft: '1em'}}
                onClick={() => {
                  defaultAPIAction({
                    path: `/${ModelNamesEnum.Quiz_Section}/${props.data.section_id}`,
                    method: HttpMethod.DELETE,
                    onFinish: (s, r) => {
                      if(s){
                        props.onRefresh();
                      }
                    }
                  })(dispatch, '')}}
              >
                <Delete/>
              </IconButton>
            </Box>
          </TableCell>
        </TableRow>    
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell style={{padding: '0em'}}> 
            <Collapse in={isOpen}>
            <GridLayout elements={[
              {
                id: 'description',
                element: (
                  <Box flexGrow={1} display={'flex'} mt={2} style={{alignItems: 'center', justifyItems: 'center', padding: '1em'}}> 
                    <TextField 
                      label={'Description'} 
                      multiline 
                      fullWidth 
                      value={description.value} 
                      onChange={(event) => {
                          setDescription(newFormItem(event.currentTarget.value, true));
                      }}
                      onBlur={(event) => {
                        if(description.hasChanged){
                          setDescription(newFormItem(description.value, true, ActionStatus.Pending));
                          defaultAPIAction({
                            path: `/${ModelNamesEnum.Quiz_Section}/${props.data.section_id}`,
                            method: HttpMethod.PATCH,
                            body: {
                                description: description.value,
                            },
                            onFinish: (success: boolean) => {
                                if(success){
                                    setDescription(newFormItem(description.value, false, ActionStatus.Success));
                                }
                                // console.log(description)
                            }
                          })(dispatch, UPDATE_QUIZ_SECTION)  
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <Box>
                            <InputAdornment position="end">
                              <Fade in={description.status === ActionStatus.Pending}>
                                  <CircularProgress/>
                              </Fade>
                            </InputAdornment>
                          </Box>
                        )
                      }}
                    />
                  </Box>
                ),
                md: 8,
                xs: 12,
              },
              {
                id: 'data',
                element: (
                  <Table>
                    <TableHead>         
                      <QuestionColumns section_id={props.data.section_id} questions={questions} setQuestions={setQuestions}/>
                    </TableHead> 
                    <TableBody>
                      {questions.map((question, question_index)=>(
                          <Question index={question_index} data={question} questions={questions} setQuestions={setQuestions} key={question.question_id}/>
                      ))}
                    </TableBody>
                  </Table>
                ),
                xs: 12,
              }
            ]}
            />
            </Collapse>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </TableContainer>
  )
}

interface IQuizDatatableProps {
  index: number;
  data: IQuizData | null;
  onRefresh: () => void;
}
function QuizDatatable(props: IQuizDatatableProps) {
  return (
    <Box mb={10}>
      {props?.data?.quiz_sections?.map((section, sectionIndex)=>(
        <Paper key={section.section_id} variant={'elevation'} elevation={3} style={{flexGrow: 1, margin: '1em'}}>
          <Section index={sectionIndex} quizIndex={props.index} data={section} onRefresh={props.onRefresh}/>
        </Paper>
      ))}
    </Box>
  );
}
export default React.memo(QuizDatatable);