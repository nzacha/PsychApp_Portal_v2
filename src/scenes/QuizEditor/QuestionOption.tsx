import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Stack, TextField } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { IQuizOptionData } from '../../models/QuizOption';
import { ModelNamesEnum } from '../../config/models';
import { HttpMethod } from '../../config/httpMethods';
import { defaultAPIAction } from '../../redux/common/actions';
import { IFormItem, newFormItem } from '../../config/formItem';

export interface IQuestionOptionProps{
    index: number;
    option_id: number;
    option: string;
    options: IQuizOptionData[];
    setOptions: React.Dispatch<React.SetStateAction<IQuizOptionData[]>>;
  }
  export function QuestionOption(props: IQuestionOptionProps){
    const dispatch = useDispatch();
    const [option, setOption] = React.useState<IFormItem<string>>(newFormItem('', false));
    React.useEffect(() => {
      setOption(newFormItem(props.option, false));
    }, [props.option]);

    return(
    <TableRow>
        <TableCell>{props.index+1}</TableCell>
        <TableCell>
          <TextField value={option.value} 
            onChange={(event) => {
              setOption(newFormItem(event.currentTarget.value, false))
            }} 
            onBlur={(event) => {
              defaultAPIAction({
                path: `/${ModelNamesEnum.Quiz_Option}/${props.option_id}`,
                method: HttpMethod.PATCH,
                body: {
                  option: event.currentTarget.value
                },
                onFinish: (success, response) => {
                  if(success){
                    setOption(newFormItem(option.value, true))
                  }
                }
              })(dispatch) 
            }}   
            fullWidth/>
        </TableCell>
        <TableCell >
            <Stack direction={'row'} justifyContent={'center'}>
            <IconButton onClick={() => {
                defaultAPIAction({
                    path: `/${ModelNamesEnum.Quiz_Option}/${props.option_id}`,
                    method: HttpMethod.DELETE,
                    onFinish: (success: boolean, payload) => {
                      if(success){
                        props.setOptions(props.options.filter((el, i) => i != props.index))
                      }
                    }
                  })(dispatch);
            }}>
                <DeleteIcon />
            </IconButton>
            </Stack>
        </TableCell>
    </TableRow>
  )}