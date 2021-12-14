import { useSelector, shallowEqual} from "react-redux";
import { ReducerKeys } from "../../../redux/config";
import { IState } from "./reducer";

export const useGetParticipantsList = (): IState['participantList'] => {
    return useSelector(
      (state: any) => (state[ReducerKeys.PARTICIPANT_MANAGER_REDUCER] as IState).participantList,
      shallowEqual
    );
  };
  