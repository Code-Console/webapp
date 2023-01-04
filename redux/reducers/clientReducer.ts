import { AnyAction } from "redux";
import { ClientState } from "../../interfaces";
import { DID_LOAD_FIBER, SET_ANIM_TYPE, SET_ORBIT_CONTROL } from "../action";
export const defaultClientState: ClientState = {
  isAllModelLoaded: false,
  meeting: {},
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
    case SET_ORBIT_CONTROL: {
      console.log("action.payload", action.payload);
      return {
        ...state,
        isOrbitControl: action.payload,
      };
    }
    default:
      return state;
  }
};

export default clientReducer;
