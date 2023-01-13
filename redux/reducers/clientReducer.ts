import { AnyAction, Reducer } from "redux";
import { ClientState } from "../../interfaces";
import common3DReducer from "./common3DReducer";
import meetingReducer from "./meetingReducer";
export const defaultClientState: ClientState = {
  isAllModelLoaded: false,
  meeting: {},
};

export const reduceReducers =
  (
    defaultState: ClientState,
    reducers: Reducer<ClientState, AnyAction>[]
  ): Reducer<ClientState, AnyAction> =>
  (state: ClientState = defaultState, action: AnyAction): ClientState =>
    reducers.reduce((acc, curr) => curr(acc, action), state);

const clientReducer = reduceReducers(defaultClientState, [
  meetingReducer,
  common3DReducer,
]);

export default clientReducer;
