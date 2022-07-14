import { useSelector, shallowEqual} from "react-redux";
import { ReducerKeys } from "../../../store/config";
import { IState } from "./reducer";

export const useGetAnswerList = (): IState['answerList'] => {
  return useSelector(
      (state: any) => (state[ReducerKeys.QUERY_PAGE_REDUCER] as IState).answerList,
      shallowEqual
    );
};


