import { AnyAction } from "redux";
import { ClientState } from "../../interfaces";
import {
  DID_LOAD_FIBER,
  SET_ANIM_TYPE,
  SET_CONFIGURATION_TYPE,
  SET_ORBIT_CONTROL,
  UPDATE_OBJECT_NAME,
} from "../action";
import { defaultClientState } from "./clientReducer";

const common3DReducer = (
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
    case SET_CONFIGURATION_TYPE: {
      return {
        ...state,
        configurationType: action.payload,
      };
    }
    case SET_ORBIT_CONTROL: {
      return {
        ...state,
        isOrbitControl: action.payload,
      };
    }
    case UPDATE_OBJECT_NAME: {
      console.log("action.payload", action.payload);
      return {
        ...state,
        objectName: action.payload,
      };
    }
    default:
      return state;
  }
};

export default common3DReducer;
