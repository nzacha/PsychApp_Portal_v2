import { IColumn } from "../../components/common/DataTable";

// minWidth?: number;
// align?: 'right';
// format?: (value: number) => string;
export const columns: IColumn[]=[
    {
        id: 'index',
        label: 'index',
    },{
        id: 'quiz_question.question',
        label: 'question',
    },{
        id: 'answer',
        label: 'answer',
    }
]