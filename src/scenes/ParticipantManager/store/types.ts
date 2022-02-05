import { typeCreator } from "../../../redux/common/types";
import { ReducerKeys } from "../../../redux/config";

export const SET_PARTICIPANT_LIST: string = typeCreator(
    ReducerKeys.PARTICIPANT_MANAGER_REDUCER,
    'SetParticipantList'
);

export const INSERT_PARTICIPANT: string = typeCreator(
    ReducerKeys.PARTICIPANT_MANAGER_REDUCER,
    'InsertParticipant'
);

export const UPDATE_PARTICIPANT: string = typeCreator(
    ReducerKeys.PARTICIPANT_MANAGER_REDUCER,
    'UpdateParticipant'
);

export const DELETE_PARTICIPANT: string = typeCreator(
    ReducerKeys.PARTICIPANT_MANAGER_REDUCER,
    'DeleteParticipant'
);

export const DEACTIVATE_PARTICIPANT: string = typeCreator(
    ReducerKeys.PARTICIPANT_MANAGER_REDUCER,
    'DeactivateParticipant'
);
