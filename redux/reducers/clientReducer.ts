import { AnyAction } from "redux";
import { ClientState } from "../../interfaces";
import { DID_LOAD_FIBER, SET_ANIM_TYPE } from "../action";
export const defaultClientState: ClientState = {
  isAllModelLoaded: false,
};
const clientReducer = (
  state: ClientState = defaultClientState,
  action: AnyAction
): ClientState => {
  switch (action.type) {
    case DID_LOAD_FIBER: {
      return {
        ...state,
        isAllModelLoaded: action.payload,
      };
    }
    case SET_ANIM_TYPE: {
      return {
        ...state,
        animType: action.payload,
      };
    }
    default:
      return state;
  }
};

export default clientReducer;
