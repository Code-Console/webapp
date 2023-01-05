import { AnyAction, Reducer } from "redux";
import { ClientState } from "../../interfaces";
import { DID_LOAD_FIBER, SET_ANIM_TYPE, SET_ORBIT_CONTROL } from "../action";
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

// const clientReducer = (
//   state: ClientState = defaultClientState,
//   action: AnyAction
// ): ClientState => {
//   switch (action.type) {
//     case DID_LOAD_FIBER: {
//       return {
//         ...state,
//         isAllModelLoaded: action.payload,
//       };
//     }
//     case SET_ANIM_TYPE: {
//       return {
//         ...state,
//         animType: action.payload,
//       };
//     }
//     case SET_ORBIT_CONTROL: {
//       console.log("action.payload", action.payload);
//       return {
//         ...state,
//         isOrbitControl: action.payload,
//       };
//     }
//     default:
//       return state;
//   }
// };

// export default clientReducer;
