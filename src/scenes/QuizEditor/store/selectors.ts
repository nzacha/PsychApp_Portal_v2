import { useSelector, shallowEqual} from "react-redux";
import { ReducerKeys } from "../../../store/config";
import { IState } from "./reducer";

export const useGetQuizList = (): IState['quizList'] => {
    return useSelector(
      (state: any) => (state[ReducerKeys.QUIZ_EDITOR_REDUCER] as IState).quizList,
      shallowEqual
    );
  };

export const useGetQuizDetail = (): IState['quizDetail'] => {
    return useSelector(
      (state: any) => (state[ReducerKeys.QUIZ_EDITOR_REDUCER] as IState).quizDetail,
      shallowEqual
    );
  };
